
import { validateUser, getCurrUser } from './endpoints.js';
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
            validateUser(emailOrUsername, password)
            .then(data => {
                if (data) {
                    alert("Data from validate: \n" + data.username);
                    console.log("Data from validate: ", data);
                    //localStorage.setItem("username", data.username); // not work???
                } else {
                    alert("Invalid username or password");
                }
            })
             // Delay to ensure session updates
        }
    });
})
