import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PROVIDENCEDREADNOUGHT_CIS = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE_DREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 40,
    size: 1100,
    cost: 9700,
    speed: 2.25,
    turnSpeed: .003,
    shield: 12000,
    shieldRegen: 11,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: 0,
                y: .45 - .08 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: -.14,
                y: -.175 - .16 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .14,
                y: -.175 - .16 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.06,
                y: .5 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .06,
                y: .5 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: -.12,
                y: -.1 - .16 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON
            }, {
                x: .12,
                y: -.1 - .16 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON
            }, {
                x: -.085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: -.06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "HYENABOMBER_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

ships.RECUSANTDREADNOUGHT_CIS = {
    name: "Recusant Destroyer",
    asset: "RECUSANTDREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 34,
    size: 1200,
    cost: 6500,
    speed: 3,
    turnSpeed: .01,
    shield: 8500,
    shieldRegen: 8.5,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .95,
            weapon: {
                ...weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD,
                damage: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD.damage * 3,
                bypassShield: false
            }
        }, {
            x: 0,
            y: .9,
            weapon: {
                ...weapons.ION_CANNON_ULTRA,
                damage: weapons.ION_CANNON_ULTRA.damage * 3
            }
        }];

        for (let i = 0; i < 5; i ++) {
            output.push({
                x: -.05 - .0075 * i,
                y: .85 - .1 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .05 + .0075 * i,
                y: .85 - .1 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -.025 - .0075 * i,
                y: .3 - .075 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .025 + .0075 * i,
                y: .3 - .075 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.03 - .0075 * i,
                y: .9 - .125 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .03 + .0075 * i,
                y: .9 - .125 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -.03 - .0075 * i,
                y: .35 - .075 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .03 + .0075 * i,
                y: .35 - .075 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
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
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

ships.BULWARKII_CIS = {
    name: "Bulwark-II Battleship",
    asset: "BULWARKII.png",
    classification: shipTypes.SuperCapital,
    population: 40,
    size: 1000,
    cost: 7800,
    speed: 2,
    turnSpeed: .0025,
    shield: 18000,
    shieldRegen: 18,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 16; i ++) {
            const x = Math.sin(i / 4) * .075 + .1;
            const y = .85 - (i / 16) * 1.7;

            const weapon = [
                weapons.RED_TURBOLASER_CANNON_HEAVY,
                weapons.ION_CANNON_ULTRA,
                weapons.RED_TURBOLASER_CANNON_HEAVY,
                weapons.TRIPLE_ION_CANNON_MEDIUM
            ][i % 4];

            output.push({
                x,
                y,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -x,
                y,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 120
            });
        }

        for (let i = 0; i < 7; i ++) {
            const x = Math.sin(i) * .075 + .05;
            const y = .667 - .2 * i;

            for (let j = 0; j < 3; j ++) {
                const angle = Math.PI * 2 / 3 * j;
                const d = .02;
                const x2 = x + Math.cos(angle) * d;
                const y2 = y + Math.sin(angle) * d;

                const weapon = [
                    weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
                    weapons.TRIPLE_ION_CANNON,
                    weapons.RED_TRIPLE_LASER_CANNON
                ][j % 3];

                output.push({
                    x: x2,
                    y: y2,
                    weapon: weapon,
                    shotsAtOnce: 2,
                    shotDelay: 120
                }, {
                    x: -x2,
                    y: y2,
                    weapon: weapon,
                    shotsAtOnce: 2,
                    shotDelay: 120
                });
            }
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

export default ships;