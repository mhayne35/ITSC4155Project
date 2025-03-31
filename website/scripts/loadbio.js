import { getCurrUser } from './endpoints.js';
document.addEventListener("DOMContentLoaded", function(){
    getCurrUser()
    .then(data => {
        if (data) {
            console.log(data)

            // Fill the divs with user data
            document.getElementById("username").textContent = data.username || 'N/A';
            document.getElementById("email").textContent = data.email || 'N/A';
            document.getElementById("skills").textContent = data.skills || 'N/A';
            document.getElementById("projects").textContent = data.pastProjects || 'N/A';

            // Check optional fields and display them if they exist
            document.getElementById("phone").textContent = data.phone || 'N/A';
            document.getElementById("discord").textContent = data.discord || 'N/A';
            if (data.github) {
                const githubDiv = document.getElementById("github");
                const githubButton = document.createElement("a");
                githubButton.href = data.github;
                githubButton.target = "_blank";
                githubButton.classList.add("github-btn");
                githubButton.textContent = "Visit GitHub";
                githubDiv.appendChild(githubButton);
            } else {
                document.getElementById("github").textContent = 'N/A';
            }
        } else {
            alert("Something went wrogn");
        }
    })
})