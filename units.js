export default class Unit {
    constructor(x,y){
        this.x=x; this.y=y;
        this.hp=100;
        this.speed=1;
    }
    update(){}
    draw(ctx,t){
        ctx.fillStyle="white";
        ctx.fillRect(this.x*t,this.y*t,t,t);
    }
}
