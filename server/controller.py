import openai.error
from flask import Flask, request, jsonify
import open_ai_api

app = Flask(__name__)


@app.route("/quiz/answer", methods=['POST'])
def quiz_answer():
    quiz = request.get_json()
    modified_quiz = open_ai_api.quiz_next_turn(quiz)
    return jsonify(modified_quiz)


@app.route("/quiz/generate", methods=['GET'])
def quiz_generate():
    quiz = request.get_json()
    generated_data = open_ai_api.quiz_generate_image(quiz)
    return jsonify(generated_data)


@app.errorhandler(openai.error.OpenAIError)
def handle_openai_error(e):
    return f"Error with OpenAI: {e}", 500


if __name__ == '__main__':
    app.run()
