export default class Government {
    constructor(){
        this.type = "Monarchia";
        this.laws = [];
        this.age = "Alto Medioevo";

        this.governments = {
            Monarchia:{ army:1.1, economy:1 },
            Repubblica:{ army:1, economy:1.2 },
            Impero:{ army:1.3, economy:0.9 },
            Teocrazia:{ army:0.9, economy:1.3 }
        };

        this.ages = [
            "Alto Medioevo",
            "Basso Medioevo",
            "Rinascimento",
            "Età Moderna"
        ];
    }

    enactLaw(law){
        this.laws.push(law);
    }

    getBonuses(){
        let g = this.governments[this.type];
        let bonus = { army:g.army, economy:g.economy };
        for(let l of this.laws){
            bonus.army *= l.army || 1;
            bonus.economy *= l.economy || 1;
        }
        return bonus;
    }

    advanceAge(){
        let i = this.ages.indexOf(this.age);
        if(i < this.ages.length-1) this.age = this.ages[i+1];
    }
}
