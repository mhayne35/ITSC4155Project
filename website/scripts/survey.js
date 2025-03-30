import { sendSurveyInfo } from './endpoints.js';
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("surveyForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from submitting normally

        // Grab all form values
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        // Store values into variables
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const phone = formData.get("phone");
        const github = formData.get("github");
        const discord = formData.get("discord");
        const interests = formData.get("interests");
        const skills = formData.get("skills");
        const pastProjects = formData.get("pastProjects");
        const creativity = formData.get("creativity");
        const leadership = formData.get("leadership");
        const enthusiasm = formData.get("enthusiasm");
        
        const isValidURL = (url) => {
            try {
                new URL(url);
                return true;
            } catch (error) {
                return false;
            }
        };

        // TODO: James or Jackson not of the utmost importance but maybe make these messages instead of console logs
        if (interests && !interests.includes(",")) {
            console.warn("⚠️ Interests should be a comma-separated list (e.g., Reading, Coding, Sports).");
        }

        if (skills && !skills.includes(",")) {
            console.warn("⚠️ Skills should be a comma-separated list (e.g., Leadership, Problem-solving, Communication).");
        }

        if (pastProjects && !pastProjects.includes(",")) {
            console.warn("⚠️ Past Projects should be a comma-separated list. URLs are preferred.");
        }

        // Validate GitHub URL
        if (github && !isValidURL(github)) {
            console.warn("⚠️ Invalid GitHub URL format. Please enter a valid URL.");
        }
        pastProjects.split(",").forEach((project) => {
            const trimmedProject = project.trim();
            if (trimmedProject && (trimmedProject.includes("http") || trimmedProject.includes("www"))) {
                if (!isValidURL(trimmedProject)) {
                    console.warn(`⚠️ Invalid URL in Past Projects: "${trimmedProject}". Please enter valid URLs.`);
                }
            }
        });
        
        
        
    });
});
