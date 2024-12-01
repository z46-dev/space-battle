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
        const planetsInDanger = info.planets.filter(p => p.inDangerScale > 2.5);
        const planetsSafe = info.planets.filter(p => p.inDangerScale < 0.5);

        if (planetsInDanger.length === 0 || planetsSafe.length === 0) {
            return false;
        }

        let movedFleets = 0;
        let i = 0;

        planetsSafe.forEach(safePlanetInfo => {
            const planet = safePlanetInfo.planet;

            planet.fleets.forEach(fleet => {
                if (fleet.faction === this.faction && Math.random() > 0.9) {
                    fleet.transitTo(this.campaign.findRoute(planet, planetsInDanger[i].planet));
                    movedFleets++;
                }
            });

            i = (i + 1) % planetsInDanger.length;
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
            return false;
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

        if (Math.random() > 0.5) {
            let buildableName = null;

            bestChoice.shipyard.buildables.forEach((cost, name) => {
                if (this.faction.money >= cost && (!buildableName || Math.random() > 0.45)) {
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
        const safePlanets = info.planets.filter(p => p.inDangerScale < 1).sort((a, b) => a.inDangerScale - b.inDangerScale);

        if (safePlanets.length === 0) {
            return false;
        }

        const targetPlanet = safePlanets[0].planet;

        const threatsToTarget = info.threats.filter(threat =>
            threat.threateningPlanets.some(p => p.id === targetPlanet.id)
        );

        if (threatsToTarget.length === 0) {
            return false;
        }

        const weakestFaction = threatsToTarget.reduce((weakest, current) => {
            return current.threatScore < (weakest?.threatScore ?? Infinity) ? current : weakest;
        }, null);

        if (!weakestFaction) {
            return false;
        }

        console.log(`Faction ${this.faction.name} is attacking faction ${weakestFaction.faction.name}`);
        // Logic to send fleets to attack weakestFaction
        let attackFleetCount = 0;

        targetPlanet.fleets.forEach(fleet => {
            if (fleet.faction === this.faction && Math.random() > 0.5) {
                const target = weakestFaction.threateningPlanets[0]; // Pick a random threatening planet
                fleet.transitTo(this.campaign.findRoute(targetPlanet, target));
                attackFleetCount++;
            }
        });

        return attackFleetCount > 0;
    }
}