import { planets } from "../configs/planets.js";
import { shipTypes } from "../server/lib/constants.js";
import ships from "../server/lib/ships.js";
import Fleet from "./Fleet.js";
import Planet, { BuildQueueItem } from "./Planet.js";

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
     * @returns {{planet:import("./Planet.js").default, builds:import("./Planet.js").PlanetBuilds}[]} The shipyards owned by the faction.
     */
    getShipyards() {
        const shipyards = [];

        this.campaign.planets.forEach(planet => {
            if (planet.controllingFaction.id === this.faction.id && planet.builds != null) {
                shipyards.push({
                    planet: planet,
                    builds: planet.builds
                });
            }
        });

        return shipyards;
    }

    getShips(filterForAvailableShipyards = true) {
        const tmp = new Map();

        const shipyards = filterForAvailableShipyards ? this.getShipyards() : null;

        this.faction.shipyardConfigs.forEach(cfg => {
            if (filterForAvailableShipyards) {
                if (!shipyards.some(s => s.builds.shipyardLevel >= cfg.id)) {
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

        const shipyards = this.getShipyards().filter(s => s.builds.shipyardLevel >= targetLevel);
        if (shipyards.length === 0) return null;

        // Sort based on existing fleet strength (descending), then queueTime (ascending)
        return shipyards.sort((a, b) => {
            const aPower = a.planet.fleets.reduce((sum, f) =>
                f.faction === this.faction ? sum + f.autoResolveScore : sum, 0);
            const bPower = b.planet.fleets.reduce((sum, f) =>
                f.faction === this.faction ? sum + f.autoResolveScore : sum, 0);

            return bPower - aPower || a.builds.queueTime - b.builds.queueTime;
        })[0].builds;
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
            if (ships[ship.name].classification > shipTypes.Capital) {
                this.campaign.log.dreadnoughtConstruction(this.campaign.week, `${this.faction.name} is constructing a ${ships[ship.name].name} over ${shipyard.planet.name}`);
            }

            this.faction.money -= shipyard.buildShip(ship.name, this.faction.money);

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
        if (ships[ship.name].classification > shipTypes.Capital) {
            this.campaign.log.dreadnoughtConstruction(this.campaign.week, `${this.faction.name} is constructing a ${ships[ship.name].name} over ${shipyard.planet.name}`);
        }

        shipyard.buildShip(ship.name);
    }
}

class EnemyInfoPlanet {
    planetObj = null;

    defensiveScore = 0; // Combined population of shipyard + stations + fleets not in transit
    attackingScore = 0; // autoResolveScore of the strongest fleet on this planet (aka what they could send against us)
}

class InfoPlanet {
    /** @type {Planet} */
    planetObj = null;
    shipyardLevel = 0;

    defensiveScore = 0; // Combined population of shipyard + stations
    totalDefensiveScore = 0; // Combined population of all (not in transit) fleets + shipyards + defensive stations

    totalAttackingScore = 0; // Total autoResolveScore of all fleets on this planet
    highestAttackingScore = 0; // Highest autoResolveScore of a single fleet on this planet

    /** @type {EnemyInfoPlanet[]} */
    threateningPlanets = [];

    /** @type {EnemyInfoPlanet[]} */
    vulnerableEnemyPlanets = [];
}

class Information {
    /** @type {InfoPlanet[]} */
    planets = [];

    economy = {
        money: 0,
        income: 0
    };

    /**
     * Returns a list of planets that have shipyards, sorted by how defensible they are.
     * @return {InfoPlanet[]}
     */
    planetsWithShipyards() {
        return this.planets.filter(p => p.shipyardLevel > 0).sort((a, b) => a.defensiveScore - b.defensiveScore);
    }

    /**
     * Returns a list of planets that are safe, meaning they have no threats.
     * @return {InfoPlanet[]}
     */
    safePlanets() {
        return this.planets.filter(p => p.threateningPlanets.length === 0).sort((a, b) => {
            return b.totalDefensiveScore - a.totalDefensiveScore;
        });
    }

    /**
     * Returns a list of planets that are endangered, meaning they have threats.
     * The list is sorted based on the ratio of enemy power to defensive power.
     * @return {InfoPlanet[]}
     */
    endangeredPlanets() {
        return this.planets.filter(p => p.threateningPlanets.length > 0).sort((a, b) => {
            let scoreA = 0, scoreB = 0;

            a.threateningPlanets.forEach(t => scoreA += t.attackingScore);
            b.threateningPlanets.forEach(t => scoreB += t.attackingScore);

            scoreA /= a.totalDefensiveScore || 1;
            scoreB /= b.totalDefensiveScore || 1;

            return scoreB - scoreA;
        });
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
            aggression: .2,
            defense: 1
        };

        this.memory = {
            lastTarget: null
        };

        this.lastAction = null;

        this.buildCorps = new FactionAIBuildCorps(this);
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ─── UPDATED newThink() ───────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    newThink() {
        // 1) Gather fresh info about our controlled planets, fleets, economy, and threats
        const info = this.gatherNewInformation();
        if (info.planets.length === 0) {
            return; // Nothing to do if we control no worlds
        }

        // 2) If we have at least one shipyard anywhere, ALWAYS let buildCorps tick (to queue or finish ship builds)
        if (info.planetsWithShipyards().length > 0) {
            this.buildCorps.tick();
        }

        // 3) Run Infrastructure staging (may build shipyards or stations)
        const infraPlan = this.planBuildInfrastructure(info);
        if (infraPlan) {
            console.log(`[AI] ${this.faction.name} infrastructure: ${infraPlan.description}`);
            infraPlan.execute();
        }

        // 4) Run Fleet Consolidation (merge fleets & forward‐deploy any idle fleets)
        const consolPlan = this.planConsolidation(info);
        if (consolPlan) {
            console.log(`[AI] ${this.faction.name} consolidation: ${consolPlan.description}`);
            consolPlan.execute();
        }

        // 5) Run Attack path (send fleets on offensive missions)
        const attackPlan = this.planAttack(info);
        if (attackPlan) {
            console.log(`[AI] ${this.faction.name} attack: ${attackPlan.description}`);
            attackPlan.execute();
        }
    }


    /** @returns {Information} */
    gatherNewInformation() {
        const info = new Information();
        info.economy.money = this.faction.money;
        info.economy.income = this.faction.income ?? 0;

        this.campaign.planets.forEach(planet => {
            if (planet.controllingFaction !== this.faction) {
                return;
            }

            if (planet.builds == null) {
                throw new Error(`Planet ${planet.name} does not have builds defined!`);
            }

            const entry = new InfoPlanet();
            entry.planetObj = planet;
            entry.shipyardLevel = planet.builds.shipyard != null ? planet.builds.shipyardLevel : 0;

            entry.defensiveScore =
                (planet.builds.shipyard != null ? planet.builds.shipyard.population : 0) +
                planet.builds.stationSlots.reduce((sum, station) => sum + (station == null ? 0 : ships[station].population), 0);

            entry.totalAttackingScore = planet.fleets.reduce((sum, fleet) => {
                if (fleet.faction !== this.faction || fleet.inTransit) {
                    return sum;
                }

                return sum + fleet.autoResolveScore;
            }, 0);

            entry.totalDefensiveScore = entry.defensiveScore + entry.totalAttackingScore;

            entry.highestAttackingScore = planet.fleets.reduce((max, fleet) => {
                if (fleet.faction !== this.faction || fleet.inTransit) {
                    return max;
                }

                return Math.max(max, fleet.autoResolveScore);
            }, 0);

            planet.connectingPlanets.forEach(name => {
                const neighbor = this.campaign.getPlanet(name);

                if (neighbor.controllingFaction === this.faction) {
                    return;
                }

                const enemy = new EnemyInfoPlanet();
                enemy.planetObj = neighbor;

                enemy.defensiveScore = (neighbor.builds != null ? (
                    (neighbor.builds.shipyard != null ? neighbor.builds.shipyard.population : 0) +
                    neighbor.builds.stationSlots.reduce((sum, station) => sum + (station == null ? 0 : ships[station].population), 0)
                ) : 0) + neighbor.fleets.reduce((sum, fleet) => {
                    if (fleet.faction !== neighbor.controllingFaction || fleet.inTransit) {
                        return sum;
                    }

                    return sum + fleet.autoResolveScore;
                }, 0);

                enemy.attackingScore = neighbor.fleets.reduce((max, fleet) => {
                    if (fleet.faction !== neighbor.controllingFaction || fleet.inTransit) {
                        return max;
                    }

                    return Math.max(max, fleet.autoResolveScore);
                }, 0);

                if (entry.highestAttackingScore > 1.25 * enemy.defensiveScore) {
                    entry.vulnerableEnemyPlanets.push(enemy);
                } else if (enemy.attackingScore * 1.25 > entry.totalDefensiveScore) {
                    entry.threateningPlanets.push(enemy);
                }
            });

            info.planets.push(entry);
        });

        return info;
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ─── planBuildInfrastructure(info) ───────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    planBuildInfrastructure(info) {
        const money = this.faction.money;
        const planets = info.planets; // array of InfoPlanet
        // Sort our worlds by income descending (so higher‐income worlds appear first)
        const byIncome = planets.slice().sort((a, b) => {
            const aInc = a.planetObj.income || 0;
            const bInc = b.planetObj.income || 0;
            return bInc - aInc;
        });

        // (A) If WE HAVE ZERO shipyards in our entire empire, build one on the safest/highest‐income world:
        if (info.planetsWithShipyards().length === 0) {
            // “Safer” means low inDangerScale; pick first safe world or else top income
            const safeEntry = byIncome.find(p => p.inDangerScale < 0.5) || byIncome[0];
            if (safeEntry) {
                const planet = safeEntry.planetObj;
                const builds = planet.builds;
                if (builds && builds.shipyardOptions.length) {
                    // Pick the highest‐level shipyard option we can afford
                    const opt = builds.shipyardOptions
                        .filter(o => ships[o].shipyardLevel <= builds.maxShipyardLevel)
                        .reverse()[0];
                    if (opt) {
                        const cost = ships[opt].cost;
                        return {
                            score: Infinity, // absolute top‐priority
                            description: `build a shipyard on ${planet.name} (no shipyards exist)`,
                            execute: () => {
                                this.faction.money += cost; // temporarily credit so buildShipyard returns actual cost
                                this.faction.money -= builds.buildShipyard(opt, this.faction.money);
                                return true;
                            }
                        };
                    }
                }
            }
            // If we couldn’t find a valid option, fall through to “no infra”
            return null;
        }

        // (B) If ANY of our worlds are endangered (inDangerScale ≥ 0.5) and have an open station slot → build a station
        const stationCandidates = [];
        for (const entry of planets) {
            const planet = entry.planetObj;
            const builds = planet.builds;
            if (!builds) continue;

            // Check: planet is threatened & has empty station slots & stationOptions is nonempty
            if (entry.inDangerScale >= 0.5
                && builds.stationSlots.includes(null)
                && builds.stationOptions.length) {
                const opt = builds.stationOptions[0];
                const cost = ships[opt].cost;
                // Score: (dangerScale × planetIncome) × 2  — this biases high‐income, heavily threatened worlds
                const score = (entry.inDangerScale * (planet.income || 1)) * 2;
                if (money >= cost) {
                    stationCandidates.push({ planet, builds, option: opt, score });
                }
            }
        }
        if (stationCandidates.length) {
            stationCandidates.sort((a, b) => b.score - a.score);
            const best = stationCandidates[0];
            return {
                score: best.score,
                description: `build station on ${best.planet.name}`,
                execute: () => {
                    this.faction.money -= best.builds.buildStation(best.option, this.faction.money);
                    return true;
                }
            };
        }

        // (C) Otherwise, if we already have ≥1 shipyard, consider building a second on a secure, high‐income world
        if (info.planetsWithShipyards().length > 0) {
            // Filter our worlds to those that: (1) have NO shipyard yet, (2) have shipyardOptions, (3) not already queueing a shipyard, (4) inDangerScale < 0.5
            const candidates = byIncome.filter(entry => {
                const planet = entry.planetObj;
                const builds = planet.builds;
                return builds
                    && builds.shipyard == null
                    && !builds.queue.some(q => q.type === BuildQueueItem.TYPE_SHIPYARD)
                    && builds.shipyardOptions.length > 0
                    && entry.inDangerScale < 0.5;
            });

            if (candidates.length) {
                const entry = candidates[0];
                const planet = entry.planetObj;
                const builds = planet.builds;
                // Pick best shipyard option possible
                const opt = builds.shipyardOptions
                    .filter(o => ships[o].shipyardLevel <= builds.maxShipyardLevel)
                    .reverse()[0];
                if (opt) {
                    const cost = ships[opt].cost;
                    if (money >= cost) {
                        // Score by planet’s income × 1.5
                        return {
                            score: (planet.income || 1) * 1.5,
                            description: `build second shipyard on ${planet.name}`,
                            execute: () => {
                                this.faction.money -= builds.buildShipyard(opt, this.faction.money);
                                return true;
                            }
                        };
                    }
                }
            }
        }

        // (D) No urgent infrastructure needed
        return null;
    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ─── planConsolidation(info) ─────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    planConsolidation(info) {
        // (A) MERGE: Only merge if the planet has absolutely no threats (threateningPlanets.length === 0)
        const mergeEntries = [];

        info.planets.forEach(entry => {
            // If this planet has any threatening planets, skip it
            if (entry.threateningPlanets.length > 0) return;

            const planet = entry.planetObj;
            const idleFleets = planet.fleets.filter(
                f => f.faction === this.faction && !f.inTransit
            );

            if (idleFleets.length > 2 && Math.random() > .5) {
                // Score merging by “# of idle fleets × 0.5”
                mergeEntries.push({
                    planet,
                    count: idleFleets.length,
                    score: idleFleets.length * 0.5
                });
            }
        });

        if (mergeEntries.length) {
            mergeEntries.sort((a, b) => b.count - a.count);
            const best = mergeEntries[0];
            const planet = best.planet;

            return {
                score: best.score,
                description: `merge fleets on ${planet.name}`,
                execute: () => {
                    // 1) Collect all ships + heroes from idle fleets on this planet
                    const entries = [];
                    planet.fleets.forEach(fleet => {
                        if (fleet.faction === this.faction && !fleet.inTransit) {
                            fleet.__ships.forEach(s => entries.push({ type: 'ship', data: s }));
                            fleet.heroUnits.forEach((val, key) =>
                                entries.push({ type: 'hero', data: [key, val] })
                            );
                        }
                    });
                    // Shuffle
                    entries.sort(() => 0.5 - Math.random());

                    // 2) Compute total population
                    let totalPop = 0;
                    entries.forEach(e => {
                        if (e.type === 'ship') {
                            totalPop += ships[e.data].population;
                        } else {
                            totalPop += ships[e.data[1]].population;
                        }
                    });

                    // 3) Create as many new fleets as needed (≤300 pop each)
                    const newFleets = [];
                    for (let i = 0; i < Math.ceil(totalPop / 300); i++) {
                        const f = new Fleet();
                        f.faction = this.faction;
                        f.planet = planet;
                        newFleets.push(f);
                    }

                    // 4) Distribute entries back into newFleets
                    while (entries.length) {
                        const e = entries.pop();
                        const popCost = e.type === 'ship'
                            ? ships[e.data].population
                            : ships[e.data[1]].population;

                        let target = newFleets.find(f => f.population + popCost <= 300);
                        if (!target) {
                            target = new Fleet();
                            target.faction = this.faction;
                            target.planet = planet;
                            newFleets.push(target);
                        }
                        if (e.type === 'ship') {
                            target.add(e.data);
                        } else {
                            target.addHero(e.data[0], e.data[1]);
                        }
                    }

                    // 5) Replace old idle fleets on this planet
                    planet.fleets = planet.fleets.filter(
                        f => f.faction !== this.faction || f.inTransit
                    );
                    planet.fleets.push(...newFleets);
                    return true;
                }
            };
        }

        // (B) FORWARD‐DEPLOY: If no merges needed, send idle fleets to the single most endangered planet,
        // but only gather fleets from “safe” planets (threateningPlanets.length === 0)

        // 1) Identify the single most endangered planet by (totalIncoming ÷ totalDefensiveScore)
        const endangered = info.planets
            .map(entry => {
                const totalIncoming = entry.threateningPlanets
                    .reduce((sum, e) => sum + e.attackingScore, 0);
                const ratio = totalIncoming / (entry.totalDefensiveScore || 1);
                return { entry, ratio };
            })
            .filter(x => x.ratio > 0)
            .sort((a, b) => b.ratio - a.ratio);

        if (!endangered.length) return null;
        const targetInfo = endangered[0].entry;
        const targetPlanet = targetInfo.planetObj;

        // 2) Gather ALL idle fleets, but only from planets with zero threats
        const idleFleets = [];
        this.campaign.planets.forEach(p => {
            // Find this planet’s InfoPlanet entry
            const pInfo = info.planets.find(pi => pi.planetObj === p);
            if (!pInfo || pInfo.threateningPlanets.length > 0) return;

            p.fleets.forEach(f => {
                if (f.faction === this.faction && !f.inTransit) {
                    idleFleets.push({ fleet: f, from: p });
                }
            });
        });

        if (!idleFleets.length) return null;

        // Score = (dangerRatio × targetIncome)
        const score = endangered[0].ratio * (targetPlanet.income || 1);

        return {
            score,
            description: `send idle fleets to ${targetPlanet.name} (endangered)`,
            execute: () => {
                idleFleets.forEach(({ fleet, from }) => {
                    if (Math.random() > .667) {
                        return;
                    }

                    fleet.transitTo(this.campaign.findRoute(from, targetPlanet));
                });
                return true;
            }
        };
    }


    // ─────────────────────────────────────────────────────────────────────────────
    // ─── planAttack(info) ────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    planAttack(info) {
        const options = [];

        info.planets.forEach(pInfo => {
            // Only consider attack if there is at least one vulnerable enemy planet
            if (pInfo.vulnerableEnemyPlanets.length === 0) {
                return;
            }

            // Pick the enemy with the lowest defensiveScore among those flagged as “vulnerable”
            pInfo.vulnerableEnemyPlanets.sort((a, b) => a.defensiveScore - b.defensiveScore);
            const enemyEntry = pInfo.vulnerableEnemyPlanets[0];
            const targetPlanet = enemyEntry.planetObj;

            // Now find our single strongest idle fleet on this planet
            const home = pInfo.planetObj;
            const myFleets = home.fleets
                .filter(f => f.faction === this.faction && !f.inTransit)
                .sort((a, b) => b.autoResolveScore - a.autoResolveScore);
            if (!myFleets.length) return;

            const bestFleet = myFleets[0];
            const myPower = bestFleet.autoResolveScore;
            const enemyDefense = enemyEntry.defensiveScore;

            // Only attack if myPower ≥ 1.2 × enemyDefense
            if (myPower < enemyDefense * 1.2) {
                return;
            }

            // Score = (myPower / (enemyDefense + 1)) × targetIncome
            const income = targetPlanet.income || 1;
            const rawScore = (myPower / (enemyDefense + 1)) * income;

            options.push({
                from: home,
                to: targetPlanet,
                fleet: bestFleet,
                score: rawScore
            });
        });

        if (!options.length || Math.random() > .25) return null;
        options.sort((a, b) => b.score - a.score);
        const best = options[0];

        return {
            score: best.score * .85,
            description: `attack ${best.to.name} from ${best.from.name}`,
            execute: () => {
                best.fleet.transitTo(this.campaign.findRoute(best.from, best.to));
                return true;
            }
        };
    }

}
