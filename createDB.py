# Code to create the PostgreSQL tables on the local database.
# REQUIRED: psycopg2 (pip install psycopg2)

import psycopg2
import os


### DEPRECATED: The DB only needed to be created once wiht Azure do not run this ###


ADMIN_USER = os.getenv("ADMIN_USER")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

# Establish connection to DB and create cursor
conn = psycopg2.connect(
            database="postgres",
            host="apollo-dev.postgres.database.azure.com",
            user=ADMIN_USER,
            password=ACCESS_TOKEN,
            port="5432",
            sslmode="require"
        )
cursor = conn.cursor()

# Drop the table
# cursor.execute("DROP TABLE users;")

# DB setup
# I am evil and I will put every column in the "users" table.
# This definitely will not have any performance impact. Nope. Not at all.
# DB setup
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
# Add test user
cursor.execute("""
    INSERT INTO users (username, password, email)
    VALUES ('testuser', 'password', 'user@example.com');
""")

# Commit changes to the database
conn.commit()
cursor.execute("""
    SELECT * FROM users;
""")
print("if I didn't mess up this should print out the info for testuser")
print(cursor.fetchone())

# Close the connection
cursor.close()
conn.close()