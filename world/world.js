import ships from "../server/lib/ships.js";

console.log("Hello from worker!");

function loadSave(id) {}

function writeSave(id, data) {}

class Global {
    static day = 0;
}

class Shipyard {
    constructor(planet, level) {
        /**
         * @type {Planet}
         */
        this.planet = planet;

        this.level = level;

        this.queue = [];

        // Name -> Cost
        this.buildables = new Map();
    }

    build(buildableName) {
        const faction = this.planet.controllingFaction;
        
        if (faction == null) {
            return;
        }

        const cost = this.buildables.get(buildableName);

        if (cost == null) {
            return;
        }

        if (faction.money < cost) {
            return;
        }

        faction.money -= cost;

        this.queue.push({
            name: buildableName,
            day: Global.day + 2
        });
    }

    tick() {
        if (this.queue.length === 0) {
            return;
        }

        const item = this.queue.shift();

        if (Global.day >= item.day) {
            console.log(this.planet.controllingFaction?.name, "has built a(n)", item.name);
            return;
        }

        this.queue.unshift(item);
    }
}

class Planet {
    static id = 0;

    /**
     * @type {Map<number, Planet>}
     */
    static planets = new Map();

    static get(name) {
        let planet = null;

        Planet.planets.forEach(p => {
            if (p.name === name) {
                planet = p;
            }
        });

        return planet;
    }

    constructor() {
        this.id = Planet.id ++;
        this.name = "";

        this.income = 0;

        this.x = 0;
        this.y = 0;

        /**
         * @type {Map<number, Fleet>}
         */
        this.fleets = new Map();

        this.connectingPlanets = [];

        /**
         * @type {Faction}
         */
        this.controllingFaction = null;

        /**
         * @type {Shipyard}
         */
        this.shipyard = null;

        Planet.planets.set(this.id, this);
    }

    // Function to find all possible paths between this planet and another planet
    findAllPaths(otherPlanet) {
        const paths = [];
        const visited = new Set();
        const controlledFaction = this.controlledFaction;

        function findPaths(currentPlanet, path, distance) {
            visited.add(currentPlanet.id);
            path.push(currentPlanet.id);

            if (currentPlanet.id === otherPlanet.id) {
                paths.push({ path: [...path], distance });
            } else {
                for (const neighborId of currentPlanet.connectingPlanets) {
                    const neighbor = Planet.get(neighborId);

                    // Check if the neighbor planet is in the controlled faction or it's the final planet
                    if (
                        (neighbor.controlledFaction === controlledFaction || neighbor.id === otherPlanet.id) &&
                        !visited.has(neighborId) &&
                        !path.includes(neighborId)
                    ) {
                        const neighborDistance = Math.sqrt(
                            Math.pow(neighbor.x - currentPlanet.x, 2) +
                            Math.pow(neighbor.y - currentPlanet.y, 2)
                        );
                        findPaths(neighbor, path, distance + neighborDistance);
                    }
                }
            }

            path.pop();
            visited.delete(currentPlanet.id);
        }

        const initialDistance = 0; // Initial distance is 0
        findPaths(this, [], initialDistance);

        return paths;
    }

    // Function to find the shortest distance path
    findShortestPathTo(otherPlanet) {
        const allPaths = this.findAllPaths(otherPlanet);

        if (allPaths.length === 0) {
            return null; // No paths found
        }

        // Find the shortest distance path based on distance
        let shortestPath = allPaths[0];
        for (const pathInfo of allPaths) {
            if (pathInfo.distance < shortestPath.distance) {
                shortestPath = pathInfo;
            }
        }

        return shortestPath.path;
    }

    /**
     * @param {Faction} newFaction 
     */
    switchControl(newFaction) {
        if (this.controllingFaction != null) {
            this.controllingFaction.planets.delete(this.id);
        }

        this.controllingFaction = newFaction;
        this.controllingFaction.planets.set(this.id, this);
    }
}

class Faction {
    /**
     * @type {Map<number, Faction>}
     */
    static factions = new Map();

    constructor(id, name) {
        this.name = name;
        this.id = id;

        this.money = 0;

        /**
         * @type {Map<number, Planet>}
         */
        this.planets = new Map();

        Faction.factions.set(this.id, this);
    }

    get income() {
        let income = 0;

        this.planets.forEach(planet => {
            income += planet.income;
        });

        return income;
    }
}

async function generateGame(configFile = "./planets.json") {
    const config = (await import(configFile, {
        assert: {
            type: "json"
        }
    })).default;

    config.planets.forEach(planet => {
        const newPlanet = new Planet();

        newPlanet.name = planet.name;
        newPlanet.income = planet.income ?? 0;

        newPlanet.x = planet.x;
        newPlanet.y = planet.y;
    });

    config.connections.forEach(connection => {
        const planet1 = Planet.get(connection[0]);
        const planet2 = Planet.get(connection[1]);

        planet1.connectingPlanets.push(planet2.name);
        planet2.connectingPlanets.push(planet1.name);
    });

    config.factions.forEach(factionConfig => {
        const faction = new Faction(factionConfig.id, factionConfig.name);

        if (factionConfig.planets.length > 0) {
            factionConfig.planets.forEach(planet => {
                const newPlanet = Planet.get(planet);
                newPlanet.switchControl(faction);
            });
        }
    });

    Planet.planets.forEach(planet => {
        if (planet.controllingFaction == null) {
            planet.switchControl(Faction.factions.get(0));
        }

        const factionCfg = config.factions[planet.controllingFaction.id];
        const planetCfg = config.planets[planet.id];

        if (planetCfg.shipyardLevel > 0) {
            planet.shipyard = new Shipyard(planet, planetCfg.shipyardLevel);

            const roster = factionCfg.shipyardRosters[planetCfg.shipyardLevel];

            for (const ship of roster) {
                planet.shipyard.buildables.set(ship, 50);
            }
        }
    });
}

function dailyTick() {
    Global.day ++;

    Faction.factions.forEach(faction => {
        faction.money += faction.income;
    });

    Planet.planets.forEach(planet => {
        if (planet.shipyard !== null) {
            planet.shipyard.tick();
        }
    });
}

function talkToMainThread() {
    const message = [Faction.factions.size, Planet.planets.size];

    Faction.factions.forEach(faction => {
        message.push(faction.id, faction.money, faction.income, faction.planets.size);

        faction.planets.forEach(planet => {
            message.push(planet.name);
        });
    });

    Planet.planets.forEach(planet => {
        message.push(planet.id, planet.income, planet.shipyard == null ? 0 : 1);

        if (planet.shipyard != null) {
            message.push(planet.shipyard.level, planet.shipyard.queue.length);

            planet.shipyard.queue.forEach(item => {
                message.push(item.name, item.day);
            });
        }
    });

    postMessage(message);
}

console.log("Generating game...");
generateGame().then(function begin() {
    console.log("Game started");
    setInterval(talkToMainThread, 1000);
    setInterval(dailyTick, 30_000);
});