/// <reference path='./Ball.ts' />

namespace Pong {
  export class Player implements GraphicalElement {

    protected direction: Direction = null;
    protected speed = Constants.Game.PADDLE_SPEED;
    protected colour = Constants.Colours.PADDLE_COLOUR;
    protected score = 0;

    protected startX: number;
    protected startY: number;

    public paddleWidth = Constants.Game.PADDLE_WIDTH;
    public paddleHeight = Constants.Game.PADDLE_HEIGHT;
    public name = 'Unknown Player';

    constructor(public x: number, public y: number, public ball: Ball) {
      this.startX = x;
      this.startY = y;
    }

    getScore() {
      return this.score;
    }

    givePoint() {
      this.score += 1;
    }

    resetScore() {
      this.score = 0;
    }

    update(ctx: CanvasRenderingContext2D) {

      if (this.direction !== null) {
        switch (this.direction) {
          case Direction.UP:
            this.y -= this.speed;
            break;
          case Direction.DOWN:
            this.y += this.speed;
        }
      }

      let maxY = ctx.canvas.height - this.paddleHeight;
      if (this.y < 0) {
        this.y = 0;
      } else if (this.y > maxY) {
        this.y = maxY;
      }

      if (Utils.between(this.ball.y, this.y, this.y + this.paddleHeight)
          && Utils.between(this.ball.x, this.x, this.x + this.paddleWidth)) {
        this.ball.hit();
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, this.paddleWidth, this.paddleHeight);
    }
  }
}
