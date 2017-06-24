/// <reference path='../lib/GraphicalElement.ts' />
/// <reference path='../Constants.ts' />

namespace Pong {

  export class Ball implements GraphicalElement {

    private speed = 2;
    private size = 8;
    private destroyed = false;

    private startX: number;
    private startY: number;

    private colour = Constants.Colours.BALL_COLOUR;

    public dx = 0;
    public dy = 0;

    constructor(public x=0, public y=0) {
      this.startX = x;
      this.startY = y;

      this.start();
    }

    isDistroyed() {
      return this.destroyed;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.destroyed) {
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.colour;
        ctx.fill();
      }
    }

    update(ctx: CanvasRenderingContext2D) {
      let maxX = ctx.canvas.width;
      let maxY = ctx.canvas.height;
      this.x += this.dx * this.speed;
      this.y += this.dy * this.speed;

      if (this.x >= maxX || this.x <= 0) {
        this.destroyed = true;
        this.dx = 0;
        this.dy = 0;
      }

      if (this.y >= maxY || this.y <= 0) {
        this.dy = -this.dy
      }
    }

    start() {
      this.x = this.startX;
      this.y = this.startY;

      setTimeout(() => {
        this.dx = 3;
        this.dy = 2;

        // 5050 chance of direction
        if (Math.random() > 0.5) {
          this.dx = -this.dx;
        }
      }, 2000)
    }

    restart() {
      this.destroyed = false;
      this.dx = 0;
      this.dy = 0;
      this.start();
    }

    hit() {
      this.dx = -this.dx;
    }

  }
}