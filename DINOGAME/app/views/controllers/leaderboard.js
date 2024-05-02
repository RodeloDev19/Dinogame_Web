console.log('Leaderboard controller loaded');

document.addEventListener("DOMContentLoaded", () => {
    fetch('/leaderboard')
        .then(response => response.json())
        .then(data => {
            const leaderboardBody = document.getElementById('leaderboard-body');
            data.forEach((user, index) => {
                const row = `<tr>
                                <td>${index + 1}</td>
                                <td>${user.username}</td>
                                <td>${user.highScore}</td>
                             </tr>`;
                leaderboardBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error:', error));
});
