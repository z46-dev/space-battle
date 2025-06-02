const factions = {
    ...(await import("./factions/imperial.js")),
    ...(await import("./factions/criminals.js")),
    ...(await import("./factions/rebelHapan.js")),
    ...(await import("./factions/cloneWars.js")),
};

export default factions;