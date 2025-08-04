import { FactionConfig } from "./baseFactions.js";

const allFactions = {
    ...(await import("./factions/imperial.js")),
    ...(await import("./factions/criminals.js")),
    ...(await import("./factions/rebelHapan.js")),
    ...(await import("./factions/cloneWars.js")),
    ...(await import("./factions/sithWars.js"))
};

for (const key in allFactions) {
    allFactions[key].reverseLookupKey = key;
}

export default allFactions;