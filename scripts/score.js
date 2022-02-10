// import Sprite from "./sprite.js";

class Score {
  constructor(x = 0, y = 0, color = '#f00', score = '0') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.score = score;
  }

  // update(points) {

  // }

  render(ctx) { // Overrides the existing render method!
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Score;

// function drawScore() {
//   ctx.font = '16px Arial'; // * Could be good as a constant
//   ctx.fillStyle = '#0095DD'; // * Could be good as a constant
//   ctx.fillText(`Score: ${score}`, 8, 20);
// }
