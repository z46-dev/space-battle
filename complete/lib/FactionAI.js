export default class FactionAI {
    /**
     * @param {import("./Factions.js").Faction} faction
     * @param {import("./Campaign.js").default} campaign 
     */
    constructor(faction, campaign) {
        this.faction = faction;
        this.campaign = campaign;
    }

    gatherInformation() {
        const output = {
            /** @type {{planet: import("./Planet.js").default, inDangerScale: number}[]} */
            planets: [],

            /** @type {import("./Fleet.js").default[]} */
            fleets: [],

            economy: {
                money: this.faction.money,
                income: this.faction.income ?? 0
            },

            /** @type {{faction: import("./Factions.js").Faction, threatScore: number, threateningPlanets: import("./Planet.js").default[]}[]} */
            threats: [],

            /** @type {{isEmpty: boolean, inDangerScale: number, planet: import("./Planet.js").default}[]} */
            shipyards: []
        };

        this.campaign.planets.forEach(planet => {
            if (planet.controllingFaction !== this.faction) {
                return;
            }

            let myPop = 0;

            planet.fleets.forEach(fleet => {
                myPop += fleet.population;
                output.fleets.push(fleet);
            });

            output.planets.push({
                planet: planet,
                inDangerScale: planet.connectingPlanets.map(name => {
                    const o = this.campaign.getPlanet(name);

                    if (o.controllingFaction === this.faction) {
                        return 0;
                    }

                    let threat = output.threats.find(t => t.faction === o.controllingFaction),
                        score = o.fleets.map(f => f.population / myPop).reduce((a, b) => a + b, 0);

                    if (!threat) {
                        threat = {
                            faction: o.controllingFaction,
                            threatScore: 0,
                            threateningPlanets: []
                        };

                        output.threats.push(threat);
                    }

                    if (threat.threateningPlanets.findIndex(p => p.id === o.id) === -1) {
                        threat.threatScore += score;
                        threat.threateningPlanets.push(o);
                    }

                    return score;
                }).reduce((a, b) => a + b, 0)
            });

            if (planet.shipyard != null) {
                output.shipyards.push({
                    isEmpty: planet.shipyard.queue.length === 0,
                    inDangerScale: output.planets[output.planets.length - 1].inDangerScale,
                    planet: planet
                });
            }
        });

        return output;
    }

    think() {
        const info = this.gatherInformation();

        if (this.handleDanger(info)) {
            return;
        }

        if (this.buildShips(info)) {
            return;
        }

        this.attackWeakTargets(info);
    }

    /**
     * Handles moving fleets to planets in danger.
     * @param {ReturnType<FactionAI['gatherInformation']>} info
     * @returns {boolean} True if action was taken, otherwise false.
     */
    handleDanger(info) {
        const planetsInDanger = info.planets.filter(p => p.inDangerScale > 3);
        const planetsSafe = info.planets.filter(p => p.inDangerScale < .5);

        if (planetsInDanger.length === 0 || planetsSafe.length === 0) {
            return false;
        }

        let movedFleets = 0;
        let i = 0;

        planetsSafe.forEach(safePlanetInfo => {
            const planet = safePlanetInfo.planet;

            planet.fleets.forEach(fleet => {
                if (fleet.faction === this.faction && Math.random() > .9) {
                    fleet.transitTo(this.campaign.findRoute(planet, planetsInDanger[i].planet));
                    movedFleets++;

                    i = (i + 1) % planetsInDanger.length;
                }
            });
        });

        return movedFleets > 0;
    }

    /**
     * Handles building ships at shipyards.
     * @param {ReturnType<FactionAI['gatherInformation']>} info
     * @returns {boolean} True if action was taken, otherwise false.
     */
    buildShips(info) {
        const shipyards = info.shipyards.filter(s => s.isEmpty);

        if (shipyards.length === 0) {
            shipyards.push(...info.shipyards.filter(s => s.inDangerScale < 3));

            if (shipyards.length === 0) {
                return false;
            }
        }

        /** @type {{score: number, shipyard: import("./Shipyard.js").default}[]} */
        const choices = shipyards.map(s => {
            const shipyard = s.planet.shipyard;

            let score = 0;
            shipyard.buildables.forEach(cost => {
                score += this.faction.money / cost;
            });

            return { score, shipyard };
        });

        choices.sort((a, b) => b.score - a.score);

        const bestChoice = choices[0];

        if (Math.random() > .4) {
            let buildableName = null;

            bestChoice.shipyard.buildables.forEach((cost, name) => {
                if (this.faction.money >= cost && (!buildableName || Math.random() > .56)) {
                    buildableName = name;
                }
            });

            if (buildableName) {
                bestChoice.shipyard.build(buildableName);
                console.log(`Faction ${this.faction.name} built ${buildableName} on ${bestChoice.shipyard.planet.name}`);
                return true;
            }
        }

        return false;
    }

    /**
     * Handles attacking weak planets and factions.
     * @param {ReturnType<FactionAI['gatherInformation']>} info
     * @returns {boolean} True if action was taken, otherwise false.
     */
    attackWeakTargets(info) {
        /** @type {{ attackWith: import("./Planet.js").default, attacking: import("./Planet.js").default, score: number }[]} */
        const choices = [];

        info.threats.forEach(threat => {
            threat.threateningPlanets.forEach(planet => {
                planet.connectingPlanets.forEach(name => {
                    const other = this.campaign.getPlanet(name);

                    if (other.controllingFaction !== this.faction) {
                        return;
                    }

                    choices.push({
                        attackWith: other,
                        attacking: planet,
                        score: planet.fleets.reduce((a, b) => a + b.population, 0) / other.fleets.reduce((a, b) => a + b.population, 0)
                    });
                });
            });
        });

        if (choices.length === 0) {
            return false;
        }

        choices.sort((a, b) => b.score - a.score);

        const choice = choices[(Math.exp(Math.random() * Math.log(choices.length + 1)) - 1) | 0];
        const fleets = choice.attackWith.fleets.sort((a, b) => b.population - a.population);

        if (fleets.length === 0) {
            return;
        }

        if (fleets.length > 1 && fleets[0].population <= choice.attacking.fleets.reduce((a, b) => a + b.population, 0) * 1.15) {
            for (let i = 1; i < fleets.length; i++) {
                while (fleets[i].population > 25) {
                    const keys = Array.from(fleets[i].ships.keys());
                    const key = keys[Math.random() * keys.length | 0];

                    fleets[i].removeShip(key);
                    fleets[0].addShip(key);
                }
            }
        }

        if (Math.random() > .925) {
            fleets[0].transitTo(this.campaign.findRoute(choice.attackWith, choice.attacking));
            console.log(`Faction ${this.faction.name} is attacking faction ${choice.attacking.controllingFaction.name} on planet ${choice.attacking.name}`);
        }
    }
}