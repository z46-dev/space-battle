const heroes = {
    ...(await import("./heroes/Republic.js")).default,
    ...(await import("./heroes/CIS.js")).default,
    ...(await import("./heroes/Empire.js")).default
};

for (const key in heroes) {
    heroes[key].key = key;
}

export default heroes;