import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.STALWART_CRUISER_OLDREP = {
    name: "Stalwart Cruiser",
    asset: "STALWART_CRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 18,
    size: 500,
    cost: 3250,
    speed: 4,
    turnSpeed: .0075,
    shield: 1850,
    shieldRegen: 1.85,
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
                health: e.weapon.health * 2 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
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

ships.ZENITH_CRUISER_OLDREP = {
    name: "Zenith Cruiser",
    asset: "ZENITHCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 18,
    size: 450,
    cost: 3540,
    speed: 4,
    turnSpeed: .0075,
    shield: 2000,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: .075,
        y: .8,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: -.075,
        y: .8,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: 0,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .125,
        y: -.7,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: -.125,
        y: -.7,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: 0,
        y: -.85,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.GREEN_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: -.5,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 6,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 3.5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 3,
        squadronKey: "AUREK_STRIKEFIGHTER_OLDREP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 3,
        squadronKey: "CHELA_BOMBER_OLDREP"
    }]
};

export default ships;