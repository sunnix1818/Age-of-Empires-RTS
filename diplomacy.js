export default class Diplomacy {
    constructor(game){
        this.game = game;
        this.factions = {
            player: { relations:{} },
            enemy: { relations:{} },
            neutral: { relations:{} }
        };

        this.factions.player.relations.enemy = -50;
        this.factions.player.relations.neutral = 0;
    }

    declareWar(a,b){
        this.factions[a].relations[b] = -100;
        this.factions[b].relations[a] = -100;
    }

    makePeace(a,b){
        this.factions[a].relations[b] = 0;
        this.factions[b].relations[a] = 0;
    }

    alliance(a,b){
        this.factions[a].relations[b] = 100;
        this.factions[b].relations[a] = 100;
    }

    update(dt){
        // decadimento relazioni
        for(const f in this.factions){
            for(const r in this.factions[f].relations){
                this.factions[f].relations[r] *= 0.999;
            }
        }
    }
}
