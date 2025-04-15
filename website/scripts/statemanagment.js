import { getCurrUser } from './endpoints.js';
document.addEventListener("DOMContentLoaded", () => {
    getCurrUser().then(data => {
            const isLoggedIn = !!data;
            const currentPage = window.location.pathname.split("/").pop(); 

            const bioLink = currentPage !== "biography.html"
                ? `<a href="biography.html">Bio</a>`
                : "";

            
            const guestHeader = `
                <img src="./images/TeamForge2.png" alt="TeamForge Logo" class="logo">
                <nav class="nav-bar">
                    <a href="signup.html">Sign Up</a>
                    <a href="login.html">Login</a>
                </nav>
            `;

            const userHeader = `
                <img src="images/TeamForge2.png" alt="TeamForge Logo" class="logo">
                <nav class="nav-bar">
                    <a href="signedinhome.html">Home</a>
                    <a href="survey.html">Survey</a>
                    <a href="recommended.html">Matches</a>
                    ${bioLink}
                </nav>
            `;
            const headerElement = document.querySelector(".header");
            if (headerElement) {
                headerElement.innerHTML = isLoggedIn ? userHeader : guestHeader;
            }
            
        })
});