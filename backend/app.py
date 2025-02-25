from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

#Gets the connection
def get_db_connection():
    conn = psycopg2.connect(
    database="postgres",
    host="localhost",
    user="postgres",
    password="password",
    port="5432"
                        )
    return conn

#the route/url that is sends the post
@app.route('/add_user', methods=['POST'])
def add_user():
    #adds the user 
    try:
        # gets the data and its json object
        data = request.get_json();
        username=data['username']
        password=data['password']
        email=data['email']

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
    # host='0.0.0.0' and port=5000 added to attempt to get it to work in Docker
    app.run(debug=True, host='0.0.0.0', port=5000)