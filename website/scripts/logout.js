
import { logoutUser } from './endpoints.js';
document.addEventListener("DOMContentLoaded", async function(){
    logoutUser().then(() => {
    }).catch(error => {
        console.error('Error during logout:', error);
        alert("Logout failed. Please try again.");
        window.location.href = "index.html";
    });
})