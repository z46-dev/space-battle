import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.STARBASE01_HAPAN = {
    name: "Hapan Mobile Starbase",
    asset: "HAPAN_STARBASE_01.png",
    classification: shipTypes.SpaceStation,
    population: 48,
    size: 550,
    cost: 12000,
    speed: 0,
    turnSpeed: .0001,
    shield: 12500,
    shieldRegen: 12,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 9; i ++) {
            const angle = i * Math.PI / 4.5;
            output.push({
                x: Math.cos(angle) * .8,
                y: Math.sin(angle) * .8,
                weapon: [weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY, weapons.BLUE_OCTUPLE_TURBOLASER_CANNON_HEAVY, weapons.BLUE_RAPID_LASER_CANNON][i % 3],
                shotsAtOnce: 2,
                shotDelay: 95
            }, {
                x: Math.cos(angle + Math.PI / 12) * .6,
                y: Math.sin(angle + Math.PI / 12) * .6,
                weapon: [weapons.OCTUPLE_ION_CANNON, weapons.DOUBLE_ION_CANNON, weapons.ASSAULT_PROTON_ROCKET][i % 3],
                shotsAtOnce: 2,
                shotDelay: 95
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 6
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 6,
        reserveSize: 12,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.STARBASE02_HAPAN = {
    name: "Hapan Starbase",
    asset: "HAPAN_STARBASE_02.png",
    classification: shipTypes.SpaceStation,
    population: 96,
    size: 1654,
    cost: 78430,
    speed: 0,
    turnSpeed: .00001,
    shield: 98750,
    shieldRegen: 97,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 24; i ++) {
            const angle = i * Math.PI / 12;
            output.push({
                x: Math.cos(angle) * .8,
                y: Math.sin(angle) * .8,
                weapon: [weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY, weapons.BLUE_OCTUPLE_TURBOLASER_CANNON_HEAVY, weapons.BLUE_RAPID_LASER_CANNON][i % 3],
                shotsAtOnce: 2,
                shotDelay: 95
            }, {
                x: Math.cos(angle + Math.PI / 12) * .6,
                y: Math.sin(angle + Math.PI / 12) * .6,
                weapon: [weapons.OCTUPLE_ION_CANNON, weapons.DOUBLE_ION_CANNON, weapons.ASSAULT_PROTON_ROCKET][i % 3],
                shotsAtOnce: 2,
                shotDelay: 95
            });
        }

        for (let i = 0; i < 3; i ++) {
            const angle = i * Math.PI / 1.5;
            output.push({
                x: Math.cos(angle) * .9,
                y: Math.sin(angle) * .9,
                weapon: weapons.ION_CANNON_ULTRA
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 9
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 6,
        reserveSize: 12,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

export default ships;