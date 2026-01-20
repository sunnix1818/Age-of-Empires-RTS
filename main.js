const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function clearScreen() {
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
  const size = 64;
  ctx.strokeStyle = "#333";

  for (let x = 0; x < canvas.width; x += size) {
    for (let y = 0; y < canvas.height; y += size) {
      ctx.strokeRect(x, y, size, size);
    }
  }
}

function update() {
  for (const u of units) u.update();
}

function render() {
  clearScreen();
  drawGrid();

  for (const b of buildings) b.draw(ctx);
  for (const u of units) u.draw(ctx);
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

initGame();
gameLoop();
