const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const mainImage = document.getElementById('mainImage');
const buttonContainer = document.getElementById('buttonContainer');

// Make the "No" button run away when hovered
noButton.addEventListener('mouseover', () => {
    const randomX = Math.random() * (window.innerWidth - noButton.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noButton.offsetHeight);

    noButton.style.position = 'absolute';
    noButton.style.left = `${Math.max(0, Math.min(randomX, window.innerWidth - noButton.offsetWidth))}px`;
    noButton.style.top = `${Math.max(0, Math.min(randomY, window.innerHeight - noButton.offsetHeight))}px`;
});

// Handle "No" button click
noButton.addEventListener('click', () => {
    alert('You clicked Yes!');
    
});

    yesButton.addEventListener('click', () => {
        const mainContainer = document.createElement('div');
        mainContainer.style.display = 'flex';
        mainContainer.style.flexDirection = 'column'; // Single column layout
        mainContainer.style.alignItems = 'center'; // Center align elements
        mainContainer.style.gap = '20px'; // Space between elements
        mainContainer.style.width = '100%';

    // Create the first section: Image
    const imageSection = document.createElement('div');
    const image = document.createElement('img');
    image.src = 'donut_image.png'; // Replace with your image path
    image.alt = 'Creative Image';
    image.style.width = '100%';
    image.style.height = '70%';
    image.style.objectFit = 'contain';
    imageSection.appendChild(image);
   

    // Create the second section: Image + Audio
    const audioSection = document.createElement('div');
    const audioImage = document.createElement('img');
    audioImage.src = 'song_thumbnail.png'; // Replace with your image path
    audioImage.alt = 'Image with Audio';
    audioImage.style.width = '100%';
    audioImage.style.height = '70%';
    audioImage.style.objectFit = 'cover';

    const audio = document.createElement('audio');
    audio.src = 'song.mp3'; // Replace with your audio file path
    audio.controls = true;
    audio.style.width = '100%';

    audioSection.appendChild(audioImage);
    audioSection.appendChild(audio);
  

    // Create the third section: Small  ball  Game
    const gameSection = document.createElement('div');
    gameSection.style.backgroundColor = 'black';
    gameSection.style.padding = '20px';
    gameSection.style.borderRadius = '10px';

    // Creating the horizontal image
    const gameImage = document.createElement('img');
    gameImage.src = 'Game_Image.png'; // Replace with your horizontal image path
    gameImage.alt = '404 Error Image';
    gameImage.style.width = '100%';  // Image width is more than its height
    gameImage.style.height = '70%';
    image.style.objectFit = 'cover';
    
    // Game title
    const gameTitle = document.createElement('h3');
    gameTitle.innerText = 'Let us play a Game AJ . Try avoiding obstacles!';
    
    // Start button for the game
    const gameButton = document.createElement('button');
    gameButton.innerText = 'Start Game';
    
    // Apply bubble-style button with CSS
    gameButton.style.fontSize = '20px';
    gameButton.style.padding = '15px 30px';
    gameButton.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4, #ffd1ff)';
    gameButton.style.border = 'none';
    gameButton.style.borderRadius = '50px';
    gameButton.style.color = '#fff';
    gameButton.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
    gameButton.style.cursor = 'pointer';
    gameButton.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
    gameButton.style.transition = 'all 0.3s ease';


    // Creating the canvas for the game
    const canvas = document.createElement('canvas');
    canvas.id = 'gameCanvas';
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Ball object
    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 20,
        speed: 5,
    };
    
    // Array to hold obstacles
    let obstacles = [];
    let score = 0;
    let gameInterval;
    
    // Draw ball function
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }
    
    // Draw obstacles function
    function drawObstacles() {
        ctx.fillStyle = 'red';
        for (let i = 0; i < obstacles.length; i++) {
            ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        }
    }
    
    // Move obstacles
    function moveObstacles() {
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].x -= 5; // Move obstacles to the left
            if (obstacles[i].x + obstacles[i].width < 0) {
                obstacles.splice(i, 1); // Remove obstacles once they move off-screen
                score++;
            }
        }
    }
    
    // Generate obstacles
    function generateObstacles() {
        if (Math.random() < 0.02) {
            const height = Math.random() * 50 + 30;
            const width = 30;
            obstacles.push({
                x: canvas.width,
                y: Math.random() * (canvas.height - height),
                width: width,
                height: height,
            });
        }
    }
    
    // Check collision with obstacles
    function checkCollision() {
        for (let i = 0; i < obstacles.length; i++) {
            if (ball.x + ball.radius > obstacles[i].x &&
                ball.x - ball.radius < obstacles[i].x + obstacles[i].width &&
                ball.y + ball.radius > obstacles[i].y &&
                ball.y - ball.radius < obstacles[i].y + obstacles[i].height) {
                gameOver();
            }
        }
    }
    
    // End the game
    function gameOver() {
        clearInterval(gameInterval);
        alert('Game Over! Your score is ' + score);
        gameButton.style.display = 'block';
    }
    
    // Update the score display
    function updateScore() {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 20, 30);
    }
    
    // Mouse movement to move the ball
    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        ball.x = e.clientX - rect.left;
        ball.y = e.clientY - rect.top;
    });
    
    // Start the game
    function startGame() {
        gameButton.style.display = 'none';
        score = 0;
        obstacles = [];
        gameInterval = setInterval(gameLoop, 20);
    }
    
    // Game loop
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        moveObstacles();
        drawObstacles();
        checkCollision();
        generateObstacles();
        updateScore();
    }
    
    // Append elements to the game section
    gameSection.appendChild(gameImage);
    gameSection.appendChild(gameTitle);
    gameSection.appendChild(gameButton);
    gameSection.appendChild(canvas);
    
    // Adding event listener to the start button
    gameButton.addEventListener('click', startGame);
    
    // Add the game section to the body or any other section of your webpage
    document.body.appendChild(gameSection);
    

    // Create the fourth section: Text + Video
    const creativeSection = document.createElement('div');
    const displayImage = document.createElement('img');
    displayImage.src = 'final_image.png';  // Replace with your image path
    displayImage.alt = 'Let us go to Georgia';
    displayImage.style.width = '100%';
    displayImage.style.height = '70%';
    displayImage.style.objectFit = 'cover';

creativeSection.appendChild(displayImage);

    // Append all sections to the main container
    mainContainer.appendChild(imageSection);
    mainContainer.appendChild(audioSection);
    mainContainer.appendChild(gameSection);
    mainContainer.appendChild(creativeSection);

    // Replace the main image with the new layout
    mainImage.replaceWith(mainContainer);

    // Hide the buttons
    buttonContainer.style.display = 'none';
});
