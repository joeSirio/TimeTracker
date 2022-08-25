import os
from unittest import result
from flask import Flask, jsonify, make_response, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_cors import CORS
from werkzeug.security import generate_password_hash,check_password_hash
from functools import wraps
import uuid
import datetime

import db

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "A7A6814DC33B962F3EEF408962B11AF704297A61B8C542F3A18A323670D41EB7"#os.environ.get("JWT_SECRET") 
jwt = JWTManager(app)

CORS(app)
# cors = CORS(app, resources={r"/api": {"origins": "http://localhost:3000"}})

def token_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
       token = None
       if 'x-access-tokens' in request.headers:
           token = request.headers['x-access-tokens']
 
       if not token:
           return jsonify({'message': 'a valid token is missing'})
       try:
           data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
           current_user = Users.query.filter_by(public_id=data['public_id']).first()
       except:
           return jsonify({'message': 'token is invalid'})
 
       return f(current_user, *args, **kwargs)
   return decorator

@app.route('/register', methods=['POST'])
def signup_user(): 
    data = request.get_json() 
    print(data)
    hashed_password = generate_password_hash(data['password'], method='sha256')
    db.add_user(data['email'], hashed_password)
    return jsonify({'message': 'registered successfully'}) 
    
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data("email", None)
    password = data("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route("/getActive/<id>", methods=["GET"])
# @token_required
def getActive(id):
    record = db.get_active_record(id)
    print(record)
    return jsonify(record)

@app.route("/get/<id>", methods=["GET"])
def get(id):
    results = db.get_time_records(id)
    return jsonify(results)

@app.route("/add", methods=["POST"])
def add():
    print(request)
    db.add_time_record(request.form)

@app.route("/update", methods=["POST"])
def update():
    print(request)
    db.update_time_record(request.form)

@app.route("/delete/<id>", methods=["DELETE"])
def guide_delete(id):
    print('delete')
    db.remove_time_record(id)

if __name__ == "__main__":
    app.run()
