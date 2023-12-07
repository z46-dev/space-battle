const heroes = {
    ...(await import("./heroes/Republic.js")).default,
    ...(await import("./heroes/CIS.js")).default
};

for (const key in heroes) {
    heroes[key].key = key;
}

export default heroes;