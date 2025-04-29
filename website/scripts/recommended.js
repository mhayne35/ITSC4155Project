import { getCurrUser, getUserData, getUserRecommended, searchUser } from './endpoints.js';
document.addEventListener("DOMContentLoaded", function(){
    const resultsContainer = document.getElementById("results");
    const noResultsMessage = document.getElementById("no-results");

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query){
        searchUser(query)
        .then(users => {
            if (users.length > 0) {
                noResultsMessage.style.display = "none";
                users.forEach(async (user) => {
                    const userInfo = await getUserData(user.username); // Assuming this exists
                    if (userInfo) {
                        const userCard = `
                            <div class="profile">
                                <img src="${userInfo.img || './images/pfp.jpg'}" alt="User">
                                <h2>${userInfo.username}</h2>
                                <p><p>
                                <a href="biography.html?user=${userInfo.username}"><button>Connect</button></a>
                            </div>
                        `;
                        resultsContainer.innerHTML += userCard;
                    }
                });
            } else {
                noResultsMessage.style.display = "block";
            }
        })
        .catch(error => {
            console.error('Error searching users:', error);
            noResultsMessage.style.display = "block";
        });
    } else {
        getCurrUser()
        .then(data => {
            if (data) {
                console.log(data + " OK ");
                getUserRecommended(data.username).then(recommendedUsers => {
                    if (recommendedUsers) {
                        console.log(recommendedUsers);
                        
                        noResultsMessage.style.display = "none";
                        function getRating(score) {
                            if (score <= 5)      return { text: 'Very Bad',   color: 'red'    };
                            if (score <= 10)     return { text: 'Bad',        color: 'orange' };
                            if (score <= 15)     return { text: 'Good',       color: 'gold'   };
                            /* 16–20 */          return { text: 'Very Good', color: 'green'  };
                          }
                        recommendedUsers.forEach(async (user) => {
                            const { text, color } = getRating(user.compatibilityScore);
                            const userInfo = await getUserData(user.username); // Assuming this exists
                            if (userInfo) {
                                const userCard = `
                                    <div class="profile">
                                        <img src="${userInfo.img || './images/pfp.jpg'}" alt="User">
                                        <h2>${userInfo.username}</h2>
                                        <p>
                                            Compatibility: 
                                            <span style="color: ${color}; font-weight: bold;">
                                            ${text}
                                            </span>
                                        </p>
                                        <a href="biography.html?user=${userInfo.username}"><button>Connect</button></a>
                                    </div>
                                `;
                                resultsContainer.innerHTML += userCard;
                            }
                        });
                    } else {
                        // alert("No recommended users found.");
                        if (!recommendedUsers || recommendedUsers.length === 0) {
                            noResultsMessage.style.display = "block";
                            return;
                        }
                    }
                })
            } else {
                // alert("Something went wrogn");
            }
        })
    }
    
})