export default class City{
    constructor(x,y,name,game){
        this.x=x; this.y=y; this.name=name;
        this.population=100;
        this.game=game;
    }

    update(dt){
        this.population += dt*0.5;
        this.game.resources.food -= dt*0.2;
    }

    draw(ctx,t){
        ctx.fillStyle="brown";
        ctx.fillRect(this.x*t,this.y*t,t*2,t*2);
    }
}
