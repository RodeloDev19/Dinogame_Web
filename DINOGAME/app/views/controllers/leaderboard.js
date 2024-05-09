console.log('Leaderboard controller loaded');

document.addEventListener("DOMContentLoaded", () => {
        fetch('/api/leaderboard')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const leaderboardBody = document.getElementById('leaderboard-body');
            if (data.length === 0) {
                leaderboardBody.innerHTML = '<tr><td colspan="3">No data available</td></tr>';
            } else {
                data.forEach((user, index) => {
                    const row = `<tr>
                                    <td>${index + 1}</td>
                                    <td>${user.username}</td>
                                    <td>${user.highScore}</td>
                                 </tr>`;
                    leaderboardBody.innerHTML += row;
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const leaderboardBody = document.getElementById('leaderboard-body');
            leaderboardBody.innerHTML = `<tr><td colspan="3">Error loading data</td></tr>`;
        });
});