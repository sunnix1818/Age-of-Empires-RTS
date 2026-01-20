class Unit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.color = "white";
  }

  update() {}

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
