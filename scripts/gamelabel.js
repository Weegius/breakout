class GameLabel {
  constructor(canvasWidth, color = 'black', font = '16px Helvetica') {
    this.canvasWidth = canvasWidth;
    this.color = color,
    this.font = font;

    this.lives = 2;
    this.score = 0;
  }

  render(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.canvasWidth - 65, 20);
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }
}
export default GameLabel;
