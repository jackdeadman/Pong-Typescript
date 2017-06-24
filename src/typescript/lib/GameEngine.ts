/// <reference path='../lib/Utils.ts' />

/// <reference path='../objects/Ball.ts' />
/// <reference path='../objects/ComputerPlayer.ts' />
/// <reference path='../objects/HumanPlayer.ts' />

/// <reference path='./Scene.ts' />
/// <reference path='../scenes/MenuScene.ts' />

namespace Pong {

  export class GameEngine {

    private scene: Scene;

    constructor(private ctx: CanvasRenderingContext2D) {
      let menu = new MenuScene(ctx);
      this.loadScene(menu);
    }

    draw() {
      // Clear ready for next render
      Utils.clearScreen(this.ctx);
      this.scene.draw();
    }

    update() {
      this.scene.update();
    }

    loadScene(newScene: Scene, params?: object) {
      // If a scene has been loaded already, unload it
      if (this.scene) {
        this.scene.unload();
      }
      this.scene = newScene;
      this.scene.setGameContext(this);

      if (params === undefined) {
        params = {};
      }

      this.scene.load(params);
    }
  }

}