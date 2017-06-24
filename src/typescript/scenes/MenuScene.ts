/// <reference path='../lib/Scene.ts' />
/// <reference path='./MainScene.ts' />
/// <reference path='../Constants.ts' />

namespace Pong {

  export class MenuScene extends Scene {

    // Bounds 'this' to the class
    private handleClick = (evt: Event) => {
      this.gameContext.loadScene(new MainScene(this.ctx));
    }

    draw() {
      let ctx = this.ctx;
      let {width, height} = ctx.canvas;
      
      // Draw background
      ctx.fillStyle = Constants.Colours.MENU_BACKGROUND;
      ctx.fillRect(0, 0, width, height);

      // == Draw text
      // Draw title
      let title = Constants.Text.GAME_TITLE;
      ctx.font = `${Constants.Text.TITLE_SIZE} ${Constants.Text.TITLE_FONT}`;
      ctx.fillStyle = Constants.Colours.TITLE_COLOUR;
      ctx.textAlign = 'center';
      ctx.fillText(title, width / 2, height / 2);

      // Draw title
      let subtitle = Constants.Text.GAME_SUBTITLE;
      ctx.font = `${Constants.Text.SUBTITLE_SIZE} ${Constants.Text.SUBTITLE_FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText(subtitle, width / 2, (height / 2) + 60);
    }

    update() {
    }

    load() {
      this.ctx.canvas.addEventListener('click', this.handleClick);
    }

    unload() {
      this.ctx.canvas.removeEventListener('click', this.handleClick);
    }

  }

}