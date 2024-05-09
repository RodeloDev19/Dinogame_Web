//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

//cactus
let cactusArray = [];

let cactus1Width = 20;
let cactus2Width = 55;
let cactus3Width = 88;
let cactus4Width = 34;
let cactus5Width = 69;
let cactus6Width = 102;

let cactusHeight = 56;
let cactusX = 690;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;
let cactus4Img;
let cactus5Img;
let cactus6Img;

//bird1
let birdArray = [];
let bird1Img;
let bird1Width = 50;
let bird1Height = 50;
let bird1Y = dinoY; // A la altura exacta del dinosaurio

//bird2
let bird2Img;
let bird2Width = 50;
let bird2Height = 30;
let bird2Y = dinoY - 30; // A la altura media del dinosaurio

//physics
let velocityX = -8; //cactus moving left speed
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

// Declaración de una variable para la imagen del suelo
let trackImg;
let trackOffset = 0; // Offset para el desplazamiento del suelo

// Declaraciones de variables para las imágenes de game over y reset
let gameOverImg;
let resetImg;

let cactusInterval;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); //used for drawing on the board

    //draw initial dinosaur
    // context.fillStyle="green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Obtener el personaje seleccionado
    const selectedCharacter = sessionStorage.getItem("selectedCharacter");

    // Cambiar la imagen del dinosaurio según el personaje seleccionado
    switch (selectedCharacter) {
        case "T-REX":
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/trex-removebg-preview.png";
            break;
        case "T-MEX":
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/tmex-removebg-preview.png";
            break;
        case "T-RED":
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/tred-removebg-preview.png";
            break;
        case "T-SHERLOCK":
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/tsherlock-removebg-preview.png";
            break;
        default:
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/dino.png"; // Default image if nothing is selected
            break;
    }

    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    };

    cactus1Img = new Image();
    cactus1Img.src = "/views/imgs/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "/views/imgs/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "/views/imgs/cactus3.png";

    cactus4Img = new Image();
    cactus4Img.src = "/views/imgs/big-cactus1.png";

    cactus5Img = new Image();
    cactus5Img.src = "/views/imgs/big-cactus2.png";

    cactus6Img = new Image();
    cactus6Img.src = "/views/imgs/big-cactus3.png";

    bird1Img = new Image();
    bird1Img.src = "/views/imgs/bird1.png";

    bird2Img = new Image();
    bird2Img.src = "/views/imgs/bird2.png";

    // Carga la imagen del suelo
    trackImg = new Image();
    trackImg.src = "/views/imgs/track.png";
    
    // Carga las imágenes de game over y reset
    gameOverImg = new Image();
    gameOverImg.src = "/views/imgs/game-over.png";

    resetImg = new Image();
    resetImg.src = "/views/imgs/reset.png";

    if (!cactusInterval) {
        cactusInterval = setInterval(placeCactus, 1000); // Solo se establece una vez
    }
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDino);
}

let animationFrameId = null; // Variable global para almacenar el ID del frame de animación

