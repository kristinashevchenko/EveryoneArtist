import os
import openai

openai.api_key = os.getenv('OPEN_AI_KEY')


def quiz_next_turn(quiz: list[dict]) -> list:
    messages = [
        {"role": "system",
         "content": "The user wants to draw an image. You help the user by asking what he wants to draw. You "
                    "start with very general questions and ask more detailed questions based on the answer of the "
                    "user. For every question give 5 possible answer options in following format: "
                    "option1|option2|option3|... The answer options should not be longer than two words and "
                    "should be singular. End your turn after asking one question."},
        {"role": "system", "name": "example_assistant",
         "content": "Question?\noption1|option2|option3|option4|option5"}
    ]

    for elem in quiz:
        question = str(elem['question']) + "\n" + "|".join(elem["choices"])
        messages.append({"role": "assistant", "content": question})

        if elem.get('answer', False):
            messages.append({"role": "user", "content": str(elem['answer'])})

    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        max_tokens=200,
        messages=messages
    )

    response_string = str(response["choices"][0]["message"]["content"])
    response_list = response_string.split("\n", 2)
    question = response_list[0]
    answer_options = response_list[1].split("|")

    next_conversation_element = {
        "question": question,
        "choices": answer_options,
        "answer": None
    }

    quiz.append(next_conversation_element)

    return quiz


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
    answer_list = [elem.get('answer', None) for elem in quiz if elem.get('answer', None) is not None]
    return " ".join(answer_list)
