/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Ball from './Ball.js';
import Brick from './bricks.js';
import Paddle from './paddle.js';
import Score from './score.js';
import lives from './lives.js';
// import Sprite from "./sprite.js";
// **************************************************************
// DOM references
// **************************************************************

// const { default: Ball } = require("./ball.js");

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// **************************************************************
// Variables
// **************************************************************

// --------------------------------------------------------------
// Constants
// --------------------------------------------------------------

const ball = new Ball();

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// --------------------------------------------------------------
// Variables
// --------------------------------------------------------------

// ** Initialize the position of the ball and paddle
// ** and set the ball speed and direction
// **** A Ball Object would be good.

let x = canvas.width / 2;
let y = canvas.height - 30;
// * This calculation could be better as a value
let paddleX = (canvas.width - paddleWidth) / 2;
let dx = 2;
let dy = -2;

let score = 0;
let lives = 3;

let rightPressed = false;
let leftPressed = false;

// --------------------------------------------------------------
// Setup Bricks Array
// --------------------------------------------------------------

const bricks = [];

// *** This would be better in a function
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1,
    };
  }
}

// export default Ball;

// **************************************************************
// Functions
// **************************************************************

function moveBall(ball) {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // Bounce the ball off the top, paddle, or hit the bottom of the canvas
  if (y + dy < ballRadius) {
    // hit the top
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // hit the bottom
    if (x > paddleX && x < paddleX + paddleWidth) {
      // Hit the paddle
      dy = -dy;
    } else {
      // Lose a life
      lives -= 1;
      if (!lives) {
        // Game Over
        // eslint-disable-next-line no-alert
        alert('GAME OVER'); // * Could be good as a constant
        x = 200;
        y = 200;
        document.location.reload();
      } else {
        // Start the over you hit the bottom
        // ** Set the position of ball and paddle
        // ** And set the speed and direction of the ball
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
}
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN, CONGRATULATIONS!'); // * Could be good as a constant
            document.location.reload();
          }
        }
      }
    }
  }
}

// --------------------------------------------------------------
// Game Loop
// --------------------------------------------------------------

function draw() {
  // Clear the canvas
  // * canvas.width, and canvas.height might be better as constants
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Call helper functions
  ball.render(ctx);
  // ball.move();
  collisionDetection();
  moveBall(ball)

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
