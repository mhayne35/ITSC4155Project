import { getCurrUser, getUserData } from './endpoints.js';

document.addEventListener("DOMContentLoaded", async function(){
    const urlParams = new URLSearchParams(window.location.search);
    const queryUsername = urlParams.get('user');

    let usernameToLoad;

    if (queryUsername) {
        usernameToLoad = queryUsername;
    } else {
        const currentUser = await getCurrUser();
        if (!currentUser) {
            alert("Something went wrong");
            return;
        }
        usernameToLoad = currentUser.username;
    }

    const data = await getUserData(usernameToLoad);
    if (data) {
        document.getElementById("username").textContent = data.username || 'N/A';
        document.getElementById("email").textContent = data.email || 'N/A';
        document.getElementById("skills").textContent = data.skills || 'N/A';
        document.getElementById("projects").textContent = data.pastProjects || 'N/A';
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
        alert("User Does Not Exist");
        window.location.href = "login.html";
    }
});
