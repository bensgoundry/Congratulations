from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import os
from config import CREDENTIALS

app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if data['username'] == CREDENTIALS['user'] and data['password'] == CREDENTIALS['password']:
        return jsonify({'success': True})
    return jsonify({'success': False}), 401

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    print(f"Static folder: {app.static_folder}")
    print(f"Static folder contents: {os.listdir(app.static_folder)}")
    app.run(host='0.0.0.0', port=5000, debug=True)