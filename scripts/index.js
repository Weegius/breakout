/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* ***************************************************************

***************************************************************** */
import Ball from './Ball.js';
import Bricks from './bricks.js';
// **************************************************************
// DOM references
// **************************************************************

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// **************************************************************
// Variables
// **************************************************************

// --------------------------------------------------------------
// Constants
// --------------------------------------------------------------

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;

const ball = new Ball();
const bricks = new Bricks();

// --------------------------------------------------------------
// Variables
// --------------------------------------------------------------

// * This calculation could be better as a value
let paddleX = (canvas.width - paddleWidth) / 2;

let score = 0;
let lives = 3;

let rightPressed = false;
let leftPressed = false;

// --------------------------------------------------------------
// Setup Bricks Array
// --------------------------------------------------------------

// **************************************************************
// Functions
// **************************************************************

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD'; // * Could be good as a constant
  ctx.fill();
  ctx.closePath();
}

const collisionDetection = () => {
  for (let c = 0; c < bricks.cols; c += 1) {
    for (let r = 0; r < bricks.rows; r += 1) {
      const b = bricks.getBrick(c, r);
      if (b.status === 1) {
        if (
          ball.x > b.x
          && ball.x < b.x + b.width
          && ball.y > b.y
          && ball.y < b.y + b.height
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score += 1;
          if (score === b.rows * b.cols) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN, CONGRATULATIONS!'); // * Could be good as a constant
            document.location.reload();
          }
        }
      }
    }
  }
};

const ballmovement = () => {
  // Bounce the ball off the top, paddle, or hit the bottom of the canvas
  if (ball.y + ball.dy < ballRadius) {
    // hit the top
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    // hit the bottom
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      // Hit the paddle
      ball.dy = -ball.dy;
    } else {
      // Lose a life
      lives -= 1;
      if (!lives) {
        // Game Over
        // eslint-disable-next-line no-alert
        alert('GAME OVER'); // * Could be good as a constant
        ball.x = 200;
        ball.y = 200;
        document.location.reload();
      } else {
        // Start the over you hit the bottom
        // ** Set the position of ball and paddle
        // ** And set the speed and direction of the ball
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
};

function drawScore() {
  ctx.font = '16px Arial'; // * Could be good as a constant
  ctx.fillStyle = '#0095DD'; // * Could be good as a constant
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial'; // * Could be good as a constant
  ctx.fillStyle = '#0095DD'; // * Could be good as a constant
  // * canvas.width might be better as a constants
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

// --------------------------------------------------------------
// Game Loop
// --------------------------------------------------------------

function draw() {
  // Clear the canvas
  // * canvas.width, and canvas.height might be better as constants
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Call helper functions
  bricks.render(ctx);
  ball.render(ctx);
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  ballmovement();

  // Bounce the ball off the left and right of the canvas
  if (
    ball.x + ball.dx > canvas.width - ballRadius
    || ball.x + ball.dx < ballRadius
  ) {
    ball.dx = -ball.dx;
  }

  // Move Ball
  // *** Better as a separate function
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Check for arrow keys
  // *** Better as a function
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  // Draw the screen again
  requestAnimationFrame(draw);
}

// --------------------------------------------------------------
// Event Listeners
// --------------------------------------------------------------

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// **************************************************************
// Register Events
// **************************************************************

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// **************************************************************
// Starts program entry point
// **************************************************************

draw();
