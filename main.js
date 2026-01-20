import Game from './engine/game.js';

window.addEventListener('load',()=>{
    const game = new Game(100,100,32); // 100x100 tiles, 32px ciascuna
    window.game = game; // debug console
});
