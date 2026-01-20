import Unit from './unit.js';
export default class Soldier extends Unit{
    constructor(x,y){ super(x,y); this.attack=10; }
    draw(ctx,t){ ctx.fillStyle="red"; ctx.fillRect(this.x*t,this.y*t,t,t); }
}
