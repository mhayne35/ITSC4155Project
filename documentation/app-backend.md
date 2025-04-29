# How to Start and Use the Flask App with JavaScript

This document will guide you through the process of starting up the Flask app and explain how the JavaScript code interacts with it to send data (such as user information) to the backend.
### Frontend and Azure basics:
[![Video Title](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/0.jpg)](https://youtu.be/3Sv-to22spY)

### In depth backend explanation
[![Video Title](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/0.jpg)](https://youtu.be/zr5eyampSD0)

### How To Connect to the database and look at the users table: 
https://portal.azure.com/#@student.uncc.edu/resource/subscriptions/b902e8ae-1ab1-4f4d-a8f4-c070a3bcd507/resourceGroups/ITSC4155Apollo/providers/Microsoft.DBforPostgreSQL/flexibleServers/apollo-dev/overview
```bash
psql "host=apollo-dev.postgres.database.azure.com port=5432 dbname=postgres password=SBHF_postgres user=apolloadmin sslmode=require"
```
[![Video Title](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/0.jpg)](https://youtu.be/_63ot2Q3Emc)

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
        // alert(`User added: ${data.user[0]}`); // Debugging message
        window.location.href = "index.html"; // Redirect after user is added
    } else {
        // alert('Error adding user');
    }
})
.catch(error => {
    console.error('Error:', error);
    // alert('Error adding user');
});
```

**Backend Response**
Backend Response
After receiving the POST request, the Flask app processes the data. It inserts the user information into the PostgreSQL database and returns a JSON response.

- If the user is added successfully, Flask responds with a message and the added user data (username and email).
- If an error occurs (for example, the database connection fails), Flask will respond with an error message.


