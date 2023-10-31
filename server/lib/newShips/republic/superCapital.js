import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.SECUTOR_REPUBLIC = {
    name: "Secutor-Class Star Destroyer",
    asset: "SECUTOR.png",
    classification: shipTypes.SuperCapital,
    population: 18,
    size: 1334,
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
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "V19TORRENT_REPUBLIC"
    }]
};

ships.PRAETOR_REPUBLIC = {
    name: "Praetor Battlecruiser",
    asset: "PRAETOR.png",
    classification: shipTypes.SuperCapital,
    population: 18,
    size: 1750,
    cost: 9500,
    speed: .85,
    turnSpeed: .005,
    shield: 30000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 34; i ++) {
            output.push({
                x: -.03 - .028 * i,
                y: .925 - .05 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.BLUE_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: .03 + .028 * i,
                y: .925 - .05 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.BLUE_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.0075 - .028 * i,
                y: .915 - .05 * i,
                weapon: i % 2 ? weapons.BLUE_DOUBLE_TURBOLASER_CANNON : weapons.BLUE_QUAD_LASER_CANNON
            }, {
                x: .0075 + .028 * i,
                y: .915 - .05 * i,
                weapon: i % 2 ? weapons.BLUE_DOUBLE_TURBOLASER_CANNON : weapons.BLUE_QUAD_LASER_CANNON
            });
        }

        for (let i = 0; i < 14; i ++) {
            const angle = Math.PI * 2 * i / 8;

            const x1 = -.5;
            const x2 = .5;
            const y = -.3;
            const d = .15;

            output.push({
                x: x1 + d * Math.cos(angle),
                y: y + d * Math.sin(angle),
                weapon: i % 2 ? weapons.ASSAULT_CONCUSSION_MISSILE : weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY
            }, {
                x: x2 + d * Math.cos(angle),
                y: y + d * Math.sin(angle),
                weapon: i % 2 ? weapons.ASSAULT_CONCUSSION_MISSILE : weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "V19TORRENT_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "NTB630_REPUBLIC"
    }]
};

export default ships;