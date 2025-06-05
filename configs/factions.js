import { FactionConfig } from "./baseFactions.js";

/** @type {Object<string,FactionConfig>} */
const allFactions = {
    ...(await import("./factions/imperial.js")),
    ...(await import("./factions/criminals.js")),
    ...(await import("./factions/rebelHapan.js")),
    ...(await import("./factions/cloneWars.js")),
};

for (const key in allFactions) {
    allFactions[key].reverseLookupKey = key;
}

export default allFactions;