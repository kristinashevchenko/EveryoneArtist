# EveryoneArtist
_How might we ​guide everyone without knowledge about effective text-based-prompting ​
to ​express their creativity through Image-Generation in a quiz-style manner?_

Our application EveryoneArtist uses Chat GPT to generate personalized quizzes tailored to the user's interests. The questions adapt to the previously given answers in order to gradually concretize what the generated image should contain and look like. To generate the image we create a prompt from the answers and send it to the Dall-E API to receive the generated image. If the user is not satisfied with the outcome of the conversation, already given answers can be edited afterwards and a new image can be generated. There are endless possibilities to a unique image and with EveryoneArtist the user can explore all of
them!


## Combined Setup and Installation

1. Obtain an OpenAI API key by signing up on the [OpenAI platform](https://platform.openai.com/).
2. Set the `OPEN_AI_KEY` environment variable with your API key.
3. Clone the repository and navigate to the project directory.
4. Install the required backend dependencies by running `pip install -r requirements.txt` in the server folder.
5. Start the Flask server by running `python app.py` in the server folder.
6. Install the required frontend dependencies by running `npm install` in the client folder.
7. Start the client by running `npm start` in the client folder.

Note: Make sure the Flask server is running before starting the client.

The web application will be accessible at `http://localhost:3000`.

## Backend

The backend of EveryoneArtist is built with Flask and provides API endpoints for the web application. It leverages OpenAI's ChatGPT for conversational AI and Dall-E for image generation.

### Setup

1. Make sure you have [Python](https://www.python.org/) installed
2. Obtain an OpenAI API key by signing up on the [OpenAI platform](https://platform.openai.com/).
3. Set the `OPEN_AI_KEY` environment variable with your API key.

### Installation

1. Go to the server folder.
2. Install the required dependencies by running the following command:

   ```
   pip install -r requirements.txt
   ```

### Usage

To start the Flask server, run the following command in the server folder:

```
python app.py
```

The server will start running at `http://localhost:5000`.

## Frontend

### Installation

Before running the client locally, please make sure you have the following installed:

1. NPM
2. Node (at least version 14). If you have [NVM](https://github.com/nvm-sh/nvm) installed, you can run `nvm use` (probably you still need to download version through NVM).

For more information, refer to the [official NPM documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

To start the client:

1. Go to the client folder.
2. Run `npm install` in the client folder to install the dependencies. You should run this command the first time you set up the project or if there are package version updates in `package.json`. You don't need to run it each time.

### Usage

To start the React frontend, run the following command in the client folder:

```
npm start
```

The client will start running at `http://localhost:3000`.