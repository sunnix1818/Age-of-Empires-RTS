export default class AI {
    constructor(game){
        this.game = game;
        this.timer = 0;
        this.difficulty = 1;
    }

    update(dt){
        this.timer += dt;
        if(this.timer > 5){
            this.timer = 0;
            this.makeDecision();
        }
    }

    makeDecision(){
        if(this.game.resources.food > 500){
            this.trainSoldier();
        }
        if(Math.random() < 0.3){
            this.expandCity();
        }
    }

    trainSoldier(){
        this.game.units.push({
            x: 30 + Math.random()*5,
            y: 30 + Math.random()*5,
            update(){},
            draw(ctx,t){ ctx.fillStyle="purple"; ctx.fillRect(this.x*t,this.y*t,t,t); }
        });
    }

    expandCity(){
        // placeholder espansione IA
    }
}
