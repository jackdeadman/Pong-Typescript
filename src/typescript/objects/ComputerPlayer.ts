/// <reference path='./Player.ts' />
/// <reference path='../lib/Direction.ts' />

namespace Pong {
  export class ComputerPlayer extends Player {

    update(ctx: CanvasRenderingContext2D) {
      super.update(ctx);

      // Just follow the direction of the ball
      if (this.ball.y < this.y) {
        this.direction = Direction.UP;
      } else {
        this.direction = Direction.DOWN;
      }

      // If the ball is going away from the player
      // (Assuming the AI is on the right). Maybe improve?
      if (this.ball.dx <= 0) {
        console.log('dx', this.ball.dx);
        console.log('y', this.y, this.startY);
        // Return to starting position
        if (this.y < this.startY) {
          this.direction = Direction.DOWN;
        } else if (this.y < this.startY) {
          this.direction = Direction.UP;
        }
      }

      console.log('Dir', this.direction.toString());
    }
  }
}