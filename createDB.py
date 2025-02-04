# Code to create the PostgreSQL tables on the local database.
# REQUIRED: psycopg2 (pip install psycopg2)

import psycopg2

# Establish connection to DB and create cursor
conn = psycopg2.connect(
    database="postgres",
    host="localhost",
    user="postgres",
    password="password",
    port="5432"
                        )
cursor = conn.cursor()

# DB setup
cursor.execute("""
               CREATE TABLE IF NOT EXISTS users (
               username varchar(30) NOT NULL,
               password varchar(512) NOT NULL,
               PRIMARY KEY (username)
               );
               """)
# Add test user
cursor.execute("""
               INSERT INTO users (username, password)
               VALUES ('testuser', 'password');
               """)

# Testing
cursor.execute("""
               SELECT * FROM users;
               """)
print("if I didn't mess up this should print out the info for testuser")
print(cursor.fetchone())