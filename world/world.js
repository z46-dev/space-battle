function loadSave(id) {}

function writeSave(id, data) {}

const config = await import("./planets.json", {
    type: "json"
});

class Planet {
    static id = 0;
    static planets = new Map();

    constructor() {
        this.id = Planet.id ++;
        this.name = "";

        this.income = 0;

        Planet.planets.set(this.id, this);
    }
}

class Faction {
    constructor() {
        this.name = "";
        this.id = 0;

        this.money = 0;

        /**
         * @type {Map<number, Planet>}
         */
        this.planets = new Map();
    }

    get income() {
        let income = 0;

        this.planets.forEach(planet => {
            income += planet.income;
        });

        return income;
    }
}