# Code to create the PostgreSQL tables on the local database.
# REQUIRED: psycopg2 (pip install psycopg2)

import psycopg2
import os


### DEPRECATED: The DB only needed to be created once wiht Azure do not run this ###


ADMIN_LOGIN = os.getenv("ADMIN_LOGIN")
ADMIN_PASS = os.getenv("ADMIN_PASS")

# Establish connection to DB and create cursor
conn = psycopg2.connect(
                database="postgres",
                host="apollo-dev.postgres.database.azure.com",
                password="SBHF_postgres",
                user="apolloadmin",
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

# UPDATE ADDED NEW TABLES FOR FORMULA/SURVEY
cursor.execute("""
    CREATE TABLE IF NOT EXISTS personal_traits (
    username VARCHAR(30) NOT NULL,
    creativity INT CHECK (creativity BETWEEN 1 AND 10),
    leadership INT CHECK (leadership BETWEEN 1 AND 10),
    enthusiasm INT CHECK (enthusiasm BETWEEN 1 AND 10),
    PRIMARY KEY (username),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_contacts (
    username VARCHAR(30) NOT NULL,
    phone_number VARCHAR(20),
    github_link VARCHAR(255),
    discord_profile VARCHAR(255),
    PRIMARY KEY (username),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);
""")

# Add test user
# Add test user


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