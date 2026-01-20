import Unit from './unit.js';

export default class Villager extends Unit{
    constructor(x,y){
        super(x,y);
        this.role="worker";
    }

    update(dt,map,res){
        res.food += 0.02*dt;
        res.wood += 0.01*dt;
    }

    draw(ctx,t){
        ctx.fillStyle="green";
        ctx.fillRect(this.x*t,this.y*t,t,t);
    }
}