function update() {
    // Cancelar el frame anterior para asegurar que no se acumulen llamadas
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    // Solicitar un nuevo frame de animación
    animationFrameId = requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);

    // Draw track
    context.drawImage(trackImg, trackOffset, boardHeight - 20, boardWidth, 20);
    context.drawImage(trackImg, trackOffset + boardWidth, boardHeight - 20, boardWidth, 20);
    
    // Adjust track offset for infinite scrolling
    trackOffset += velocityX;
    if (trackOffset <= -boardWidth) {
        trackOffset = 0;
    }

    // Apply gravity to dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY); // Make sure dino doesn't exceed the ground

    // Draw dino
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    // Move cacti and birds
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "/views/imgs/dino-dead.png";
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    for (let i = 0; i < birdArray.length; i++) {
        let bird = birdArray[i];
        bird.x += velocityX;
        context.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);

        if (detectCollision(dino, bird)) {
            gameOver = true;
            dinoImg.src = "/views/imgs/dino-dead.png";
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    // Update score
    context.fillStyle="black";
    context.font="18px 'Press Start 2P'";
    score++;
    context.fillText(score, 680, 20);


    if (gameOver) {
        // Draw game over and reset images
        cancelAnimationFrame(animationFrameId);
        context.drawImage(gameOverImg, (boardWidth - gameOverImg.width) / 2, (boardHeight - gameOverImg.height) / 2);
        context.drawImage(resetImg, (boardWidth - resetImg.width) / 2, (boardHeight - resetImg.height) / 2 + 50);

        function gameOverFunction() {
            fetch('/update-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: sessionStorage.getItem("username"), score: score })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }
    gameOverFunction();
    }
}

// Maneja el reinicio del juego cuando el usuario presiona la tecla de espacio
document.addEventListener("keydown", function(e) {
    if (!gameOver && (e.code === "Space" || e.code === "ArrowUp")) {
        moveDino(e); // Esto hace que el dinosaurio salte
    } else if (gameOver && e.code === "Space") {
        resetGame(); // Esto reinicia el juego
    }
});

// Función para reiniciar el juego
function resetGame() {
    // Reiniciar el estado del juego
    gameOver = false;
    score = 0;

     // Reiniciar la velocidad del juego usando sessionStorage
    const storedSpeed = sessionStorage.getItem("gameSpeed");
    if (storedSpeed) {
        const speed = parseInt(storedSpeed);
        velocityX = -((speed - 10) * 0.5 + 6); // Ajustar la velocidad del juego según el nivel
    } else {
        velocityX = -8; // Velocidad por defecto si no hay valor almacenado
    }


    // Reiniciar la velocidad
    velocityY = 0; // Velocidad vertical inicial
    gravity = 0.4; // Gravedad inicial

    // Limpiar cactuses y pájaros
    cactusArray = [];
    birdArray = [];
    
    // Reiniciar la posición del dinosaurio
    dino.y = dinoY;
    dino.x = dinoX;

    // Reiniciar el desplazamiento del suelo
    trackOffset = 0;

    // Reiniciar el estado de agachado
    ducking = false;
    dinoHeight = originalDinoHeight;
    dino.y = originalDinoY;

    const selectedCharacter = sessionStorage.getItem("selectedCharacter");

    switch (selectedCharacter) {
        case "T-REX":
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/dino.png";
            break;
        case "T-MEX":
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/tmex-removebg-preview.png";
            break;
        case "T-RED":
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/tred-removebg-preview.png";
            break;
        case "T-SHERLOCK":
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/tsherlock-removebg-preview.png";
            break;
        default:
            dinoImg = new Image();
            dinoImg.src = "/views/imgs/dino.png"; // Default character
            break;
    }
    
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    };

    // Reinicia el canvas
    context.clearRect(0, 0, board.width, board.height);

    // Iniciar el ciclo de actualización
    requestAnimationFrame(update);
}


let ducking = false;
let originalDinoHeight = dinoHeight;
let originalDinoY = dinoY;
let duckDinoHeight = 64; // New height for ducking dino

function moveDino(e) {
  if (gameOver) {
    return;
  }

  if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
    //jump
    velocityY = -10;
  } else if (e.code == "ArrowDown") {
    // Agachar (Duck)
    if (dino.y == dinoY && !ducking) {
      ducking = true;
      dinoImg.src = "/views/imgs/dino-duck1.png";
      dinoHeight = duckDinoHeight;
      dino.y = dinoY - (originalDinoHeight - duckDinoHeight); // Adjust dino.y for new height
      dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height = 34);
      };
    }
  }
}

// When releasing "ArrowDown" key, restore dino to original state
document.addEventListener("keyup", function(e) {
  if (e.code == "ArrowDown" && ducking) {
    ducking = false;
    dinoImg.src = "/views/imgs/dino.png";
    dinoImg.onload = function() {
      context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    };
    dino.height = originalDinoHeight;
    dino.y = originalDinoY;
  }
});

