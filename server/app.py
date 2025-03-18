from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
import psycopg2
import logging
import os

app = Flask(__name__)
app.config["SESSION_TYPE"] = "filesystem"
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
CORS(app)
Session(app) 


ADMIN_LOGIN = os.getenv("ADMIN_LOGIN")
ADMIN_PASS = os.getenv("ADMIN_PASS")
DEV_MODE = os.getenv("DEV_MODE")

#Gets the connection
def get_db_connection():
    if DEV_MODE == "True":
        logging.info("DEV_MODE set to \"True\" in .env file, using local DB")
        try:
            conn = psycopg2.connect(
                database="postgres",
                user="postgres",
                password="password",
                host="localhost",
                port="5432"
            )
            logging.info("Connected to the database successfully.")
            return conn
        except Exception as e:
            logging.error(f"Database connection failed: {str(e)}")
            return None

    else:
        try:
            conn = psycopg2.connect(
                database="postgres",
                host="apollo-dev.postgres.database.azure.com",
                user=ADMIN_LOGIN,
                password=ADMIN_PASS,
                port="5432",
                sslmode="require"
            )
            logging.info("Connected to the database successfully.")
            return conn
        except Exception as e:
            logging.error(f"Database connection failed: {str(e)}")
            return None

#the route/url that is sends the post
@app.route('/add_user', methods=['POST'])
def add_user():
    #adds the user 
    try:
        logging.info("Received request to /add_user")
        # gets the data and its json object
        data = request.get_json();
        if not data:
            logging.error("No JSON received!")
            return jsonify({"error": "Invalid JSON"}), 400
        
        username=data['username']
        password=data['password']
        email=data['email']

        if not username or not password or not email:
            logging.error(f"Missing fields: {data}")
            return jsonify({"error": "Missing fields"}), 400
        

        logging.info(f"Adding user: {username}, {email}")

        conn=get_db_connection() #gets teh connection
        cursor=conn.cursor() 

         #TODO: 
        #1. Add SQL Injection prevention
        #2. Add email verification, I.e make sure the email does not exist within the db

        #inserts the user into the db 
        cursor.execute("""
            INSERT INTO users (username, password, email)
            VALUES (%s, %s, %s)
            RETURNING username, email;
        """, (username, password, email))

        new_user = cursor.fetchone(); #gets new user for debugging
        conn.commit();
        cursor.close();
        conn.close();
    
        #debugging
        if new_user:
            
            return jsonify({"message": "User added successfully", "user": new_user}), 201
        else:
            return jsonify({"error": "Failed to add user"}), 400
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/validate_user', methods=['POST'])
def validate_user():
    #adds the user 
    try:
        logging.info("Received request to /validate_user")
        # gets the data and its json object
        data = request.get_json();
        if not data:
            logging.error("No JSON received!")
            return jsonify({"error": "Invalid JSON"}), 400
        
        username_or_email=data['username_or_email']
        password=data['password']
        

        if not username_or_email or not password:
            logging.error(f"Missing fields: {data}")
            return jsonify({"error": "Missing fields"}), 400
        

       

        conn=get_db_connection() #gets teh connection
        cursor=conn.cursor() 


       


        #inserts the user into the db 
        cursor.execute("SELECT username, email FROM users WHERE (username = %s OR email = %s) AND password = %s",
                        (username_or_email, username_or_email, password))
        user = cursor.fetchone();
        

        cursor.close();
        conn.close();
    
        if user:
            session['user'] = {"username": user[0], "email": user[1]}
            session.modified = True  # Ensure session is marked as changed
            print("Session Data:", session)
            return jsonify({"message": "User validated", "user": {"username": user[0], "email": user[1]}}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401
        
    except Exception as e:
        logging.error(f"Error in validate_user: {str(e)}")
        return jsonify({"error": str(e)}), 400


@app.route('/current_user', methods=['GET'])
def current_user():
    user = session.get("user")
    if user:
        return jsonify({"user": user})
    return jsonify({"error": "No user logged in"}), 401

if __name__ == '__main__':
    app.run(debug=True)