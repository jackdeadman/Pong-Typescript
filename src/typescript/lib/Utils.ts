namespace Utils {

  export function clearScreen(ctx: CanvasRenderingContext2D) {
    let {width, height} = ctx.canvas;
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.closePath();
  }

  export function between(x: number, low: number, high: number) {
    return x >= low && x <= high;
  }

  export let KeyCode = {
    ENTER: 13,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
  };
}