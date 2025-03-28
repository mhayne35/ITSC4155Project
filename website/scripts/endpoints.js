

export async function validateUser(emailOrUsername, password) {
    try {
        const response = await fetch("https://teamforge-beackend-f4fsfvbud9g7b0bp.canadacentral-01.azurewebsites.net/validate_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username_or_email: emailOrUsername,
                password: password, // Now properly passed
            }),
        });

        const data = await response.json();
        window.location.href = "http://127.0.0.1:5500/website/biography.html"; 
        if (!response.ok) throw new Error(data.error || "Invalid username or password");

        return data.user; // Ensure this returns the user properly

    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
        return null;
    }

}

export async function registerUser(name, password, email) {
    try {
        const response = await fetch('https://teamforge-beackend-f4fsfvbud9g7b0bp.canadacentral-01.azurewebsites.net/add_user', {
            method: 'POST', //post method
            headers: {
                'Content-Type': 'application/json'
            },
            // feeds it the name, pass, and email as json (app jsonifies the data)
            body: JSON.stringify({
                username: name,
                password: password,
                email: email
            })
        })

        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || "Invalid username or password");

        return data.user; // Ensure this returns the user properly

    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
        return null;
    }
}

export async function getCurrUser() {
    try {
        const response = await fetch("https://teamforge-beackend-f4fsfvbud9g7b0bp.canadacentral-01.azurewebsites.net/current_user", {
            method: "GET",
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "No User Logged In");

        return data.user; // Ensure this returns the user properly

    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
        return null;
    }
}