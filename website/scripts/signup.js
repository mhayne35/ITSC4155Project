
import { registerUser } from './endpoints.js';
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("signupForm").addEventListener("submit", function(event) {
        event.preventDefault();
    
        // Get input values
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let confirmPassword = document.getElementById("confirmPassword").value.trim();
        let nameError = document.getElementById("nameError");
        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        let confirmPasswordError = document.getElementById("confirmPasswordError");
        let generalError = document.getElementById("generalError");
    
        // Reset error messages
        nameError.style.display = "none";
        emailError.style.display = "none";
        passwordError.style.display = "none";
        confirmPasswordError.style.display = "none";
        generalError.style.display = "none";
    
        let isValid = true;
    
        // Input validation
        if (!name) {
            nameError.style.display = "block";
            isValid = false;
        }
    
        if (!email) {
            emailError.style.display = "block";
            isValid = false;
        }
    
        if (!password) {
            passwordError.style.display = "block";
            isValid = false;
        }
    
        if (!confirmPassword) {
            confirmPasswordError.style.display = "block";
            confirmPasswordError.textContent = "Please confirm your password.";
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.style.display = "block";
            confirmPasswordError.textContent = "Passwords do not match.";
            isValid = false;
        }
    
        if (!name || !email || !password || !confirmPassword) {
            generalError.style.display = "block";
            isValid = false;
        }
    
        if (isValid) {
            // fetches from the hosted backend (post url)
            registerUser(name, password, email)
            .then(data => {
                if (data) {
                    // alert("User Added: \n" + data[0]);
                    window.location.href = "login.html"; // Redirect to login page after successful signup
                } else {
                    generalError.textContent = "Username or email already exists.";
                    generalError.style.display = "block";
                }
            })
        }
    });
    
})
//Jackson Franke