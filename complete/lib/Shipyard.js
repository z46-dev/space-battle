import Fleet from "./Fleet.js";

export default class Shipyard {
    constructor(planet, level) {
        /** @type {import("./Planet.js").default} */
        
        this.planet = planet;
        this.level = level;
        this.queue = [];

        // Name -> Cost
        this.buildables = new Map();
    }

    build(buildableName) {
        const faction = this.planet.controllingFaction;
        const cost = this.buildables.get(buildableName);

        if (faction == null || cost == null || faction.money < cost) {
            return;
        }

        faction.money -= cost;

        this.queue.push({
            name: buildableName,
            time: cost,
            complete: 0
        })
    }

    tick() {
        if (this.queue.length === 0) {
            return;
        }

        this.queue[0].complete ++;

        if (this.queue[0].complete >= this.queue[0].time) {
            const item = this.queue.shift();

            console.log(item.name, "built by", this.planet.controllingFaction.name);

            let fleet = this.planet.fleets.find(f => f.faction === this.planet.controllingFaction);
            if (!fleet) {
                fleet = new Fleet();
                fleet.faction = this.planet.controllingFaction;
                fleet.planet = this.planet;
                this.planet.fleets.push(fleet);
            }

            fleet.add(item.name);
        }
    }

    save() {
        return {
            planetID: this.planet.id,
            level: this.level,
            queue: this.queue.map(item => ({
                name: item.name,
                time: item.time,
                complete: item.complete
            }))
        };
    }
}