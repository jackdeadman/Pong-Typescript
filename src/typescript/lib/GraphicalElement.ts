interface GraphicalElement {
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: (ctx?: CanvasRenderingContext2D) => void;
  x: number;
  y: number;
}
