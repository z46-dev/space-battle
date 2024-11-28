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

    /**
     * @type {CapitalInfo | null}
     */
    capitalPlanet = null;

    campaignTypes = [-1];

    // Mutable
    money = 0;

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

        if (targetPlanet && Math.random() > .65) {
            console.log(`AI: ${this.name} is sending a fleet from ${sourcePlanet.name} to ${targetPlanet.name}`);
            sourcePlanet.fleets[0].transitTo(campaign.findRoute(sourcePlanet, targetPlanet));
        }
    }
}

/**
 * @type {Faction[]}
 */
const factions = [];

const data = await (await fetch("./assets/factions.json")).json();

for (const factionData of data) {
    const faction = new Faction();
    faction.id = factionData.id;
    faction.color = factionData.color;
    faction.name = factionData.name;
    faction.key = factionData.key;
    faction.campaignTypes = factionData.campaignTypes;

    if (factionData.planets && factionData.planets.length > 0) {
        faction.defaultStartingPlanets = factionData.planets;
    }

    if (factionData.capital) {
        faction.capitalPlanet = new CapitalInfo();
        faction.capitalPlanet.name = factionData.capital.name;
        faction.capitalPlanet.fleetPopulation = factionData.capital.fleetPopulation;
        faction.capitalPlanet.baseIncome = factionData.capital.baseIncome;
    }

    factions.push(faction);
}

export default factions;