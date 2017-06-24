/// <reference path='../lib/Scene.ts' />
/// <reference path='./EndScene.ts' />

/// <reference path='../objects/Player.ts' />
/// <reference path='../objects/Ball.ts' />
/// <reference path='../objects/HumanPlayer.ts' />
/// <reference path='../objects/ComputerPlayer.ts' />

namespace Pong {
  export class MainScene extends Scene {

    private playerPadding = Constants.Game.PLAYER_PADDING;
    private ball: Ball;
    private player1: HumanPlayer;
    private player2: Player;
    private winningScore = Constants.Game.WINNING_SCORE;
    
    private objectsInScene: Array<GraphicalElement> = [];

    constructor(ctx: CanvasRenderingContext2D) {
      super(ctx);
      let {width, height} = ctx.canvas;
      let centerH = width / 2;
      let centerV = height / 2;

      // Position objects
      this.ball = new Ball(centerH, centerV);
      this.player1 = new HumanPlayer(this.playerPadding,
                            centerV, this.ball);

      let player2Offset = ctx.canvas.width
                            - (this.playerPadding + this.player1.paddleWidth)
      this.player2 = new ComputerPlayer(player2Offset, centerV, this.ball);

      this.objectsInScene.push(this.player1);
      this.objectsInScene.push(this.player2);
      this.objectsInScene.push(this.ball);
    }

    private drawBackground(ctx: CanvasRenderingContext2D) {

      // Useful variables
      let {width, height} = ctx.canvas;
      let middle = ctx.canvas.width / 2;

      // Draw background
      ctx.fillStyle = Constants.Colours.GAME_BACKGROUND;
      ctx.fillRect(0, 0, width, height)

      // Draw pitch
      ctx.beginPath();
      ctx.strokeStyle = Constants.Colours.PITCH_COLOUR;
      ctx.setLineDash([5, 15]);
      ctx.moveTo(middle, 0);
      ctx.lineTo(middle, ctx.canvas.height);
      ctx.stroke();
      ctx.closePath();
    }

    private drawScores(ctx: CanvasRenderingContext2D) {
      // Useful variables
      let {width, height} = ctx.canvas;

      ctx.font = `${Constants.Text.SCORE_SIZE} ${Constants.Text.SCORE_FONT}`;
      ctx.fillStyle = Constants.Colours.SCORE_COLOUR;
      ctx.fillText(this.player1.getScore().toString(), width / 4, height / 2);
      ctx.fillText(this.player2.getScore().toString(), 3 * (width / 4), height / 2);
    }

    draw() {
      let ctx = this.ctx;
      this.drawBackground(ctx);
      this.drawScores(ctx);
      this.objectsInScene.forEach(object => object.draw(this.ctx));
    }

    load() {
      this.player1.bind();
    }

    unload() {
      this.player1.unbind();
    }

    update() {
      if (this.ball.isDistroyed()) {
        if (this.ball.x <= 0) {
          this.player2.givePoint();
        } else {
          this.player1.givePoint();
        }
        this.ball.restart();
      }

      if (this.player1.getScore() >= this.winningScore) {
        this.gameContext.loadScene(new EndScene(this.ctx), { winner: this.player1 });
      } else if (this.player2.getScore() >= this.winningScore) {
        this.gameContext.loadScene(new EndScene(this.ctx), { winner: this.player2 });
      } else {
        // Draw remaining objects
        this.objectsInScene.forEach(object => object.update(this.ctx));
      }
    }

    restart() {
      this.player1.resetScore();
      this.player2.resetScore();
      this.ball.restart();
    }

  }
}