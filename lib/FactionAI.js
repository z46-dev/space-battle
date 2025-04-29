export default class FactionAI {
    /**
     * @param {import("./Factions.js").Faction} faction
     * @param {import("./Campaign.js").default} campaign 
     */
    constructor(faction, campaign) {
        this.faction = faction;
        this.campaign = campaign;
        this.options = faction.aiOptions ?? {
            aggression: 2,
            defense: 1,
            construction: 1.5
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

            const fleetComposition = this.currentFleetComposition(info.fleets);

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
