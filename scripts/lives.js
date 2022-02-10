class Lives {
  constructor(canvasWidth, color = 'black', font = '16px Arial') {
    this.canvasWidth = canvasWidth;
    this.color = color;
    this.font = font;

    this.lives = 3;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.canvasWidth - 65, 20);
  }
}
export default Lives;
