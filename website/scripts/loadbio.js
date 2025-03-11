document.addEventListener("DOMContentLoaded", function () {
    // Get userId from the URL
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");

    if (!userId) {
        document.getElementById("user-name").innerText = "No user selected";
        document.getElementById("user-email").innerText = "";
        return;
    }

    fetch("users.json") // CHANGE TO DATABASE
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.id == userId);
            if (user) {
                document.getElementById("user-name").innerText = user.name;
                document.getElementById("user-email").innerText = user.email;
            } else {
                document.getElementById("user-name").innerText = "User not found";
                document.getElementById("user-email").innerText = "";
            }
        })
        .catch(error => console.error("Error fetching user data:", error));
});
