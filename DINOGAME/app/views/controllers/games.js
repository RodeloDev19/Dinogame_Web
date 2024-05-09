// games.js
document.addEventListener('DOMContentLoaded', function() {
        fetchScores(); // Función existente para cargar los scores
});

async function fetchScores() {
    const username = sessionStorage.getItem("username"); // Asumiendo que el nombre de usuario está guardado en sessionStorage
    const response = await fetch(`/api/scores?username=${username}`);
    const data = await response.json();

    if (response.ok) {
        updateLeaderboard(data.scores);
        displayHighScore(data.highScore);
    } else {
        console.error('Failed to fetch scores:', data);
    }
}

function updateLeaderboard(scores) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // Limpiar el cuerpo de la tabla

    scores.forEach((score, index) => {
        const dateObj = new Date(score.date); // Convertir la cadena de fecha en un objeto Date
        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`; // Formatear la fecha
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.score}</td>
            <td>${formattedDate}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

function displayHighScore(highScore) {
    const highScoreDisplay = document.getElementById('high-score');
    highScoreDisplay.textContent = `High Score: ${highScore}`;
}
