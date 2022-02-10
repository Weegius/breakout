/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Ball from './Ball.js';
import Bricks from './bricks.js';
import Paddle from './paddle.js';
import Score from './score.js';
import Lives from './lives.js';

// Imports --------------------------------------------

// const { default: Ball } = require("./ball.js");

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 10;
const paddleWidth = 75;

let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const ball = new Ball();
const bricks = new Bricks();
const lives = new Lives();
const score = new Score();
const paddle = new Paddle();

// **************************************************************
// Functions
// **************************************************************
function moveBall(ball, lives) {
  if (
    ball.x + ball.dx > canvas.width - ball.radius ||
    ball.x + ball.dx < ball.radius
  ) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (lives < 0) {
        // eslint-disable-next-line no-alert
        alert("Game Over! Better luck next time!");
        document.location.reload();
        // eslint-disable-next-line no-use-before-define
        requestAnimationFrame(draw());
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
}

// function collisions(bricks, ball, score) {
//   for (let c = 0; c < bricks.cols; c += 1) {
//     for (let r = 0; r < bricks.rows; r += 1) {
//       if (bricks.bricks[c][r].status == 1) {
//         if (
//           ball.x > bricks.bricks[c][r].x &&
//           ball.x < bricks.bricks[c][r].x + bricks.bricks[c][r].width &&
//           ball.y > bricks.bricks[c][r].y &&
//           ball.y < bricks.bricks[c][r].y + bricks.bricks[c][r].height
//         ) {
//           ball.dy = -ball.dy;
//           bricks.bricks[c][r].status = 0;
//           score += 1;
//         }
//       }
//     }
//   }
//   if (score === bricks.rows * bricks.cols) {
//     // gameLabel.render(ctx);
//     // eslint-disable-next-line no-alert
//     alert("You Win!");
//     score = 0;
//     document.location.reload();
//     // eslint-disable-next-line no-use-before-define
//     // requestAnimationFrame(draw()); // Needed for Chrome to end game
//   }
// }
// collisions(ball, bricks, score) {
//   for (let c = 0; c < bricks.columnCount; c += 1) {
//     for (let r = 0; r < bricks.rowCount; r += 1) {
//       const brick = bricks[c][r];
//       if (brick.status === 1) {
//         if (ball.x > brick.x && ball.x < brick.x + bricks.width
//           && ball.y > brick.y && ball.y < brick.y + bricks.height) {
//           ball.dy = -ball.dy;
//           brick.status = 0;
//           score.points += 1;
//           if (score.points === bricks.rowCount * bricks.columnCount) {
//             alert("YOU WIN, CONGRATS!");
//             document.location.reload();
//           }
//         }
//       }
//     }
//   }
// }

// --------------------------------------------------------------
// Game Loop
// --------------------------------------------------------------

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bricks.render(ctx);
  ball.render(ctx);
  paddle.render(ctx);
  lives.render(ctx);
  // score.render(ctx);

  moveBall(ball, lives);
  // collisions(bricks, ball, score);

  if (rightPressed) {
    paddle.x += 7;
  } else if (leftPressed) {
    paddle.x -= 7;
  }
  ball.x += ball.dx;
  ball.y += ball.dy;
  // console.log(ball);
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
