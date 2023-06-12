from flask import Flask, request, jsonify
import requests

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!<p>"


@app.route('/post_test', methods=['POST'])
def handle_post_request():
    data = request.get_json()
    print(data)
    return 'Success'


@app.route('/get_test', methods=['GET'])
def handle_get_request():
    data = {
        "name": "John Doe",
        "age": 30,
        "city": "New York"
    }
    test_json = jsonify(data)

    return test_json

@app.route('/get_post_test', methods=['GET', 'POST'])
def handle_get_post_request():
    data = request.get_json()
    data['name'] = 'Hello there!'
    return jsonify(data)


if __name__ == '__main__':
    app.run()
