import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.CENTURION_ZANN = {
    name: "Centurion Class Battlecruiser",
    asset: "CENTURION.png",
    classification: shipTypes.SuperCapital,
    population: 42,
    size: 2000,
    cost: 9200,
    speed: 1,
    turnSpeed: .0025,
    shield: 30000,
    shieldRegen: 30,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 16; i ++) {
            output.push({
                x: -.02 - .02 * i,
                y: .9334 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.YELLOW_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .02 + .02 * i,
                y: .9334 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.YELLOW_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.05 - .01 * i,
                y: .6 - .08 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.YELLOW_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .05 + .01 * i,
                y: .6 - .08 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.YELLOW_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            });
        }

        for (let i = 0; i < 4; i ++) {
            const x = .025 + .075 * i;
            const y = .667 - .4 * i;

            for (let j = 0; j < 3; j ++) {
                const angle = Math.PI * 2 / 3 * j;
                const d = .02;
                const x2 = x + Math.cos(angle) * d;
                const y2 = y + Math.sin(angle) * d;

                const weapon = weapons.ASSAULT_PROTON_ROCKET;

                output.push({
                    x: x2,
                    y: y2,
                    weapon: weapon,
                    shotsAtOnce: 6,
                    shotDelay: 25,
                    launchAngle: Math.PI / 2
                }, {
                    x: -x2,
                    y: y2,
                    weapon: weapon,
                    shotsAtOnce: 6,
                    shotDelay: 25,
                    launchAngle: -Math.PI / 2
                });
            }
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "STARVIPERATTACKCRAFT_ZANN"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "AUZITUCKGUNSHIP_ZANN"
    }]
};

export default ships;