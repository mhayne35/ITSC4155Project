document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
    
        // Get input values
        let emailOrUsername = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        let generalError = document.getElementById("generalError");
    
        // Reset error messages
        emailError.style.display = "none";
        passwordError.style.display = "none";
        generalError.style.display = "none";
    
        let isValid = true;
    
        // Input validation
        if (!email) {
            emailError.style.display = "block";
            isValid = false;
        }
    
        if (!password) {
            passwordError.style.display = "block";
            isValid = false;
        }
    
        if (!email || !password) {
            generalError.style.display = "block";
            isValid = false;
        }
    
        // Input sanitization to prevent SQL injection
       
    
        if (isValid) {
            fetch('http://127.0.0.1:5000/validate_user', {
                method: 'POST', //post method
                headers: {
                    'Content-Type': 'application/json'
                },
                // feeds it the name, pass, and email as json (app jsonifies the data)
                body: JSON.stringify({
                    username_or_email: emailOrUsername, //label username is just because simplicity it can take both
                    password: password,
                })
            })
            .then(response => response.json()) // response
            .then(data => {
                if (data.user) {
                    alert(`Welcome: ${data.user.username}`); // debugging
                    window.location.href = "biography.html"; // redirects after sign
                } else {
                    alert(data.error || 'Invalid username or password'); 
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error adding user');
            });
        }
    });
})
