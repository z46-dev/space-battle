import ships from "../server/lib/ships.js";
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

    get queueTime() {
        return this.queue.reduce((acc, item) => acc + item.time - item.complete, 0);
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

            // console.log(item.name, "built by", this.planet.controllingFaction.name);

            // let fleet = this.planet.fleets.find(f => f.faction === this.planet.controllingFaction);
            // if (!fleet) {
            //     fleet = new Fleet();
            //     fleet.faction = this.planet.controllingFaction;
            //     fleet.planet = this.planet;
            //     this.planet.fleets.push(fleet);
            // }

            // fleet.add(item.name);

            const eligibleFleets = this.planet.fleets.filter(f => {
                if (f.faction !== this.planet.controllingFaction) {
                    return false;
                }

                if (f.population + ships[item.name].population > 300) {
                    return false;
                }

                return true;
            });

            if (eligibleFleets.length > 0) {
                eligibleFleets[0].add(item.name);
            } else {
                const fleet = new Fleet();
                fleet.faction = this.planet.controllingFaction;
                fleet.planet = this.planet;
                fleet.add(item.name);
                this.planet.fleets.push(fleet);
            }
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