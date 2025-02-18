# ITSC 4155 Final Project

## Description
Group creation web application using criteria such as shared keyword interests and quantitatively-measured traits. 
Users sign up and create an account, write a bio about themselves, and are allowed to scroll through other potential teammates.
Users can submit a survey or sorts to request teammates for a specific project, which the website algorithm will then use to match them to other users that may be interested, or having skills that pertain to the area of need.
Once users get a match, they will recieve an email notifying them and a way to contact the other user.

## Authors
Michael Haynes

James Best

Jackson Franke

Mason Scarbro

## Dependencies
* PostgreSQL 17.2
* Some version of Python 3 (I don't know, just use the latest version)
* psycopg2 (used for createDB.py)
  * If you're getting a ModuleNotFound error it's probably installing the package to
  the wrong installation of Python. To solve this do "py -m pip install psycopg2" 
  instead of just "pip install psycopg2".
* Node.js
* Docker (for development purposes)

## HELP HOW DO I USE POSTGRESQL
1. INSTALL POSTGRESQL 17.2 ON YOUR MACHINE. https://www.postgresql.org/download/
  * Because I am lazy, use the password "password" and default settings for everything.
  * DO NOT USE "PASSWORD" IN A LIVE PRODUCTION ENVIRONMENT
2. Install the PostgreSQL extension for VSCode (the one published by Microsoft)
3. (Topbar) ">PostgreSQL: New Query"
4. Create Connection Profile
5. Connect to localhost.
  * Assuming you followed step 1 correctly:
  * User is "postgres"
  * Password is "password".
  * Everything else is default.
6. You should be connected!

(I'll update this with more steps the further along I get into developing the database. -Michael)

## Something doesn't work
![Works on my machine.](/worksonmymachine.png)

(But seriously, good luck figuring out what went wrong, because I won't know.)
