# EveryoneArtist Backend

This is a Flask backend application that provides API endpoints for EveryoneArtist using OpenAI's ChatGPT as conversational AI and Dall-E for image generation.

## Setup

1. Obtain an OpenAI API key by signing up on the [OpenAI platform](https://platform.openai.com/).
2. Set the `OPEN_AI_KEY` environment variable with your API key.

## Installation

1. Clone the repository and navigate to the project directory.
2. Install the required dependencies by running the following command:

   ```
   pip install -r requirements.txt
   ```

## Usage

Start the Flask server by running the following command:

```
python app.py
```

The server will start running on `http://localhost:5000`.

## API Endpoints

### Generate Quiz Question

- **URL:** `/quiz/answer`
- **Method:** `POST`
- **Description:** Generate the next question with choices based on the quiz so far.
- **Request Body:**
  ```
  {
    "quiz": [
      {
        "question": "Question 1",
        "choices": ["Choice 1", "Choice 2", "Choice 3"],
        "answer": "Choice 2"
      },
      ...
    ]
  }
  ```
- **Response:**
    - Success: `200 OK`
      ```
      {
        "question": "Next question",
        "choices": ["Choice 1", "Choice 2", "Choice 3"],
        "answer": null
      }
      ```
    - Error: `500 Internal Server Error`

### Generate Quiz Image

- **URL:** `/quiz/generate?use_chatgpt=true`
- **Method:** `POST`
- **Description:** Generate the prompt and image based on the quiz so far.
- **Query Parameters:**
    - `use_chatgpt` (optional): Specify whether to use ChatGPT for generating the prompt or not. Default is `true`.
- **Request Body:**
  ```
  {
    "quiz": [
      {
        "question": "Question 1",
        "choices": ["Choice 1", "Choice 2", "Choice 3"],
        "answer": "Choice 2"
      },
      ...
    ]
  }
  ```
- **Response:**
    - Success: `200 OK`
      ```
      {
        "prompt": "Prompt for image generation",
        "imageUrl": "http://localhost:5000/image/<image_path>"
      }
      ```
    - Error: `500 Internal Server Error`

### Download Image

- **URL:** `/image/<image_path>`
- **Method:** `GET`
- **Description:** Download image and stream it to frontend.
- **Response:**
    - The image file.

## Error Handling

- If there is an error with the OpenAI API, the server will return an error message with status code `500 Internal Server Error`.