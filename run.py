
from flask import (Flask, g, jsonify, redirect, render_template, request,
                   session)
from passlib.hash import pbkdf2_sha256

from db import Database

DATABASE_PATH = 'index'

app = Flask(__name__)
app.secret_key = b'demo_key_not_real!'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = Database(DATABASE_PATH)
    return db


@app.teardown_appcontext
def close_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/view')
def view():
    return render_template('view.html')


def generate_get_results_response(args):
    content = args.get('stringvalue')
    return jsonify({
        'textstring': get_db().get_results(content)
    })


@app.route('/api/get_results', methods=['GET'])
def api_get_results():
    return generate_get_results_response(request.args)


def generate_get_id_response(args):
    content = args.get('uid')
    return jsonify({
        'idtext': get_db().get_id(content)
    })


@app.route('/api/get_id', methods=['GET'])
def api_get_id():
    return generate_get_id_response(request.args)


def generate_get_mission_response(args):
    content = args.get('mission')
    idnumber = args.get('uid')
    return jsonify({
        'missionsimilar': get_db().get_mission(content,idnumber)
    })


@app.route('/api/get_mission', methods=['GET'])
def api_get_mission():
    return generate_get_mission_response(request.args)


if __name__ == '__main__':
    app.run(host='localhost', port=8075, debug=True)
