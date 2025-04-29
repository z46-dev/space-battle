import ships from "../server/lib/ships.js";

class FactionAIBuildCorps {
    /**
     * @param {FactionAI} ai 
     */
    constructor(ai) {
        this.ai = ai;

        /** @type {import("./Factions.js").Faction} */
        this.faction = ai.faction;

        /** @type {import("./Campaign.js").default} */
        this.campaign = ai.campaign;

        this.saving = {
            motivation: 0, // Cycles without attempting to do a save
            currentlySavingFor: null, // The target amount of money to save for
            divergenceIntensity: .1 // The chance to diverge from the plan for a cycle
        };

        this.cyclesSinceLastBuild = 0;
    }

    /**
     * Predict how many cycles it will take to reach a target amount of money.
     * @param {number} target The target amount of money to reach.
     * @returns {number} The number of cycles it will take to reach the target amount of money.
     */
    predictSaving(target) {
        return this.faction.money > target ? 0 : Math.ceil((target - this.faction.money) / this.faction.income);
    }

    /**
     * @returns {import("./Shipyard.js").default[]} The shipyards owned by the faction.
     */
    getShipyards() {
        const shipyards = [];

        this.campaign.planets.forEach(planet => {
            if (planet.controllingFaction.id === this.faction.id) {
                shipyards.push(planet.shipyard);
            }
        });

        return shipyards;
    }

    getShips(filterForAvailableShipyards = true) {
        const tmp = new Map();

        const shipyards = filterForAvailableShipyards ? this.getShipyards() : null;

        this.faction.shipyardConfigs.forEach(cfg => {
            if (filterForAvailableShipyards) {
                if (!shipyards.some(s => s.level >= cfg.id)) {
                    return;
                }
            }

            for (const ship of cfg.ships) {
                tmp.set(ship, ships[ship].cost);
            }
        });

        const output = [];

        for (const [name, cost] of tmp.entries()) {
            output.push({
                name: name,
                cost: cost
            });
        }

        return output.sort((a, b) => a.cost - b.cost);
    }

    chooseUnit(restrictTo75PercentResources = false) {
        const possibleShips = this.getShips(true);
        const maxCost = restrictTo75PercentResources ? this.faction.money * .75 : Infinity;
        const filteredShips = possibleShips.filter(ship => ship.cost <= maxCost);

        if (filteredShips.length === 0) {
            return null;
        }

        if (!restrictTo75PercentResources) {
            filteredShips.reverse();
        }

        let i = 0;

        while (Math.random() < Math.exp(i / 3) && i < filteredShips.length - 1) {
            i++;
        }

        return filteredShips[i];
    }

    tick() {
        this.cyclesSinceLastBuild++;

        if (this.saving.currentlySavingFor === null) {
            this.saving.motivation++;

            if (this.saving.motivation >= 1024 || Math.random() > (.25 * Math.exp(25 / this.saving.motivation))) {
                this.saving.currentlySavingFor = this.chooseUnit(false);
                this.saving.divergenceIntensity = Math.random() / 3;
            } else {
                this.randomBuild();
            }
        } else {
            if (Math.random() < this.saving.divergenceIntensity) {
                this.randomBuild();
            }
        }
    }

    randomBuild() {
        if (Math.random() > .5 * Math.exp(this.cyclesSinceLastBuild)) {
            return;
        }

        this.cyclesSinceLastBuild = 0;

        const shipyards = this.getShipyards().sort((a, b) => b.queueTime - a.queueTime);
        if (shipyards.length === 0) {
            return;
        }

        const shipyard = shipyards[0];
        const ship = this.chooseUnit(true);
    }
}

class FactionAIFleetManager {}

