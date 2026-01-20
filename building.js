export default class Building{
    constructor(x,y,type){
        this.x=x; this.y=y; this.type=type;
        this.hp=500;
    }

    update(game){
        if(this.type==="farm") game.resources.food += 0.1;
        if(this.type==="mine") game.resources.gold += 0.05;
    }

    draw(ctx,t){
        ctx.fillStyle="gray";
        ctx.fillRect(this.x*t,this.y*t,t,t);
    }
}
