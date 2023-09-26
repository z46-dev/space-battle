import { default as zannShips } from "./ships/zann.js";
import { default as customShips } from "./ships/custom.js";
import { shipTypes } from "./constants.js";
import { DUMMY_BLANK } from "./weapons.js";

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }
}

export const empire = {
    ...(await import("./newShips/empire/fighter.js")).default,
    ...(await import("./newShips/empire/corvette.js")).default,
    ...(await import("./newShips/empire/frigate.js")).default,
    ...(await import("./newShips/empire/heavyFrigate.js")).default,
    ...(await import("./newShips/empire/capital.js")).default,
    ...(await import("./newShips/empire/superCapital.js")).default
};

export const darkEmpire = {
    ...(await import("./newShips/darkEmpire/fighter.js")).default,
    ...(await import("./newShips/darkEmpire/corvette.js")).default,
    ...(await import("./newShips/darkEmpire/frigate.js")).default,
    ...(await import("./newShips/darkEmpire/heavyFrigate.js")).default,
    ...(await import("./newShips/darkEmpire/capital.js")).default,
    ...(await import("./newShips/darkEmpire/superCapital.js")).default
};

export const rebel = {
    ...(await import("./newShips/rebel/fighter.js")).default,
    ...(await import("./newShips/rebel/corvette.js")).default,
    ...(await import("./newShips/rebel/frigate.js")).default,
    ...(await import("./newShips/rebel/heavyFrigate.js")).default,
    ...(await import("./newShips/rebel/capital.js")).default,
    ...(await import("./newShips/rebel/superCapital.js")).default
};

export const republic = {
    ...(await import("./newShips/republic/fighter.js")).default,
    ...(await import("./newShips/republic/corvette.js")).default,
    ...(await import("./newShips/republic/frigate.js")).default,
    ...(await import("./newShips/republic/heavyFrigate.js")).default,
    ...(await import("./newShips/republic/capital.js")).default,
    ...(await import("./newShips/republic/superCapital.js")).default
};

export const cis = {
    ...(await import("./newShips/cis/fighter.js")).default,
    ...(await import("./newShips/cis/corvette.js")).default,
    ...(await import("./newShips/cis/frigate.js")).default,
    ...(await import("./newShips/cis/heavyFrigate.js")).default,
    ...(await import("./newShips/cis/capital.js")).default,
    ...(await import("./newShips/cis/superCapital.js")).default
};

export const hutts = {
    ...(await import("./newShips/hutts/fighter.js")).default,
    ...(await import("./newShips/hutts/corvette.js")).default,
    ...(await import("./newShips/hutts/frigate.js")).default,
    ...(await import("./newShips/hutts/heavyFrigate.js")).default,
    ...(await import("./newShips/hutts/capital.js")).default,
    ...(await import("./newShips/hutts/superCapital.js")).default
};

const ships = {
    ...empire,
    ...darkEmpire,
    ...rebel,
    ...republic,
    ...cis,
    ...hutts,
    ...zannShips,
    ...customShips
};

// TEST DUMMIES
ships.DUMMY_CARRIER = {
    name: "Dummy Carrier",
    asset: "QUASAR.png",
    classification: shipTypes.Frigate,
    size: 100,
    cost: 1,
    speed: .01,
    turnSpeed: .025,
    shield: 1000,
    shieldRegen: 10,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: DUMMY_BLANK
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 10,
        reserveSize: 9,
        squadronKey: "TIEBOMBER"
    }]
};

ships.DUMMY_TARGET = {
    name: "Dummy Target",
    asset: "MC80LIBERTY.png",
    classification: shipTypes.Capital,
    size: 300,
    cost: 1,
    speed: .01,
    turnSpeed: .025,
    shield: 1000,
    shieldRegen: 10,
    hardpoints: (function() {
        const weapon = DUMMY_BLANK; // Dummy weapon

        const output = [{
            x: -.2,
            y: -.4,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.3,
            y: -.2,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.2,
            y: .05,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.075,
            y: .1,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.05,
            y: .4,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.025,
            y: .7,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon,
                shotsAtOnce: 10,
                shotDelay: 40
            })
        }

        return output;
    })()
};

for (const ship in ships) {
    ships[ship].hardpoints.forEach(hardpoint => {
        const vector = new Vector(hardpoint.y, hardpoint.x);

        hardpoint.offset = vector.length;
        hardpoint.direction = vector.angle;
    });

    if (ships[ship].hangars instanceof Array) {
        ships[ship].hangars.forEach(hangar => {
            const vector = new Vector(hangar.y, hangar.x);

            hangar.offset = vector.length;
            hangar.direction = vector.angle;
        });
    }
}

export default ships;