import os
import time
import openai

# IMPORTANT: Obtain OpenAI API key first at https://platform.openai.com/ and then set following environment variable:
# OPEN_AI_KEY={YOUR API KEY}
openai.api_key = os.getenv('OPEN_AI_KEY')


def quiz_next_turn(quiz: list[dict]) -> dict:
    """
    Generate next conversation element based on previous quiz.
    :param quiz: The quiz so far
    :return: The next conversation element of the quiz
    """

    # Initial prompt for ChatGPT
    messages = [
        {"role": "system",
         "content": "The user wants to draw an image. You help the user by asking what he wants to draw. You "
                    "start with very general questions and ask more detailed questions based on the answer of the "
                    "user. For every question give 5 possible answer options in following format: "
                    "option1|option2|option3|... The answer options should not be longer than two words and "
                    "should be singular. End your turn after asking one question. Do not stop asking questions until "
                    "the user explicitly requests it. Do only ask open questions, without yes or no as answer option. "
                    "Do not apologize yourself to the user. "
                    "Always start the conversation by asking which style of an image the user wants to create. "
                    "The user can select multiple answer options if he wants to draw multiple objects."},
        {"role": "system", "name": "example_assistant",
         "content": "Question?\nchoice1|choice2|choice3|choice4|choice5"}
    ]

    # Convert current quiz to conversation and append it to initial prompt
    messages = messages + quiz_to_chatgpt_conversation(quiz)

    # Try to generate next conversation element. Try again with additional prompt if ChatGPT fails.
    max_tries = 3
    next_conversation_element = False

    for i in range(max_tries):
        if i != 0:
            print("Trying conversation: " + str(i + 1) + " of", max_tries)
        try:
            next_conversation_element = get_next_conversation_element(messages)
            break
        except ResponseFormatException:
            messages.append({"role": "user",
                             "content": "Continue asking in following format: "
                                        "Question?\noption1|option2|option3|option4|option5"})

    if not next_conversation_element:
        raise ResponseFormatException

    return next_conversation_element


class ResponseFormatException(Exception):
    pass


def get_next_conversation_element(messages: list[dict]) -> dict:
    """
    Call chatgpt to generate next conversation element. Process the response of ChatGPT and split it into
    answer options. Raises exceptions if ChatGPT does not answer in the wanted format.
    :param messages: Messages to send to ChatGPT
    :return: Next conversation element based on ChatGPTs response
    """

    # Call ChatGPT to obtain next question and answers in following format:
    # Question?\nchoice1|choice2|choice3|choice4|choice5
    response_string = call_chatgpt(messages)

    if not response_string:
        raise ResponseFormatException

    # split question and answer options:
    # response_list[0]: Question?
    # response_list[1]: choice1|choice2|choice3|choice4|choice5
    response_list = response_string.split("\n", 2)

    if len(response_list) < 2:
        raise ResponseFormatException

    # split single answer choices:
    # answer_options[i]: choicei
    question = response_list[0]
    answer_options = response_list[1].split("|")

    # filter empty and wrong answer options
    answer_options = [x for x in answer_options
                      if x and not x.lower().startswith("option")
                      ]

    if len(answer_options) < 2:
        raise ResponseFormatException

    # Build next conversation element out of question and answer options
    next_conversation_element = {
        "question": question,
        "choices": answer_options,
        "answer": None
    }

    return next_conversation_element


def quiz_generate_image(quiz: list[dict], use_chatgpt_for_prompt: bool = True) -> dict:
    """
    Generates the image and the prompt for a given quiz.
    :param quiz: Quiz up to the point at which the image should be generated
    :param use_chatgpt_for_prompt: Weather to use ChatGPT for generating the prompt or just concatenate the given answers.
    :return: imageUrl of the generated image with corresponding prompt
    """

    # 1. Generate prompt
    if use_chatgpt_for_prompt:
        prompt = quiz_generate_prompt_with_gpt(quiz)
    else:
        prompt = quiz_generate_prompt(quiz)

    # 2. Generate image
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="256x256"
    )
    image_url = response['data'][0]['url']

    # 3. Generate response
    generation_data = {
        "prompt": prompt,
        "imageUrl": image_url
    }

    return generation_data


def quiz_generate_prompt(quiz: list[dict]) -> str:
    """
    Generate prompt by concatenating the given answers of a quiz into a single string.
    :param quiz: The quiz to generate the prompt for
    :return: Prompt for image generation
    """

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


def quiz_generate_prompt_with_gpt(quiz: list[dict]) -> str:
    """
    Generate prompt by asking ChatGPT to generate the prompt.
    :param quiz: The quiz to generate the prompt for
    :return: Prompt for image generation
    """
    messages = quiz_to_chatgpt_conversation(quiz)

    messages.append({"role": "system",
                     "content": "Create a prompt for an image generator from my given answers. "
                                "The response should be basic, one sentence and only contain "
                                "my answers without additional instructions."})

    try:
        return call_chatgpt(messages)
    except openai.error.OpenAIError:
        return quiz_generate_prompt(quiz)


def quiz_to_chatgpt_conversation(quiz: list[dict]) -> list[dict]:
    """
    Convert the current quiz into a conversation for ChatGPT.
    :param quiz: The quiz to convert
    :return: Conversation for ChatGPT
    """
    messages = []

    for elem in quiz:
        question = str(elem['question']) + "\n" + "|".join(elem["choices"])
        messages.append({"role": "assistant", "content": question})

        if elem.get('answer', False):
            answer = elem['answer']
            if type(answer) is list:
                answer = "&".join(answer)
            messages.append({"role": "user", "content": str(answer)})

    return messages


def call_chatgpt(messages: list[dict]) -> str:
    """
    Calls ChatGPT for a response. Raises openai.error.* in case of error.
    :param messages: List of conversation elements for ChatGPT
    :return: Response string from ChatGPT
    """
    response = False
    max_tries = 3
    for i in range(max_tries):
        if i != 0:
            print("Calling ChatGPT: " + str(i + 1) + " of", max_tries)
        try:
            response = openai.ChatCompletion.create(
                model='gpt-3.5-turbo',
                max_tokens=50,
                messages=messages
            )
            break
        except openai.error.RateLimitError as e:
            print(e)
            if i == max_tries - 1:
                raise e
            else:
                time.sleep(20)

    response_string = str(response["choices"][0]["message"]["content"])
    print("ChatGPT response:", response_string)
    return response_string
