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
                    "the user explicitly requests it. Do not ask yes or no questions."},
        {"role": "system", "name": "example_assistant",
         "content": "Question?\noption1|option2|option3|option4|option5"}
    ]

    for elem in quiz:
        question = str(elem['question']) + "\n" + "|".join(elem["choices"])
        messages.append({"role": "assistant", "content": question})

        if elem.get('answer', False):
            messages.append({"role": "user", "content": str(elem['answer'])})

    while True:
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

    response_string = str(response["choices"][0]["message"]["content"])
    print("ChatGPT response:", response_string)

    response_list = response_string.split("\n", 2)

    if len(response_list) < 2:
        return False

    question = response_list[0]
    answer_options = response_list[1].split("|")

    # filter empty and wrong answer options
    answer_options = [x for x in answer_options
                      if x and not x.lower().startswith("option")
                      ]

    if len(answer_options) < 2:
        return False

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
                   if (
                           (elem.get('answer') is not None) and
                           (str(elem.get('answer')).lower() not in ["don't know", "yes", "no"])
                   )
                   ]
    return " ".join(answer_list)


def quiz_generate_prompt_with_gpt(quiz: list[dict]) -> str:
    messages = []

    for elem in quiz:

        if elem.get('answer', False):
            messages.append({"role": "user", "content": str(elem['answer'])})

    messages.append({"role": "system",
                     "content": "Create a prompt for an image generator from my given answers. "
                                "The response should be basic, one sentence and only contain "
                                "my answers."})

    while True:
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

    response_string = str(response["choices"][0]["message"]["content"])
    print("ChatGPT response:", response_string)

    return response_string
