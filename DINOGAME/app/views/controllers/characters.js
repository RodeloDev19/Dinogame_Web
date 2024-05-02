document.addEventListener("DOMContentLoaded", function() {
    const characters = document.querySelectorAll(".character");

    characters.forEach(character => {
        character.addEventListener("click", function() {
            const characterName = this.querySelector(".character-name").textContent;
            sessionStorage.setItem("selectedCharacter", characterName);

            // Redirigir al juego después de seleccionar el personaje
            window.location.href = "index"; // Cambia según tu ruta de juego
        });
    });
});