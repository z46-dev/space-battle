import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.KANDOSII_DREADNOUGHT_MANDO = {
    name: "Kandosii Dreadnought",
    asset: "KANDOSII_DREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 60,
    size: 1600,
    cost: 15000,
    speed: 2,
    turnSpeed: .008,
    shield: 10000,
    shieldRegen: 10,
    hardpoints: (function () {
        const points = [{
            x: -.046,
            y: .914
        }, {
            x: -.085,
            y: .545
        }, {
            x: -.040,
            y: .746
        }, {
            x: -.083,
            y: .348
        }, {
            x: -.104,
            y: .101
        }, {
            x: -.105,
            y: .028
        }, {
            x: -.093,
            y: -.119
        }, {
            x: -.093,
            y: -.191
        }, {
            x: -.134,
            y: -.179
        }, {
            x: -.128,
            y: -.100
        }, {
            x: -.131,
            y: .014
        }, {
            x: -.131,
            y: .125
        }, {
            x: -.125,
            y: -.340
        }, {
            x: -.058,
            y: -.412
        }, {
            x: -.291,
            y: -.787
        }, {
            x: -.239,
            y: -.528
        }, {
            x: -.044,
            y: -.038
        }, {
            x: -.102,
            y: -.039
        }];

        for (let i = 0, l = points.length; i < l; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.ASSAULT_PROTON_ROCKET,
            shotsAtOnce: 4,
            shotDelay: 300
        }];

        const output = [];

        for (let i = 0, l = points.length; i < l; i++) {
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
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "BASILISK_FIGHTER_MANDO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "DAVAAB_INTERCEPTOR_MANDO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "BASILISK_BOMBER_MANDO"
    }]
};

export default ships;