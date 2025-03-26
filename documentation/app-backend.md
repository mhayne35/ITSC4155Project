# How to Start and Use the Flask App with JavaScript

This document will guide you through the process of starting up the Flask app and explain how the JavaScript code interacts with it to send data (such as user information) to the backend.
### Setting Up the Backend (Flask)
1. **Install Required Libraries**  
   First, install the necessary Python libraries by running the following command in your terminal:
   
   ```bash
   pip install flask flask-cors psycopg2 flask_session
   ```

2. **Set Up .env File**
Now that the app is connected to Azure, you need to create a .env file in the root directory of your project with the following variables:

```e
ADMIN_PASS=SBHF_postgres
ADMIN_LOGIN=apolloadmin

```
Replace {your_school_email} with your school email address.
The ACCESS_TOKEN can be generated through the Azure portal as outlined below.


3. **Run the App**
To start the Flask app, navigate to the directory where app.py is located and run the following command:
```bash
python app.py
```
you might need to cd into backend first



### How the JS Communicates ###
Now, let’s look at how the frontend JavaScript interacts with the Flask app to send user data (such as username, password, and email) to the backend.
**Sending Data to Flask Backend**
Once the form passes validation, the script uses the fetch API to send a POST request to the backend at http://127.0.0.1:5000/add_user.

- The fetch function sends the form data as JSON, including the username, password, and email fields.
```js
fetch('http://127.0.0.1:5000/add_user', {
    method: 'POST', // Send as POST request
    headers: {
        'Content-Type': 'application/json' // Set content type to JSON
    },
    body: JSON.stringify({
        username: name,
        password: password,
        email: email
    }) // Send the data as a JSON string
})
.then(response => response.json()) // Parse the response as JSON
.then(data => {
    if (data.user) {
        alert(`User added: ${data.user[0]}`); // Debugging message
        window.location.href = "index.html"; // Redirect after user is added
    } else {
        alert('Error adding user');
    }
})
.catch(error => {
    console.error('Error:', error);
    alert('Error adding user');
});
```

**Backend Response**
Backend Response
After receiving the POST request, the Flask app processes the data. It inserts the user information into the PostgreSQL database and returns a JSON response.

- If the user is added successfully, Flask responds with a message and the added user data (username and email).
- If an error occurs (for example, the database connection fails), Flask will respond with an error message.


