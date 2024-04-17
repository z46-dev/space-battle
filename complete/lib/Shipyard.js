export default class Shipyard {
    constructor(planet, level) {
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
            time: cost / 100
        })
    }

    tick() {
        if (this.queue.length === 0) {
            return;
        }

        this.queue[0].time --;

        if (this.queue[0].time < 0) {
            console.log(this.queue[0].name, "built by", this.planet.controllingFaction.name);
            this.queue.shift();
        }
    }
}