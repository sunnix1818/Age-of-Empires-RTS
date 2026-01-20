export default class TechTree {
    constructor(){
        this.techs = {
            agriculture:{ unlocked:false, cost:{food:200}, bonus:{economy:1.2} },
            metallurgy:{ unlocked:false, cost:{gold:300}, bonus:{army:1.2} },
            fortification:{ unlocked:false, cost:{stone:400}, bonus:{defense:1.3} }
        };
    }

    research(name, resources){
        let t = this.techs[name];
        if(!t || t.unlocked) return false;
        for(let r in t.cost){
            if(resources[r] < t.cost[r]) return false;
        }
        for(let r in t.cost) resources[r] -= t.cost[r];
        t.unlocked = true;
        return true;
    }

    update(){}
}
