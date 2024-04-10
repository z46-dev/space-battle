import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.DORBULLA_HUTT = {
    name: "Dor'bulla Warship",
    asset: "dorbulla.png",
    classification: shipTypes.SuperCapital,
    population: 140,
    size: 3540,
    cost: 19920,
    speed: 1.25,
    turnSpeed: .003,
    shield: 42500,
    shieldRegen: 500,
    hardpoints: (function() {
        const output = [];
        const myWeapons = [
            weapons.ASSAULT_CONCUSSION_MISSILE,
            weapons.QUAD_ION_CANNON_HEAVY,
            weapons.PURPLE_QUAD_TURBOLASER_CANNON_HEAVY,
            weapons.PURPLE_RAPID_FIGHTER_LASER_CANNON,
            weapons.PURPLE_DOUBLE_LASER_CANNON_HEAVY
        ];

        for (let i = 0; i < 5; i ++) {
            const x = .1 + .02 * i;
            const y = .6 - .3 * i;

            for (let j = 0; j < 5; j ++) {
                const angle = Math.PI * 2 / 5 * j;
                const d = .02;
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
                reload: hp.weapon.reload * .5
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
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 7,
        squadronKey: "SKIPRAYBLASTBOAT_HUTT"
    }]
};

export default ships;