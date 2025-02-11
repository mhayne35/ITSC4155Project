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

# Drop the table
# cursor.execute("DROP TABLE users;")

# DB setup
# I am evil and I will put every column in the "users" table.
# This definitely will not have any performance impact. Nope. Not at all.
cursor.execute("""
               CREATE TABLE IF NOT EXISTS users (
               username varchar(30) NOT NULL,
               password varchar(512) NOT NULL,
               email varchar(255) NOT NULL,
               interestsandhobbies varchar(65535),
               skills varchar(65535),
               pastprojects varchar(65535),
               PRIMARY KEY (username)
               );
               """)
# Add test user
cursor.execute("""
               INSERT INTO users (username, password, email)
               VALUES ('testuser', 'password', 'user@example.com');
               """)

# Testing
cursor.execute("""
               SELECT * FROM users;
               """)
print("if I didn't mess up this should print out the info for testuser")
print(cursor.fetchone())