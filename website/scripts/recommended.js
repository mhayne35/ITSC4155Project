import { getCurrUser, getUserData, getUserRecommended } from './endpoints.js';
document.addEventListener("DOMContentLoaded", function(){
    const resultsContainer = document.getElementById("results");
    const noResultsMessage = document.getElementById("no-results");
    getCurrUser()
    .then(data => {
        if (data) {
            console.log(data + " OK ");
            getUserRecommended(data.username).then(recommendedUsers => {
                if (recommendedUsers) {
                    console.log(recommendedUsers);
                    noResultsMessage.style.display = "none";
                    recommendedUsers.forEach(async (user) => {
                        const userInfo = await getUserData(user.username); // Assuming this exists
                        if (userInfo) {
                            const userCard = `
                                <div class="profile">
                                    <img src="${userInfo.img || './images/pfp.jpg'}" alt="User">
                                    <h2>${userInfo.username}</h2>
                                    <p></p>
                                    <a href="biography.html?user=${userInfo.username}"><button>Connect</button></a>
                                </div>
                            `;
                            resultsContainer.innerHTML += userCard;
                        }
                    });
                } else {
                    alert("No recommended users found.");
                    if (!recommendedUsers || recommendedUsers.length === 0) {
                        noResultsMessage.style.display = "block";
                        return;
                    }
                }
            })
        } else {
            alert("Something went wrogn");
        }
    })
})