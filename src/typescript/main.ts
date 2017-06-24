const FPS = 60;

// Create the game
document.addEventListener('DOMContentLoaded', () => {
  let canvas = <HTMLCanvasElement> document.getElementById('game-canvas');
  let ctx = canvas.getContext('2d');

  let game = new Pong.GameEngine(ctx);

  // TODO: Seperate draw and game loops
  setInterval(() => {
    game.update();
    game.draw();
  }, 1000/FPS);

  canvas.addEventListener('click', () => {
    // game.restart();
  });

});