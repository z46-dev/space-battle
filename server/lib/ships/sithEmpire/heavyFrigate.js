import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.SITH_HEAVY_CARRIER_SITHEMP = {
    name: "Sith Heavy Carrier",
    asset: "SITH_HEAVY_CARRIER.png",
    classification: shipTypes.HeavyFrigate,
    population: 12,
    size: 500,
    cost: 1000,
    speed: 3,
    turnSpeed: .018,
    shield: 0,
    shieldRegen: 0,
    hardpoints: (function () {
        const points = [{
            x: -.171,
            y: .508
        }, {
            x: -.172,
            y: .345
        }, {
            x: -.176,
            y: .006
        }, {
            x: -.175,
            y: -.160
        }, {
            x: -.172,
            y: -.502
        }, {
            x: -.178,
            y: -.664
        }, {
            x: -.056,
            y: .560
        }, {
            x: -.061,
            y: -.472
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.RED_DOUBLE_LASER_CANNON_HEAVY
        }, {
            weapon: weapons.RED_DOUBLE_LASER_CANNON
        }, {
            weapon: weapons.RED_TURBOLASER_CANNON
        }, {
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
        }];

        const output = [];

        for (let i = 0, n = points.length; i < n; i++) {
            output.push({
                ...points[i],
                ...selections[i % selections.length]
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.25 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "SITH_FIGHTER_SITHEMP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "SITH_BOMBER_SITHEMP"
    }]
};

ships.SUPREMACY_ATTACK_SHIP_SITHEMP = {
    name: "Supremacy Attack Ship",
    asset: "SUPREMACY_ATTACK_SHIP.png",
    classification: shipTypes.HeavyFrigate,
    population: 18,
    size: 700,
    cost: 2500,
    speed: 3,
    turnSpeed: .0125,
    shield: 1000,
    shieldRegen: 1,
    hardpoints: (function () {
        const points = [{
            x: -.063,
            y: .751
        }, {
            x: -.087,
            y: .600
        }, {
            x: -.115,
            y: .341
        }, {
            x: -.106,
            y: .074
        }, {
            x: -.114,
            y: -.182
        }, {
            x: -.040,
            y: -.286
        }, {
            x: -.123,
            y: -.487
        }, {
            x: -.078,
            y: -.689
        }, {
            x: -.038,
            y: -.847
        }, {
            x: -.146,
            y: -.327
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.RED_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.RED_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 1500
        }];

        const output = [];

        for (let i = 0, n = points.length; i < n; i++) {
            output.push({
                ...points[i],
                ...selections[i % selections.length]
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 1.65 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "SITH_FIGHTER_SITHEMP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "SITH_BOMBER_SITHEMP"
    }]
};

export default ships;