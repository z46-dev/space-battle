import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.DORBULLA_HUTT = {
    name: "Dor'bulla Warship",
    asset: "dorbulla.png",
    classification: shipTypes.SuperCapital,
    population: 140,
    size: 3000,
    cost: 26000,
    speed: 1.25,
    turnSpeed: .003,
    shield: 38900,
    shieldRegen: 38.9,
    hardpoints: (function () {
        const output = [];
        const myWeapons = [
            weapons.ASSAULT_CONCUSSION_MISSILE,
            weapons.QUAD_ION_CANNON_HEAVY,
            weapons.PURPLE_QUAD_TURBOLASER_CANNON_HEAVY,
            weapons.PURPLE_RAPID_FIGHTER_LASER_CANNON,
            weapons.PURPLE_DOUBLE_LASER_CANNON_HEAVY
        ];

        for (let i = 0; i < 7; i++) {
            const x = .1 + .01 * i;
            const y = .75 - .25 * i;

            for (let j = 0; j < 5; j++) {
                const angle = Math.PI * 2 / 5 * j;
                const d = .0125;
                const x2 = x + Math.cos(angle) * d;
                const y2 = y + Math.sin(angle) * d;
                const weapon = myWeapons[j];

                output.push({
                    x: x2,
                    y: y2,
                    weapon: weapon,
                    shotsAtOnce: 2,
                    shotDelay: 75
                }, {
                    x: -x2,
                    y: y2,
                    weapon: weapon,
                    shotsAtOnce: 2,
                    shotDelay: 75
                }, {
                    x: x2 - x,
                    y: y2 + .2,
                    weapon: weapon,
                    shotsAtOnce: 2,
                    shotDelay: 75
                });
            }
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 5,
                reload: hp.weapon.reload * .7
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 7,
        squadronKey: "A9VIGILANCE_HUTT"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 7,
        squadronKey: "SKIPRAYBLASTBOAT_HUTT"
    }]
};

ships.VORACIOUS_HUTT = {
    name: "Voracious Carrier",
    asset: "VORACIOUS.png",
    classification: shipTypes.SuperCapital,
    population: 70,
    size: 1300,
    cost: 12000,
    speed: 3,
    turnSpeed: .001,
    shield: 14000,
    shieldRegen: 14,
    hardpoints: (function () {
        const points = [{
            x: -.228,
            y: .429
        }, {
            x: -.228,
            y: .146
        }, {
            x: -.228,
            y: -.181
        }, {
            x: -.228,
            y: -.495
        }, {
            x: -.104,
            y: -.617
        }, {
            x: -.163,
            y: -.004
        }, {
            x: -.834,
            y: .564
        }, {
            x: -.573,
            y: .725
        }, {
            x: -.261,
            y: .595
        }, {
            x: -.148,
            y: .475
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const output = [];

        const selections = [
            weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
            weapons.PURPLE_DOUBLE_LASER_CANNON,
            weapons.PURPLE_QUAD_TURBOLASER_CANNON_HEAVY,
            weapons.QUAD_ION_CANNON,
            weapons.QUAD_ION_CANNON_HEAVY
        ];

        for (let i = 0; i < points.length; i++) {
            output.push({
                ...points[i],
                weapon: selections[i % selections.length],
                shotsAtOnce: 2,
                shotDelay: 150
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 8
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 6,
        squadronSize: 6,
        reserveSize: 12,
        squadronKey: "A9VIGILANCE_HUTT"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 12,
        squadronKey: "SKIPRAYBLASTBOAT_HUTT"
    }]
};

export default ships;