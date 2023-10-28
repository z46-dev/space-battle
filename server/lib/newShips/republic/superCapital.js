import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.SECUTOR_REPUBLIC = {
    name: "Secutor-Class Star Destroyer",
    asset: "SECUTOR.png",
    classification: shipTypes.SuperCapital,
    population: 18,
    size: 1000,
    cost: 8900,
    speed: 2,
    turnSpeed: .01,
    shield: 14000,
    shieldRegen: 7,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 20; i ++) {
            output.push({
                x: -.025 - .01 * i,
                y: .7 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.BLUE_DOUBLE_LASER_CANNON
            }, {
                x: .025 + .01 * i,
                y: .7 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.BLUE_DOUBLE_LASER_CANNON
            }, {
                x: -.1 - .035 * i,
                y: .9 - .095 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .1 + .035 * i,
                y: .9 - .095 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "ARC170_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "YWING_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "NTB630_REPUBLIC"
    }]
};

export default ships;