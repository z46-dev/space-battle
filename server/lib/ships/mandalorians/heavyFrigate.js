import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.JEHAVEYIR_ASSAULT_SHIP_MANDO = {
    name: "Jehavey'ir Assault Ship",
    asset: "JEHAVEY-IR_ASSAULT_SHIP.png",
    classification: shipTypes.HeavyFrigate,
    population: 15,
    size: 450,
    cost: 1540,
    speed: 3,
    turnSpeed: .01,
    shield: 2000,
    shieldRegen: 2,
    hardpoints: [{
        x: -.525,
        y: -.607,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 300
    }, {
        x: .543,
        y: -.613,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 300
    }, {
        x: -.363,
        y: .356,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 300
    }, {
        x: .236,
        y: .356,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 400
    }, {
        x: -.255,
        y: .052,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 500
    }, {
        x: .128,
        y: -.658,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 600
    }, {
        x: -.189,
        y: -.458,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 700
    }, {
        x: .049,
        y: -.034,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 800
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "BASILISK_FIGHTER_MANDO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "BASILISK_BOMBER_MANDO"
    }]
};

ships.SHUKALAR_FRIGATE_MANDO = {
    name: "Shukalar Frigate",
    asset: "SHUKALAR_FRIGATE.png",
    classification: shipTypes.HeavyFrigate,
    population: 14,
    size: 500,
    cost: 1400,
    speed: 4,
    turnSpeed: .025,
    shield: 1500,
    shieldRegen: 1.5,
    hardpoints: (function () {
        const points = [{
            x: -.149,
            y: .673
        }, {
            x: -.361,
            y: .580
        }, {
            x: -.109,
            y: .302
        }, {
            x: -.137,
            y: -.197
        }, {
            x: -.408,
            y: -.521
        }, {
            x: -.232,
            y: -.380
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

        output.push({
            x: 0,
            y: .5,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 4,
            shotDelay: 250
        });

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 1.5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "BASILISK_FIGHTER_MANDO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "DAVAAB_INTERCEPTOR_MANDO"
    }]
};

export default ships;