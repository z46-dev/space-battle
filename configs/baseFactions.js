import { shipTypes } from "../server/lib/constants.js";
import ships from "../server/lib/ships.js";

export class CapitalConfig {
    /**
     * @param {string} name
     * @param {number} fleetPopulation
     * @param {number} baseIncome
     */
    constructor(name, fleetPopulation, baseIncome) {
        this.name = name;
        this.fleetPopulation = fleetPopulation;
        this.baseIncome = baseIncome;
    }
}

export class HeroConfig {
    /**
     * @param {string} key
     * @param {string} planet
     */
    constructor(key, planet) {
        this.key = key;
        this.planet = planet;
    }
}

export class FactionConfig {
    static id = 0;

    /**
     * @param {string} name
     * @param {string} color
     * @param {string} key
     */
    constructor(name, color, key) {
        this.id = FactionConfig.id++;
        this.name = name;
        this.color = color;
        this.key = key;
        this.planets = [];

        this.reverseLookupKey = null;

        /** @type {CapitalConfig} */
        this.capital = null;

        this.shipyardConfigs = [{
            id: 1,
            ships: []
        }, {
            id: 2,
            ships: []
        }, {
            id: 3,
            ships: []
        }, {
            id: 4,
            ships: []
        }];

        /** @type {HeroConfig[]} */
        this.heroes = [];

        /** @type {string[]} */
        this.shipyardOptions = [];

        /** @type {string[]} */
        this.stationOptions = [];
    }

    addPlanets(...planets) {
        for (const planet of planets) {
            if (!this.planets.includes(planet)) {
                this.planets.push(planet);
            }
        }

        return this;
    }

    setCapital(name, fleetPopulation, baseIncome) {
        this.capital = new CapitalConfig(name, fleetPopulation, baseIncome);
        return this;
    }

    addBuildableShips(shipyardLevel, ...ships) {
        if (shipyardLevel < 1 || shipyardLevel > 4) {
            throw new Error("Shipyard level must be between 1 and 4.");
        }

        const shipyard = this.shipyardConfigs[shipyardLevel - 1];
        for (const ship of ships) {
            if (!shipyard.ships.includes(ship)) {
                shipyard.ships.push(ship);
            }
        }

        return this;
    }

    addHero(key, planet) {
        if (!this.heroes.some(hero => hero.key === key)) {
            this.heroes.push(new HeroConfig(key, planet));
        } else {
            throw new Error(`Hero with key ${key} already exists in faction ${this.name}.`);
        }

        return this;
    }

    addHeroes(...heroes) {
        for (const hero of heroes) {
            if (!this.heroes.some(existingHero => existingHero.key === hero.key)) {
                this.heroes.push(new HeroConfig(hero.key, hero.planet));
            } else {
                throw new Error(`Hero with key ${hero.key} already exists in faction ${this.name}.`);
            }
        }

        return this;
    }

    addHeroesToPlanets(...heroNames) {
        if (this.planets.length === 0) {
            throw new Error("Cannot add heroes to planets: no planets defined in faction.");
        }

        for (const heroName of heroNames) {
            const planet = this.planets[Math.floor(Math.random() * this.planets.length)];
            if (!this.heroes.some(hero => hero.key === heroName)) {
                this.heroes.push(new HeroConfig(heroName, planet));
            } else {
                throw new Error(`Hero with key ${heroName} already exists in faction ${this.name}.`);
            }
        }

        return this;
    }

    addShipyardOptions(...options) {
        for (const option of options) {
            if (!this.shipyardOptions.includes(option)) {
                this.shipyardOptions.push(option);
            }
        }

        return this;
    }

    addStationOptions(...options) {
        for (const option of options) {
            if (!this.stationOptions.includes(option)) {
                this.stationOptions.push(option);
            }
        }

        return this;
    }

    validate() {
        if (!this.name || !this.color || !this.key) {
            throw new Error("FactionConfig is missing required properties: name, color, or key.");
        }

        if (this.capital == null) {
            throw new Error("FactionConfig is missing a capital configuration.");
        }

        if (this.planets.length === 0) {
            throw new Error("FactionConfig must have at least one planet.");
        }

        if (!this.planets.includes(this.capital.name)) {
            throw new Error(`Capital ${this.capital.name} must be included in the planets list.`);
        }

        const shipyardShips = new Set();
        for (const shipyard of this.shipyardConfigs) {
            for (const ship of shipyard.ships) {
                if (shipyardShips.has(ship)) {
                    throw new Error(`Ship ${ship} is duplicated in shipyard level ${shipyard.id}.`);
                }
                shipyardShips.add(ship);
            }

            shipyard.ships.sort((a, b) => ships[a].cost - ships[b].cost);
        }

        for (const hero of this.heroes) {
            if (!this.planets.includes(hero.planet)) {
                throw new Error(`Hero ${hero.key} is assigned to an invalid planet: ${hero.planet}.`);
            }
        }

        return this;
    }

    clone() {
        return Object.assign(new FactionConfig(this.name, this.color, this.key), {
            id: this.id,
            planets: [...this.planets],
            capital: this.capital ? new CapitalConfig(this.capital.name, this.capital.fleetPopulation, this.capital.baseIncome) : null,
            shipyardConfigs: this.shipyardConfigs.map(shipyard => ({
                id: shipyard.id,
                ships: [...shipyard.ships]
            })),
            heroes: this.heroes.map(hero => new HeroConfig(hero.key, hero.planet)),
            shipyardOptions: [...this.shipyardOptions],
            stationOptions: [...this.stationOptions]
        });
    }

    randomFleet(population, possible = this.shipyardConfigs.flatMap(shipyard => shipyard.ships)) {
        const avgPop = possible.reduce((sum, ship) => sum + ships[ship].population, 0) / possible.length;
        const output = [];

        let fails = 0;
        while (population > 0 && population < 256) {
            let ship = undefined,
                i = 0;

            internal: while (i < possible.length * 5) {
                possible.sort((b, a) => {
                    if (Math.random() > .075) {
                        return .5 - Math.random();
                    }

                    return ships[b].population - ships[a].population;
                });

                const unit = ships[possible[0]];

                if (unit == null) {
                    throw new Error(`Ship ${possible[0]} not found in ships database.`);
                }

                if (
                    unit.population <= population &&
                    (unit.population <= avgPop * 1.1 || Math.random() > .8)
                ) {
                    ship = possible[0];
                    break internal;
                }

                i++;
            }

            if (ship != null) {
                output.push(ship);
                population -= ships[ship].population;
            } else {
                fails++;
            }
        }

        return output;
    }

    static randomFleet(population) {
        return new FactionConfig("Random", "#FFFFFF", "").randomFleet(population, Object.keys(ships).filter(s => (
            ships[s].classification >= shipTypes.Corvette &&
            ships[s].classification < shipTypes.SpaceStation
        )));
    }
}
