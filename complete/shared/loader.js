import shipConfigs from "../../server/lib/ships.js";


const data = await (await fetch("./assets/master-config.json")).json();

export class PlanetConfig {
    id = 0;

    name = "";
    x = 0;
    y = 0;
    color = "";
    income = 0;
    shipyardLevel = 0;
    design = "";

    /** @type {string[]} */
    connections = [];
}

export class FactionConfig {
    id = 0;
    color = "";
    name = "";
    key = "";

    /** @type {string[]} */
    planets = [];

    capital = {
        name: "",
        fleetPopulation: 0,
        baseIncome: 0
    };

    /** @type {{id:number,ships:string[]}[]} */
    shipyards = [];
}

export class CampaignConfig {
    id = 0;
    name = "";

    /** @type {FactionConfig[]} */
    factions = [];
}

/** @type {PlanetConfig[]} */
export const planetConfig = data.planets;

for (let i = 0; i < planetConfig.length; i++) {
    planetConfig[i].id = i;
}

/** @type {CampaignConfig[]} */
export const campaignConfig = data.campaigns;

export class LoadedCampaign {
    /** @type {CampaignConfig} */
    campaign = null;

    /** @type {PlanetConfig[]} */
    planets = [];

    /** @type {string[][]} */
    connections = [];
}

/**
 * Load a campaign by name or ID
 * @param {number | string} nameOrID 
 * @returns {LoadedCampaign}
 */
export function loadCampaign(nameOrID) {
    const campaign = campaignConfig.find(c => c.id === nameOrID || c.name === nameOrID);

    if (!campaign) {
        throw new Error(`Campaign "${nameOrID}" not found`);
    }

    const output = {
        campaign: campaign,

        /** @type {PlanetConfig[]} */
        planets: [],

        connections: []
    };

    // Load only the planets needed for this campaign
    for (const faction of campaign.factions) {
        for (const planetName of faction.planets) {
            if (output.planets.indexOf(planetName) > -1) {
                throw new Error(`Planet "${planetName}" is duplicated in the campaign`);
            }

            output.planets.push(planetConfig.find(p => p.name === planetName));
        }

        for (const shipyard of faction.shipyards) {
            for (const ship of shipyard.ships) {
                if (!(ship in shipConfigs)) {
                    throw new Error(`Faction ${faction.name} invalid shipyard ship ${ship}`);
                }
            }
        }
    }

    // Now that we have the planets, we can load the connections
    for (const planet of output.planets) {
        for (const connection of planet.connections) {
            if (!output.planets.some(p => p.name === connection)) {
                continue;
            }

            const conn = [planet.name, connection].sort();

            if (!output.connections.some(c => c[0] === conn[0] && c[1] === conn[1])) {
                output.connections.push(conn);
            }
        }
    }

    // Check if there are any planets that are not connected
    for (const planet of output.planets) {
        if (!output.connections.some(c => c.includes(planet.name))) {
            throw new Error(`Planet "${planet.name}" is not connected to any other planet`);
        }
    }

    return output;
}