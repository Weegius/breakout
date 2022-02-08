/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x, y, width, height, speed, color) {
    super(x, y, width, height, color);
    this.speed = speed;
    this.color = color;
  }
}

export default Paddle;

// function drawPaddle() {
//   ctx.beginPath();
//   ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//   ctx.fillStyle = '#0095DD'; // * Could be good as a constant
//   ctx.fill();
//   ctx.closePath();
// }
