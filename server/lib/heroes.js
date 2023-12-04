const heroes = {
    ...(await import("./heroes/CIS.js")).default,
};

export default heroes;