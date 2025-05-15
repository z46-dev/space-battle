import ships from "../server/lib/ships.js";
import Fleet from "./Fleet.js";

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

    chooseUnit(restrictTo75PercentResources = true) {
        const possibleShips = this.getShips(restrictTo75PercentResources);
        const maxCost = restrictTo75PercentResources ? this.faction.money * .75 : Infinity;
        const filteredShips = possibleShips.filter(ship => ship.cost <= maxCost);

        if (filteredShips.length === 0) {
            return null;
        }

        if (!restrictTo75PercentResources) {
            filteredShips.reverse();
        }

        let i = 0;

        while (Math.random() < 3 / Math.exp(i / 5) && i < filteredShips.length - 2) {
            i++;
        }

        return filteredShips[i];
    }

    getSuitableShipyard(ship) {
        let targetLevel = 0;

        for (let i = 0; i < this.faction.shipyardConfigs.length; i++) {
            if (this.faction.shipyardConfigs[i].ships.includes(ship.name)) {
                targetLevel = this.faction.shipyardConfigs[i].id;
                break;
            }
        }

        const shipyards = this.getShipyards().filter(s => s.level >= targetLevel);
        if (shipyards.length === 0) {
            return null;
        }

        return shipyards.sort((a, b) => a.queueTime - b.queueTime)[0];
    }

    tick() {
        this.cyclesSinceLastBuild++;

        if (this.saving.currentlySavingFor === null) {
            this.saving.motivation++;

            if (this.saving.motivation >= 1024 || Math.random() > (.25 * Math.exp(25 / this.saving.motivation))) {
                this.saving.currentlySavingFor = this.chooseUnit(false);

                if (this.saving.currentlySavingFor == null) {
                    this.saving.currentlySavingFor = null;
                    this.saving.motivation = 0;
                    return;
                }

                this.saving.divergenceIntensity = Math.random() / 3;
                // console.log(`[AI] ${this.faction.name} is saving up for ${this.saving.currentlySavingFor.name}`);
            } else {
                this.randomBuild();
            }
        } else if (this.faction.money > this.saving.currentlySavingFor.cost) {
            let ship = this.saving.currentlySavingFor;
            let shipyard = this.getSuitableShipyard(ship);

            let i = 0;
            while (i < 10 && shipyard == null) {
                ship = this.chooseUnit(true);
                shipyard = this.getSuitableShipyard(ship);
                i++;
            }

            if (shipyard == null) {
                return;
            }

            // console.log(`[AI] ${this.faction.name} saved up to build ${ship.name} at ${shipyard.planet.name}`);
            shipyard.build(ship.name);

            this.saving.motivation = 0;
            this.saving.currentlySavingFor = null;
            this.saving.divergenceIntensity = .1;
        } else if (Math.random() < this.saving.divergenceIntensity) {
            this.randomBuild();
        }
    }

    randomBuild() {
        if (Math.random() > .15 * Math.exp(this.cyclesSinceLastBuild)) {
            return;
        }

        this.cyclesSinceLastBuild = 0;

        const ship = this.chooseUnit(true);
        if (!ship || ship == null) {
            return;
        }

        const shipyard = this.getSuitableShipyard(ship);
        if (!shipyard) {
            return;
        }

        // console.log(`[AI] ${this.faction.name} is building ${ship.name} at ${shipyard.planet.name}`);
        shipyard.build(ship.name);
    }
}

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
            defense: 1
        };

        this.memory = {
            lastTarget: null
        };

        this.lastAction = null;

        this.buildCorps = new FactionAIBuildCorps(this);
    }

    think() {
        this.buildCorps.tick();

        const info = this.gatherInformation();

        const action = [
            this.planDefend(info),
            this.planExpand(info),
            this.planMergeFleets()
        ].filter(a => a != null && a.type !== this.lastAction).map(a => ({ ...a, score: a.score * Math.abs(Math.sin(Math.random()) * .2) })).sort((a, b) => b.score - a.score)[0];

        if (action) {
            console.log(`[AI] ${this.faction.name} chooses to ${action.type} (score: ${action.score.toFixed(2)})`);
            action.execute();
            this.lastAction = action.type;
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
            if (planet.controllingFaction !== this.faction) {
                return;
            }

            let myFleetPower = 0;
            planet.fleets.forEach(fleet => {
                myFleetPower += fleet.population;
                output.fleets.push(fleet);
            });

            const dangerScore = planet.connectingPlanets.map(name => {
                const neighbor = this.campaign.getPlanet(name);
                if (neighbor.controllingFaction === this.faction) {
                    return 0;
                }

                let threat = output.threats.find(t => t.faction === neighbor.controllingFaction),
                    score = neighbor.fleets.reduce((a, b) => a + b.population, 0) / Math.max(myFleetPower, 1);

                if (!threat) {
                    threat = {
                        faction: neighbor.controllingFaction,
                        threatScore: 0,
                        threateningPlanets: []
                    };

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
                    planet: planet
                });
            }
        });

        return output;
    }

    planDefend(info) {
        // const defenseThreshold = 2 / this.options.defense;
        // const endangered = info.planets.filter(p => p.inDangerScale > defenseThreshold);
        // const safe = info.planets.filter(p => p.inDangerScale < 0.5);

        // if (endangered.length === 0) {
        //     return null;
        // }

        // return {
        //     type: "defend",
        //     score: endangered.length / safe.length * 1.5,
        //     execute: () => {
        //         let moved = 0,
        //             i = 0;

        //         safe.forEach(({ planet }) => {
        //             planet.fleets.forEach(fleet => {
        //                 if (!fleet.inTransit && fleet.faction === this.faction && Math.random() > 0.3) {
        //                     const target = endangered[i % endangered.length].planet;
        //                     fleet.transitTo(this.campaign.findRoute(planet, target));
        //                     moved++;
        //                     i++;
        //                 }
        //             });
        //         });

        //         return moved > 0;
        //     }
        // };

        const endangered = info.threats.filter(t => t.threatScore > 0);
        const safe = info.planets.filter(p => p.inDangerScale === 0);
        if (endangered.length === 0 || safe.length === 0) {
            return null;
        }

        return {
            type: "defend",
            score: endangered.length / safe.length * 1.5,
            execute: () => {
                let moved = 0,
                    i = 0;

                safe.forEach(entry => {
                    const { planet } = entry;
                    planet.fleets.forEach(fleet => {
                        if (!fleet.inTransit && fleet.faction === this.faction && Math.random() > 0.3) {
                            const target = endangered[i % endangered.length].threateningPlanets[0];
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

                    options.push({
                        attackWith: myPlanet,
                        attacking: enemyPlanet,
                        score: (myPower / enemyPower) * this.options.aggression * .9
                    });
                });
            });
        });

        if (options.length === 0) {
            return null;
        }

        options.sort((a, b) => b.score - a.score);

        const choice = options[0];
        this.memory.lastTarget = choice.attacking;

        return {
            type: "expand",
            score: choice.score,
            execute: () => {
                const fleets = choice.attackWith.fleets.sort((a, b) => b.population - a.population);
                if (fleets.length === 0) {
                    return false;
                }

                fleets[0].transitTo(this.campaign.findRoute(choice.attackWith, choice.attacking));
                console.log(`[AI] ${this.faction.name} attacks ${choice.attacking.name} from ${choice.attackWith.name}`);
                return true;
            }
        };
    }

    planMergeFleets() {
        const candidates = [];

        this.campaign.planets.forEach(planet => {
            if (planet.controllingFaction !== this.faction) {
                return;
            }

            if (planet.fleets.length <= 2) {
                return;
            }

            candidates.push(planet);
        });

        if (candidates.length === 0) {
            return null;
        }

        /** @type {import("./Planet.js").default} */
        const candidate = candidates.sort((a, b) => b.fleets.length - a.fleets.length)[0];

        return {
            type: "merge",
            score: candidate.fleets.length * 1.75,
            execute: () => {
                class Entry {
                    static TYPE_SHIP = 0;
                    static TYPE_HERO = 1;

                    type = Entry.TYPE_SHIP;
                    data = null;
                }

                /** @type {Entry[]} */
                const entries = [];

                candidate.fleets.forEach(fleet => {
                    if (fleet.faction !== this.faction || fleet.inTransit) {
                        return;
                    }

                    fleet.__ships.forEach(ship => {
                        const entry = new Entry();
                        entry.type = Entry.TYPE_SHIP;
                        entry.data = ship;
                        entries.push(entry);
                    });

                    fleet.heroUnits.forEach((val, key) => {
                        const entry = new Entry();
                        entry.type = Entry.TYPE_HERO;
                        entry.data = [key, val];
                        entries.push(entry);
                    });
                });

                entries.sort(() => .5 - Math.random());

                let population = 0;
                entries.forEach(entry => {
                    if (entry.type === Entry.TYPE_SHIP) {
                        population += ships[entry.data].population;
                    } else {
                        population += ships[entry.data[1]].population;
                    }
                });

                /** @type {Fleet[]} */
                const fleets = [];

                for (let i = 0; i < population / 300; i ++) {
                    const fleet = new Fleet();
                    fleet.faction = this.faction;
                    fleet.planet = candidate;
                    fleets.push(fleet);
                }

                while (entries.length > 0) {
                    const entry = entries.pop();
                    let pop = entry.type === Entry.TYPE_SHIP ? ships[entry.data].population : ships[entry.data[1]].population;
                    
                    let fleet = fleets.find(f => f.population + pop <= 300);
                    if (!fleet) {
                        fleet = new Fleet();
                        fleet.faction = this.faction;
                        fleet.planet = candidate;
                        fleets.push(fleet);
                    }

                    if (entry.type === Entry.TYPE_SHIP) {
                        fleet.add(entry.data);
                    } else if (entry.type === Entry.TYPE_HERO) {
                        fleet.addHero(entry.data[0], entry.data[1]);
                    }
                }

                candidate.fleets = candidate.fleets.filter(f => f.faction !== this.faction || f.inTransit);
                candidate.fleets.push(...fleets);
                return true;

                // /** @type {import("./Fleet.js").default[]} */
                // const fleets = [];

                // planet.fleets = planet.fleets.filter(fleet => {
                //     if (fleet.faction !== this.faction || fleet.inTransit) {
                //         return true;
                //     }

                //     fleets.push(fleet);
                //     return false;
                // });

                // if (fleets.length < 2) {
                //     planet.fleets.push(...fleets);
                //     return false;
                // }

                // let k = 0;

                // for (let i = 2; i < fleets.length; i++) {
                //     for (const s of fleets[i].__ships) {
                //         fleets[k++ % 2].add(s);
                //     }

                //     fleets[i].heroUnits.forEach(h => {
                //         fleets[k++ % 2].addHero(h);
                //     });
                // }

                // for (let i = 0; i < 2; i++) {
                //     planet.fleets.push(fleets[i]);
                // }

                // return true;
            }
        }
    }
}
