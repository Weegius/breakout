/* eslint-disable import/extensions */
import Sprite from './sprite.js';

class Brick extends Sprite {
  constructor(x, y, width = 75, height = 20, color = '#0095DD') {
    super(x, y, width, height, color); // pass arguments to Sprite!
    this.status = true; // adds a new property
  }

  draw(ctx, color) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;

// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         // **** This block should really be part of the brick initialization
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;

//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         ctx.fillStyle = '#0095DD'; // * Could be good as a constant
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }
