import Unit from './unit.js';

export default class Hero extends Unit{
    constructor(x,y,name,bonus){
        super(x,y);
        this.name=name;
        this.age=30;
        this.title="Re";
        this.bonus=bonus;
    }

    update(dt){
        this.age += dt*0.01;
    }

    draw(ctx,t){
        ctx.fillStyle="gold";
        ctx.fillRect(this.x*t,this.y*t,t,t);
    }
}
