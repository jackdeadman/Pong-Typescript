/// <reference path='./Ball.ts' />
/// <reference path='./Player.ts' />
/// <reference path='../lib/Utils.ts' />
/// <reference path='../lib/Direction.ts' />

namespace Pong {
  export class HumanPlayer extends Player {

    private handleKeydown = evt => {
      switch (evt.keyCode) {
        case Utils.KeyCode.UP_ARROW:
          this.direction = Direction.UP;
          break;
        case Utils.KeyCode.DOWN_ARROW:
          this.direction = Direction.DOWN;
          break;
        default:
          this.direction = null;
      }
    };

    private handleKeyup = _ => {
      this.direction = null;
    };

    bind() {
      window.addEventListener('keydown', this.handleKeydown);
      window.addEventListener('keyup', this.handleKeyup);
    }

    unbind() {
      window.removeEventListener('keydown', this.handleKeydown);
      window.removeEventListener('keyup', this.handleKeyup);
    }
  }
}