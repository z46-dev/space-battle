// If the faction has a capital, it overrides the default fleet population and income.
export class CapitalInfo {
    name = "Coruscant";
    fleetPopulation = 300;
    baseIncome = 3000;
}

export class Faction {
    id = 0;
    color = "#DDDDDD";
    name = "Generic Faction";
    key = "generic_faction";
    defaultStartingPlanets = [];

    additionalStartingUnits = null;

    /** @type {{id:number,ships:string[]}[]} */
    shipyardConfigs = [];

    /**
     * @type {CapitalInfo | null}
     */
    capitalPlanet = null;

    // Mutable
    money = 0;
    income = 0;

    /** @type {import("./FactionAI.js").default} */
    ai = null;

    /**
     * @param {import("./Campaign.js").default} campaign
     */
    AI(campaign) {
        // Find a planet whose owner is not this faction and is bordering a planet owned by this faction
        let sourcePlanet = null,
            targetPlanet = null;

        for (const planet of campaign.planets.values()) {
            if (planet.controllingFaction.id === this.id && planet.fleets.length > 0) {
                for (const neighborName of planet.connectingPlanets) {
                    const neighbor = campaign.getPlanet(neighborName);

                    if (neighbor.controllingFaction.id !== this.id) {
                        sourcePlanet = planet;
                        targetPlanet = neighbor;
                        break;
                    }
                }
            }
        }

        if (targetPlanet && Math.random() > .99) {
            console.log(`AI: ${this.name} is sending a fleet from ${sourcePlanet.name} to ${targetPlanet.name}`);
            sourcePlanet.fleets[0].transitTo(campaign.findRoute(sourcePlanet, targetPlanet));
        }
    }

    save() {
        return {
            id: this.id,
            income: this.income,
            money: this.money,
            name: this.name
        };
    }
}

/**
 * @type {Faction[]}
 */
const factions = [];

export default factions;