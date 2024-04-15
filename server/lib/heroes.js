const heroes = {
    ...(await import("./heroes/Republic.js")).default,
    ...(await import("./heroes/CIS.js")).default,
    ...(await import("./heroes/Empire.js")).default,
    ...(await import("./heroes/Rebel.js")).default,
    ...(await import("./heroes/Hutts.js")).default
};

for (const key in heroes) {
    heroes[key].key = key;
}

export default heroes;