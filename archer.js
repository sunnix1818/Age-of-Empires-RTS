import Unit from './unit.js';
export default class Archer extends Unit{
    constructor(x,y){ super(x,y); this.range=5; }
    draw(ctx,t){ ctx.fillStyle="orange"; ctx.fillRect(this.x*t,this.y*t,t,t); }
}
