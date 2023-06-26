import openai.error
import requests
from flask_cors import CORS
from flask import Flask, request, jsonify, send_file, Response
import open_ai_api

app = Flask(__name__)
CORS(app)


@app.route("/quiz/answer", methods=['POST'])
def quiz_answer():
    quiz = request.get_json()
    next_element_or_false = open_ai_api.quiz_next_turn(quiz)

    if next_element_or_false:
        return jsonify(next_element_or_false)
    else:
        return "", 500


@app.route("/quiz/generate", methods=['POST'])
def quiz_generate():
    quiz = request.get_json()
    print(quiz)
    generated_data = open_ai_api.quiz_generate_image(quiz)

    generated_data['imageUrl'] = 'http://localhost:5000/image/' + str(generated_data['imageUrl']).split("//", 1)[-1]

    return jsonify(generated_data)


@app.route('/image/<path:custom_path>', methods=['GET'])
def download_image(custom_path):
    image_url = 'https://' + custom_path + '?' + request.query_string.decode()

    response = requests.get(image_url, stream=True)
    headers = {
        'Content-Type': response.headers.get('Content-Type'),
        'Content-Disposition': 'attachment;'
    }

    # Return a Flask response object with the streamed content
    return Response(response.raw, headers=headers)


@app.errorhandler(openai.error.OpenAIError)
def handle_openai_error(e):
    return f"Error with OpenAI: {e}", 500


if __name__ == '__main__':
    app.run(debug=True)