export default class FactionAI {
    /**
     * @param {import("./Factions.js").Faction} faction
     * @param {import("./Campaign.js").default} campaign 
     */
    constructor(faction, campaign) {
        this.faction = faction;
        this.campaign = campaign;
        this.options = faction.aiOptions ?? {
            aggression: 1,
            defense: 1,
            construction: 1
        };

        this.memory = {
            lastTarget: null // (Optional) For prioritizing attacks
        };

        this.lastAction = null;
    }

    think() {
        const info = this.gatherInformation();
        const possibleActions = [];

        const defend = this.planDefend(info);
        if (defend) possibleActions.push(defend);

        const build = this.planBuild(info);
        if (build) possibleActions.push(build);

        const expand = this.planExpand(info);
        if (expand) possibleActions.push(expand);

        const reposition = this.planReposition(info);
        if (reposition) possibleActions.push(reposition);

        const betterActions = possibleActions.filter(a => a.type !== this.lastAction).map(a => ({
            ...a,
            score: a.score * Math.abs(Math.sin(Date.now() / 1000) * .2)
        }));

        if (betterActions.length === 0) return;

        betterActions.sort((a, b) => b.score - a.score);
        const bestAction = betterActions[0];

        console.log(betterActions);

        if (bestAction) {
            console.log(`[AI] ${this.faction.name} chooses to ${bestAction.type} (score: ${bestAction.score.toFixed(2)})`);
            bestAction.execute();
            this.lastAction = bestAction.type;
        }
    }

    gatherInformation() {
        const output = {
            planets: [],
            fleets: [],
            economy: {
                money: this.faction.money,
                income: this.faction.income ?? 0
            },
            threats: [],
            shipyards: []
        };

        this.campaign.planets.forEach(planet => {
            if (planet.controllingFaction !== this.faction) return;

            let myFleetPower = 0;
            planet.fleets.forEach(fleet => {
                myFleetPower += fleet.population;
                output.fleets.push(fleet);
            });

            const dangerScore = planet.connectingPlanets.map(name => {
                const neighbor = this.campaign.getPlanet(name);
                if (neighbor.controllingFaction === this.faction) return 0;

                let threat = output.threats.find(t => t.faction === neighbor.controllingFaction),
                    score = neighbor.fleets.reduce((a, b) => a + b.population, 0) / Math.max(myFleetPower, 1);

                if (!threat) {
                    threat = { faction: neighbor.controllingFaction, threatScore: 0, threateningPlanets: [] };
                    output.threats.push(threat);
                }

                if (!threat.threateningPlanets.includes(neighbor)) {
                    threat.threatScore += score;
                    threat.threateningPlanets.push(neighbor);
                }

                return score;
            }).reduce((a, b) => a + b, 0);

            const planetScore = (planet.income ?? 0) - dangerScore * 10;

            output.planets.push({
                planet,
                inDangerScale: dangerScore,
                score: planetScore
            });

            if (planet.shipyard) {
                output.shipyards.push({
                    isEmpty: planet.shipyard.queue.length === 0,
                    inDangerScale: dangerScore,
                    planet
                });
            }
        });

        return output;
    }

    planDefend(info) {
        const defenseThreshold = 2 / this.options.defense;
        const endangered = info.planets.filter(p => p.inDangerScale > defenseThreshold);
        const safe = info.planets.filter(p => p.inDangerScale < 0.5);

        if (endangered.length === 0) return null;

        const score = endangered.length * 1.5; // The more endangered planets, the more urgent

        return {
            type: "defend",
            score,
            execute: () => {
                let moved = 0;
                let i = 0;
                safe.forEach(({ planet }) => {
                    planet.fleets.forEach(fleet => {
                        if (fleet.faction === this.faction && Math.random() > 0.3) {
                            const target = endangered[i % endangered.length].planet;
                            fleet.transitTo(this.campaign.findRoute(planet, target));
                            moved++;
                            i++;
                        }
                    });
                });
                return moved > 0;
            }
        };
    }

