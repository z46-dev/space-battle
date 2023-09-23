import { default as imperialShips } from "./ships/empire.js";
import { default as rebelShips } from "./ships/rebel.js";
import { default as cisShips } from "./ships/CIS.js";
import { default as republicShips } from "./ships/republic.js";
import { default as huttShips } from "./ships/hutts.js";
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

const ships = {
    ...imperialShips,
    ...rebelShips,
    ...cisShips,
    ...republicShips,
    ...huttShips,
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