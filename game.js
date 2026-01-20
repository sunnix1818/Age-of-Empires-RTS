import MapGenerator from './mapGenerator.js';
import Campaign from './campaign.js';
import Government from './government.js';
import AI from './ai.js';
import AudioManager from './audioManager.js';
import Particles from './particles.js';
import TechTree from './techTree.js';
import Villager from '../entities/villager.js';
import Soldier from '../entities/soldier.js';
import Archer from '../entities/archer.js';
import Knight from '../entities/knight.js';
import Hero from '../entities/hero.js';
import Building from '../entities/building.js';
import City from '../entities/city.js';
import Diplomacy from './diplomacy.js';

export default class Game {
    constructor(W,H,TILE){
        this.W=W; this.H=H; this.TILE=TILE;
        this.canvas=document.getElementById('worldCanvas');
        this.ctx=this.canvas.getContext('2d');
        this.hud=document.getElementById('hud');
        this.minimap=document.getElementById('minimap');
        this.camera={x:0,y:0,scale:1.5};

        // Risorse globali
        this.resources={food:2000,wood:1500,gold:1000,stone:800};
        this.animals=[]; this.civilians=[]; this.units=[]; this.villagers=[]; this.heroes=[]; this.buildings=[]; this.cities=[];

        // Sistemi di gioco
        this.mapGen=new MapGenerator(W,H);
        this.campaign=new Campaign(this);
        this.government=new Government();
        this.ai=new AI(this);
        this.audio=new AudioManager();
        this.particles=new Particles(this.ctx);
        this.techTree=new TechTree();
        this.diplomacy=new Diplomacy(this);

        this.selectedUnits=[];
        this.lastTime=0;
        this.init();
    }

    init(){
        this.map=this.mapGen.generate();
        // spawn villager demo
        for(let i=0;i<10;i++) this.villagers.push(new Villager(5+i,5+i));
        for(let i=0;i<5;i++) this.units.push(new Soldier(10+i,10));
        for(let i=0;i<3;i++) this.units.push(new Archer(12+i,12));
        for(let i=0;i<2;i++) this.units.push(new Knight(14+i,14));
        this.heroes.push(new Hero(20,20,'Eroe Demo',{army:1.2,resource:1.1}));

        // spawn città
        this.cities.push(new City(25,25,'Capitale',this));

        this.bindEvents();
        requestAnimationFrame(t=>this.loop(t));
    }

    bindEvents(){
        window.addEventListener('keydown',e=>{
            const step=10/this.camera.scale;
            if(e.key==='w') this.camera.y-=step;
            if(e.key==='s') this.camera.y+=step;
            if(e.key==='a') this.camera.x-=step;
            if(e.key==='d') this.camera.x+=step;
        });

        this.canvas.addEventListener('mousedown',e=>{
            const rect=this.canvas.getBoundingClientRect();
            const x=(e.clientX-rect.left)/this.TILE;
            const y=(e.clientY-rect.top)/this.TILE;
            this.selectedUnits=[];
            for(let u of this.units) if(Math.abs(u.x-x)<1 && Math.abs(u.y-y)<1) this.selectedUnits.push(u);
        });
    }

    update(dt){
        for(let v of this.villagers) v.update(dt,this.map,this.resources,this.buildings);
        for(let u of this.units) u.update(dt,this.map,this.resources,this.buildings);
        for(let h of this.heroes) h.update(dt,this.map,this.resources,this.buildings);
        for(let c of this.cities) c.update(dt,this);
        this.ai.update(dt);
        this.diplomacy.update(dt);
        this.techTree.update(dt);
        this.particles.update(dt);
        this.updateEconomy(dt);
    }

    updateEconomy(dt){
        const growth=0.01;
        this.resources.food += (this.villagers.length * growth) * dt;
        this.resources.wood += (this.villagers.length * 0.8 * growth) * dt;
        this.resources.gold += (this.villagers.length * 0.5 * growth) * dt;
        this.resources.stone += (this.villagers.length * 0.3 * growth) * dt;
    }

    drawTile(x,y,type){
        const ctx=this.ctx, t=this.TILE;
        let color='green';
        if(type==='forest') color='darkgreen';
        else if(type==='water') color='blue';
        else if(type==='mountain') color='grey';
        else if(type==='city') color='orange';
        ctx.fillStyle=color;
        ctx.fillRect(x*t,y*t,t,t);
    }

    render(){
        this.canvas.width=window.innerWidth;
        this.canvas.height=window.innerHeight;
        const ctx=this.ctx;
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        for(let y=0;y<this.H;y++)
            for(let x=0;x<this.W;x++)
                this.drawTile(x,y,this.map[y][x]);

        for(let b of this.buildings) b.draw(ctx,this.TILE);
        for(let v of this.villagers) v.draw(ctx,this.TILE);
        for(let u of this.units) u.draw(ctx,this.TILE);
        for(let h of this.heroes) h.draw(ctx,this.TILE);
        for(let c of this.cities) c.draw(ctx,this.TILE);

        this.particles.draw(ctx);
    }

    loop(time){
        const dt=(time-this.lastTime)/1000;
        this.lastTime=time;
        this.update(dt);
        this.render();
        requestAnimationFrame(t=>this.loop(t));
    }
}
