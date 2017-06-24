/// <reference path='../objects/HumanPlayer.ts' />
/// <reference path='./GameEngine.ts' />

namespace Pong {

  export abstract class Scene {

    constructor(protected ctx: CanvasRenderingContext2D) {}

    protected gameContext: GameEngine;

    // Must be implemented
    abstract draw(): void;
    abstract update(): void;

    // Optionally implement
    // Can optionally be given parameters
    load(params: object): void {}
    unload(): void {}

    setGameContext(game: GameEngine) {
      this.gameContext = game;
    }

  }

}