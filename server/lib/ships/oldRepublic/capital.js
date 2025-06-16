import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.STALWART_CRUISER_OLDREP = {
    name: "Stalwart Cruiser",
    asset: "STALWART_CRUISER.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 550,
    cost: 3250,
    speed: 4,
    turnSpeed: .0075,
    shield: 2400,
    shieldRegen: 2.4,
    hardpoints: (function () {
        const points = [{
            x: -.062,
            y: .861
        }, {
            x: -.141,
            y: .534
        }, {
            x: -.213,
            y: .246
        }, {
            x: -.280,
            y: -.100
        }, {
            x: -.135,
            y: .078
        }, {
            x: -.140,
            y: -.282
        }, {
            x: -.295,
            y: -.707
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.GREEN_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 250
        }, {
            weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.GREEN_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            weapon: weapons.ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 250
        }, {
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 300
        }]

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
        maxSquadrons: 2,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "AUREK_STRIKEFIGHTER_OLDREP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: "CHELA_BOMBER_OLDREP"
    }]
};

ships.SWIFTSURE_CRUISER_I_OLDREP = {
    name: "Swiftsure Cruiser I",
    asset: "SWIFTSURE_CRUISER.png",
    classification: shipTypes.Capital,
    population: 23,
    size: 650,
    cost: 6000,
    speed: 3,
    turnSpeed: .005,
    shield: 7500,
    shieldRegen: 7.5,
    hardpoints: (function () {
        const points = [{
            x: -.060,
            y: .927
        }, {
            x: -.241,
            y: .924
        }, {
            x: -.346,
            y: .802
        }, {
            x: -.530,
            y: .704
        }, {
            x: -.708,
            y: .510
        }, {
            x: -.846,
            y: .206
        }, {
            x: -.864,
            y: .028
        }, {
            x: -.831,
            y: -.226
        }, {
            x: -.659,
            y: -.530
        }, {
            x: -.191,
            y: -.843
        }, {
            x: -.387,
            y: .039
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.GREEN_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 250
        }, {
            weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.GREEN_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            weapon: weapons.ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 250
        }, {
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 300
        }]

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
                health: e.weapon.health * 3.25 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: "AUREK_STRIKEFIGHTER_OLDREP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "CHELA_BOMBER_OLDREP"
    }]
};

ships.VALOR_CRUISER_OLDREP = {
    name: "Valor Cruiser",
    asset: "VALORCRUISER.png",
    classification: shipTypes.Capital,
    population: 23,
    size: 500,
    cost: 5400,
    speed: 3.5,
    turnSpeed: .005,
    shield: 6200,
    shieldRegen: 6.2,
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 5; i++) {
            output.push({
                x: -.1 - .05 * Math.pow(i, 1.035),
                y: .9 - .25 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .1 + .05 * Math.pow(i, 1.035),
                y: .9 - .25 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: -.05 - .05 * Math.pow(i, 1.05),
                y: -.9 + .25 * i,
                weapon: i % 2 === 0 ? weapons.DOUBLE_ION_CANNON : weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .05 + .05 * Math.pow(i, 1.05),
                y: -.9 + .25 * i,
                weapon: i % 2 === 0 ? weapons.DOUBLE_ION_CANNON : weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            });
        }

        for (let i = 0; i < output.length; i++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 3 | 0
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "AUREK_STRIKEFIGHTER_OLDREP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 3,
        squadronKey: "CHELA_BOMBER_OLDREP"
    }]
};

export default ships;