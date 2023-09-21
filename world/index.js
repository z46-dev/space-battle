const config = (await import("./planets.json", {
    assert: {
        type: "json"
    }
})).default;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;

    canvas.lineJoin = canvas.lineCap = "round";
}

window.addEventListener("resize", resize);
resize();

const worker = new Worker("./world.js", {
    type: "module"
});

worker.onmessage = function onWorkerMessage(event) {
    const data = event.data;
    const factionCount = data.shift();
    const planetCount = data.shift();

    const factions = [];
    const planets = [];

    for (let i = 0; i < factionCount; i ++) {
        const faction = {
            id: data.shift(),
            money: data.shift(),
            income: data.shift(),
            controlledPlanets: []
        };

        const planetsSize = data.shift();

        for (let j = 0; j < planetsSize; j ++) {
            faction.controlledPlanets.push(data.shift());
        }

        factions.push(faction);
    }

    for (let i = 0; i < planetCount; i ++) {
        const planet = {
            id: data.shift(),
            income: data.shift()
        };

        planets.push(planet);
    }

    planets.forEach(newPlanet => {
        const planet = Planet.planets.get(newPlanet.id) ?? new Planet(newPlanet.id);
        planet.income = newPlanet.income;
    });

    factions.forEach(newFaction => {
        const faction = Faction.factions.get(newFaction.id) ?? new Faction(newFaction.id);
        faction.money = newFaction.money;
        faction.income = newFaction.income;

        faction.controlledPlanets.clear();

        newFaction.controlledPlanets.forEach(planetID => {
            const planet = Planet.get(planetID);

            planet.controllingFaction = faction;
            faction.controlledPlanets.set(planetID, planet);
        });
    });

    window.factions = factions;
    window.planets = planets;
}

class Planet {
    /**
     * @type {Map<number,Planet>}
     */
    static planets = new Map();

    static get(name) {
        
    }

    constructor(id) {
        this.id = id;
        this.name = config.planets[id].name;
        this.color = config.planets[id].color;
        this.income = 0;

        this._x = config.planets[id].x;
        this._y = config.planets[id].y;

        this.connectingPlanets = [];

        config.connections.forEach(connection => {
            if (connection[0] === this.name) {
                this.connectingPlanets.push(connection[1]);
            }

            if (connection[1] === this.name) {
                this.connectingPlanets.push(connection[0]);
            }
        });

        /**
         * @type {Faction}
         */
        this.controllingFaction = null;

        Planet.planets.set(this.id, this);
    }
}

class Faction {
    /**
     * @type {Map<number,Faction>}
     */
    static factions = new Map();

    constructor(id) {
        this.id = id;
        this.name = config.factions[id].name;
        this.color = config.factions[id].color;
        this.money = 0;
        this.income = 0;

        /**
         * @type {Map<number,Planet>}
         */
        this.controlledPlanets = new Map();

        Faction.factions.set(this.id, this);
    }
}

window.Faction = Faction;
window.Planet = Planet;