function placeCactus() {
    if (gameOver) {
        return;
    }

    //place cactus
    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    };

    let placeCactusChance = Math.random(); //0 - 0.9999...

    if (score > 1000) {
        if (placeCactusChance > .70) { //10% you get cactus6
            cactus.img = cactus6Img;
            cactus.width = cactus6Width; // Assuming all big cacti have the same width
            cactus.height = cactusHeight + 20;
            cactus.y = cactusY + (cactusHeight - cactus.height);
            cactusArray.push(cactus);
        }
        else if (placeCactusChance > .60) { //30% you get cactus5
            cactus.img = cactus5Img;
            cactus.width = cactus5Width; // Assuming all big cacti have the same width
            cactus.height = cactusHeight + 20;
            cactus.y = cactusY + (cactusHeight - cactus.height);
            cactusArray.push(cactus);
        }
        else if (placeCactusChance > .50) { //50% you get cactus4
            cactus.img = cactus4Img;
            cactus.width = cactus4Width; // Assuming all big cacti have the same width
            cactus.height = cactusHeight + 20;
            cactus.y = cactusY + (cactusHeight - cactus.height);
            cactusArray.push(cactus);
        }
    } else {
        // Keep the same logic for cactus 1, 2, and 3 regardless of the score
        if (placeCactusChance > .70) { //10% you get cactus3
            cactus.img = cactus3Img;
            cactus.width = cactus3Width;
            cactusArray.push(cactus);
        }
        else if (placeCactusChance > .60) { //30% you get cactus2
            cactus.img = cactus2Img;
            cactus.width = cactus2Width;
            cactusArray.push(cactus);
        }
        else if (placeCactusChance > .50) { //50% you get cactus1
            cactus.img = cactus1Img;
            cactus.width = cactus1Width;
            cactusArray.push(cactus);
        }
    }

    if (score > 1200) {
        let lastCactus = cactusArray[cactusArray.length - 1];
        let birdSpace = 250; // Distancia fija entre el último cactus y el pájaro
        let birdX = lastCactus.x + lastCactus.width + birdSpace; // Colocar pájaro 200px después del último cactus

        let placeBirdChance = Math.random();
        if (placeBirdChance > 0.5) {
            let bird = {
                img: null,
                x: birdX,
                y: Math.random() < 0.5 ? dinoY : dinoY - 50,
                width: 50,
                height: bird1Height
            };

            bird.img = Math.random() < 0.5 ? bird1Img : bird2Img;
            birdArray.push(bird);
        }
    }

    if (cactusArray.length > 5) {
        cactusArray.shift(); // Remueve el primer elemento si hay más de 5
    }

    if (birdArray.length > 5) {
        birdArray.shift(); // Remueve el primer elemento si hay más de 5
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

//Se encarga del input range, para la dificultad
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("slider"); // Referencia al control deslizante
    const sliderValue = document.getElementById("sliderValue"); // Referencia al párrafo
    const speedForm = document.getElementById("speedForm"); // Referencia al formulario

    slider.addEventListener("input", function() {
        sliderValue.textContent = slider.value; // Actualizar el contenido del párrafo
        const value = slider.value; // Obtiene el valor del control deslizante
        sliderValue.textContent = value; // Actualiza el contenido del párrafo

        // Ajustar el color del riel y del thumb según el valor del control deslizante
        const percentage = ((value - 10) / 40) * 100; // Calcular porcentaje relativo
        slider.style.background = `linear-gradient(to right, gray ${percentage}%, #ffffff ${percentage}%)`;
    });

    speedForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const speed = slider.value; // Obtiene el valor del control deslizante
        sessionStorage.setItem("gameSpeed", speed); // Guarda la velocidad en sessionStorage

        // Reiniciar el juego con la nueva velocidad
        resetGameWithSpeed(speed);
    });
});

// Función para reiniciar el juego con la velocidad dada
function resetGameWithSpeed(speed) {
    const speedValue = parseInt(speed);
    // Ajustar `velocityX` para que sea más rápido a mayor dificultad
    velocityX = -((speedValue - 10) * 0.5 + 6);

    // Luego, llama a `resetGame` para reiniciar el juego con la nueva velocidad
    resetGame();
}

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const viewLeaderboardBtn = document.getElementById('view_leaderboard_btn');
    const viewGamesBtn = document.getElementById('view_games_btn');
    const token = sessionStorage.getItem('token');

    function updateUIForLoggedIn() {
        loginButton.textContent = 'Cerrar sesión';
        loginButton.onclick = handleLogout;
        viewLeaderboardBtn.style.display = 'block';
        viewGamesBtn.style.display = 'block';
    }

    function updateUIForLoggedOut() {
        loginButton.textContent = 'Iniciar sesión';
        loginButton.onclick = () => window.location.href = '/login';
        viewLeaderboardBtn.style.display = 'none';
        viewGamesBtn.style.display = 'none';
        resetGame();
    }

    function handleLogout(event) {
        event.preventDefault();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        updateUIForLoggedOut();
    }

    if (token) {
        updateUIForLoggedIn();
    } else {
        updateUIForLoggedOut();
    }
});

