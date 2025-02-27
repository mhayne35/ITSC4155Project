from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import logging
import os

app = Flask(__name__)
CORS(app)

ADMIN_USER = os.getenv("ADMIN_USER")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

#Gets the connection
def get_db_connection():
    try:
        conn = psycopg2.connect(
            database="postgres",
            host="apollo-dev.postgres.database.azure.com",
            user=ADMIN_USER,
            password=ACCESS_TOKEN,
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
        return jsonify({"message": "User added successfully", "user": new_user}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True)