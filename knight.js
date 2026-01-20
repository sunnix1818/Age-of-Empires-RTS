import Unit from './unit.js';
export default class Knight extends Unit{
    constructor(x,y){ super(x,y); this.hp=200; this.attack=20; }
    draw(ctx,t){ ctx.fillStyle="blue"; ctx.fillRect(this.x*t,this.y*t,t,t); }
}
