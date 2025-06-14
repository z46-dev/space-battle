import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.RUSUR_DUNGEON_SHIP_MANDO = {
    name: "Rusur Dungeon Ship",
    asset: "RUSUR_DUNGEON_SHIP.png",
    classification: shipTypes.Capital,
    population: 20,
    size: 800,
    cost: 3000,
    speed: 3,
    turnSpeed: .015,
    shield: 2500,
    shieldRegen: 2.5,
    tenderAbility: {
        frequency: 1.25,
        power: .2
    },
    hardpoints: (function () {
        const points = [{
            x: -.126,
            y: .975
        }, {
            x: -.111,
            y: .542
        }, {
            x: -.115,
            y: .298
        }, {
            x: -.100,
            y: .052
        }, {
            x: -.097,
            y: -.383
        }, {
            x: -.034,
            y: -.108
        }];

        for (let i = 0, l = points.length; i < l; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.BLUE_LASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.BLUE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.ION_CANNON_HEAVY,
            shotsAtOnce: 2,
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
        reserveSize: 3,
        squadronKey: "BASILISK_FIGHTER_MANDO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "BASILISK_BOMBER_MANDO"
    }]
};

ships.KYRAMUD_BATTLESHIP_MANDO = {
    name: "Kyramud Battleship",
    asset: "KYRAMUD_BATTLESHIP.png",
    classification: shipTypes.Capital,
    population: 30,
    size: 1250,
    cost: 4500,
    speed: 2.5,
    turnSpeed: .015,
    shield: 4000,
    shieldRegen: 4,
    hardpoints: (function () {
        const points = [{
            x: -.099,
            y: .931
        }, {
            x: -.316,
            y: .753
        }, {
            x: -.056,
            y: .478
        }, {
            x: -.386,
            y: .469
        }, {
            x: -.382,
            y: -.272
        }, {
            x: -.235,
            y: .137
        }, {
            x: -.079,
            y: -.404
        }, {
            x: -.273,
            y: -.551
        }, {
            x: -.060,
            y: -.727
        }, {
            x: -.113,
            y: -.841
        }, {
            x: -.501,
            y: .042
        }, {
            x: -.747,
            y: .048
        }];

        for (let i = 0, l = points.length; i < l; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.BLUE_RAPID_LASER_CANNON,
            shotsAtOnce: 4,
            shotDelay: 100
        }];

        const output = [];

        for (let i = 0, l = points.length; i < l; i++) {
            output.push({
                ...points[i],
                ...selections[i % selections.length]
            });
        }

        for (const point of [{
            x: -.056,
            y: .392
        }, {
            x: .031,
            y: .349
        }, {
            x: -.041,
            y: .247
        }, {
            x: .035,
            y: .058
        }, {
            x: -.060,
            y: .123
        }, {
            x: .020,
            y: -.070
        }, {
            x: -.058,
            y: -.026
        }, {
            x: .026,
            y: .175
        }]) { 
            output.push({
                ...point,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 2,
                shotDelay: Math.random() * 1000
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
        reserveSize: 3,
        squadronKey: "BASILISK_FIGHTER_MANDO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "DAVAAB_INTERCEPTOR_MANDO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "BASILISK_BOMBER_MANDO"
    }]
};

export default ships;