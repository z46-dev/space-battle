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

    // Mutable
    money = 0;
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