    planBuild(info) {
        const shipyards = [...info.shipyards].filter(s => s.isEmpty).sort((a, b) => a.inDangerScale - b.inDangerScale);
        if (shipyards.length === 0) {
            return null;
        }

        const buildable = [];

        shipyards.forEach(({ planet }) => {
            const shipyard = planet.shipyard;
            if (!shipyard) {
                return;
            }

            for (const [name, cost] of shipyard.buildables.entries()) {
                if (this.faction.money >= cost) {
                    buildable.push({
                        shipyard: shipyard,
                        name: name,
                        shipScore: this.options.construction * (cost / 5000) * (1 + Math.sin(Math.random()) * .15)
                    });
                }
            }
        });

        if (buildable.length === 0) {
            return null;
        }

        buildable.sort(() => .5 - Math.random());
        buildable.sort((a, b) => {
            if (Math.random() > .5) {
                return .5 - Math.random();
            }

            return b.shipScore - a.shipScore;
        });

        buildable.sort((a, b) => {
            if (Math.random() > .9) {
                return .5 - Math.random();
            }

            return b.shipScore - a.shipScore;
        });

        const top = buildable[0];

        return {
            type: "build",
            score: top.shipScore * 650,
            execute: () => {
                top.shipyard.build(top.name);
                console.log(`[AI] ${this.faction.name} built ${top.name} at ${top.shipyard.planet.name}`);
                return true;
            }
        };
    }

    planExpand(info) {
        const options = [];

        info.threats.forEach(threat => {
            threat.threateningPlanets.forEach(enemyPlanet => {
                enemyPlanet.connectingPlanets.forEach(name => {
                    const myPlanet = this.campaign.getPlanet(name);
                    if (myPlanet.controllingFaction !== this.faction) {
                        return;
                    }

                    const myPower = myPlanet.fleets.reduce((sum, f) => sum + f.population, 0);
                    const enemyPower = enemyPlanet.fleets.reduce((sum, f) => sum + f.population, 0) || 1;

                    const score = (myPower / enemyPower) * this.options.aggression;

                    options.push({
                        attackWith: myPlanet,
                        attacking: enemyPlanet,
                        score
                    });
                });
            });
        });

        if (options.length === 0) return null;

        options.sort((a, b) => b.score - a.score);

        const choice = options[0];

        if (choice.score < 0.7) return null;

        this.memory.lastTarget = choice.attacking;

        return {
            type: "expand",
            score: choice.score * 3,
            execute: () => {
                const fleets = choice.attackWith.fleets.sort((a, b) => b.population - a.population);
                if (fleets.length === 0) return false;
                fleets[0].transitTo(this.campaign.findRoute(choice.attackWith, choice.attacking));
                console.log(`[AI] ${this.faction.name} attacks ${choice.attacking.name} from ${choice.attackWith.name}`);
                return true;
            }
        };
    }

    planReposition(info) {
        if (!this.memory.lastTarget) return null;

        const targetPlanet = this.memory.lastTarget;

        const candidates = info.planets.filter(({ planet }) => {
            return planet.connectingPlanets.includes(targetPlanet.name) && planet.fleets.length > 0;
        });

        if (candidates.length === 0) return null;

        const choice = candidates[Math.random() * candidates.length | 0];

        return {
            type: "reposition",
            score: 5,
            execute: () => {
                const fleet = choice.planet.fleets[0];
                fleet.transitTo(this.campaign.findRoute(choice.planet, targetPlanet));
                console.log(`[AI] ${this.faction.name} repositions fleet from ${choice.planet.name} toward ${targetPlanet.name}`);
                return true;
            }
        };
    }

    currentFleetComposition(fleets) {
        const composition = {};
        fleets.forEach(fleet => {
            fleet.ships.forEach((count, shipName) => {
                composition[shipName] = (composition[shipName] || 0) + count;
            });
        });
        const total = Object.values(composition).reduce((a, b) => a + b, 0) || 1;
        for (const key in composition) {
            composition[key] /= total;
        }
        return composition;
    }
}
