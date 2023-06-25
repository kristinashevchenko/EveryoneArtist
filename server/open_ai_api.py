import os
import time
import openai

openai.api_key = os.getenv('OPEN_AI_KEY')


def quiz_next_turn(quiz: list[dict]) -> dict | bool:
    messages = [
        {"role": "system",
         "content": "The user wants to draw an image. You help the user by asking what he wants to draw. You "
                    "start with very general questions and ask more detailed questions based on the answer of the "
                    "user. For every question give 5 possible answer options in following format: "
                    "option1|option2|option3|... The answer options should not be longer than two words and "
                    "should be singular. End your turn after asking one question. Do not stop asking questions until "
                    "the user explicitly requests it. Do only ask open questions, without yes or no as answer option. "
                    "Do not apologize yourself to the user. "
                    "The user can select multiple answer options if he wants to draw multiple objects."},
        {"role": "system", "name": "example_assistant",
         "content": "Question?\noption1|option2|option3|option4|option5"}
    ]

    for elem in quiz:
        question = str(elem['question']) + "\n" + "|".join(elem["choices"])
        messages.append({"role": "assistant", "content": question})

        if elem.get('answer', False):
            answer = elem['answer']
            if type(answer) is list:
                answer = "&".join(answer)
            messages.append({"role": "user", "content": str(answer)})

    max_tries = 3
    next_conversation_element = False
    for i in range(max_tries):
        try:
            next_conversation_element = get_next_conversation_element(messages)
            break
        except ResponseFormatException:
            messages.append({"role": "system",
                             "content": "Stick strictly to following format for your response: "
                             "Question?\noption1|option2|option3|option4|option5 "
                             "Do not apologize yourself for this mistake."})
        except YesNoQuestionException:
            messages.append({"role": "system",
                            "content": "Do only ask open questions, without yes or no as answer option. "
                                       "Do not apologize yourself for this mistake. "
                                       "Stick strictly to following format for your response: "
                                       "Question?\noption1|option2|option3|option4|option5"})

    return next_conversation_element


class ResponseFormatException(Exception):
    pass


class YesNoQuestionException(Exception):
    pass


def get_next_conversation_element(messages):
    response = False
    for i in range(3):
        try:
            response = openai.ChatCompletion.create(
                model='gpt-3.5-turbo',
                max_tokens=30,
                messages=messages
            )
            break
        except openai.error.RateLimitError as e:
            print(e)
            time.sleep(18)

    if not response:
        return False

    response_string = str(response["choices"][0]["message"]["content"])
    print("ChatGPT response:", response_string)

    response_list = response_string.split("\n", 2)

    if len(response_list) < 2:
        raise ResponseFormatException

    # if "yes" in response_list[1].lower() or "no" in response_list[1].lower():
    #    raise YesNoQuestionException

    question = response_list[0]
    answer_options = response_list[1].split("|")

    # filter empty and wrong answer options
    answer_options = [x for x in answer_options
                      if x and not x.lower().startswith("option")
                      ]

    if len(answer_options) < 2:
        raise ResponseFormatException

    next_conversation_element = {
        "question": question,
        "choices": answer_options,
        "answer": None
    }

    return next_conversation_element


def quiz_generate_image(quiz: list[dict]) -> dict:
    prompt = quiz_generate_prompt(quiz)

    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="256x256"
    )

    image_url = response['data'][0]['url']

    generation_data = {
        "prompt": prompt,
        "imageUrl": image_url
    }

    return generation_data


def quiz_generate_prompt(quiz: list[dict]) -> str:
    answer_list = [elem.get('answer')
                   for elem in quiz
                   if (elem.get('answer') is not None)
                   ]

    answer_strings = []
    for answer in answer_list:
        if type(answer) == str:
            answer_strings.append(answer.lower())
        elif type(answer) == list:
            answer_strings = answer_strings + answer

    answer_strings_filtered = []
    for answer in answer_strings:
        if (answer is not None) and (answer.lower() not in ["don't know", "yes", "no"]):
            answer_strings_filtered.append(answer)

    return " ".join(answer_strings_filtered)
