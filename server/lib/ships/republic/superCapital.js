import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.SECUTOR_REPUBLIC = {
    name: "Secutor-Class Star Destroyer",
    asset: "SECUTOR.png",
    classification: shipTypes.SuperCapital,
    population: 55,
    size: 1334,
    cost: 8900,
    speed: 2,
    turnSpeed: .01,
    shield: 16000,
    shieldRegen: 7,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 20; i ++) {
            output.push({
                x: -.025 - .01 * i,
                y: .7 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.BLUE_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 60
            }, {
                x: .025 + .01 * i,
                y: .7 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.BLUE_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 60
            }, {
                x: -.1 - .035 * i,
                y: .9 - .095 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .1 + .035 * i,
                y: .9 - .095 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 2 | 0
            }
        }));
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

ships.SECUTOR_REPUBLIC = templates.superCapital.SECUTOR({
    color: "BLUE",
    fighter: "ARC170_REPUBLIC",
    interceptor: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC",
    heavyBomber: "NTB630_REPUBLIC"
});

ships.PRAETOR_REPUBLIC = {
    name: "Praetor Battlecruiser",
    asset: "PRAETOR.png",
    classification: shipTypes.SuperCapital,
    population: 75,
    size: 1750,
    cost: 9500,
    speed: .85,
    turnSpeed: .005,
    shield: 26000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 34; i ++) {
            output.push({
                x: -.03 - .028 * i,
                y: .925 - .05 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.BLUE_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .03 + .028 * i,
                y: .925 - .05 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.BLUE_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -.0075 - .028 * i,
                y: .915 - .05 * i,
                weapon: i % 2 ? weapons.BLUE_DOUBLE_TURBOLASER_CANNON : weapons.BLUE_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 60
            }, {
                x: .0075 + .028 * i,
                y: .915 - .05 * i,
                weapon: i % 2 ? weapons.BLUE_DOUBLE_TURBOLASER_CANNON : weapons.BLUE_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 60
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
                weapon: i % 2 ? weapons.ASSAULT_CONCUSSION_MISSILE : weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: x2 + d * Math.cos(angle),
                y: y + d * Math.sin(angle),
                weapon: i % 2 ? weapons.ASSAULT_CONCUSSION_MISSILE : weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 1.55 | 0
            }
        }));
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

ships.MAELSTROM_REPUBLIC = {
    name: "Maelstrom-Class Battlecruiser",
    asset: "MAELSTROM_BATTLECRUISER.png",
    classification: shipTypes.SuperCapital,
    population: 50,
    size: 1313,
    cost: 11200,
    speed: 2,
    turnSpeed: .01,
    shield: 16000,
    shieldRegen: 7,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.05 - .0375 * i,
                y: .95 - .175 * i,
                weapon: i % 2 ? weapons.TRIPLE_ION_CANNON_MEDIUM : weapons.BLUE_TRIPLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 60
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.23 - .02 * i,
                y: -.07 - .08 * i,
                weapon: i % 2 ? weapons.BLUE_DOUBLE_TURBOLASER_CANNON : weapons.ASSAULT_PROTON_ROCKET,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.09,
                y: -.2 - .1 * i,
                weapon: weapons.BLUE_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0, l = output.length; i < l; i ++) {
            output.push({
                ...structuredClone(output[i]),
                x: -output[i].x
            });
        }

        output.push({
            x: 0,
            y: .95,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 6,
            shotDelay: 150
        });

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 4 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "V19TORRENT_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "YWING_REPUBLIC"
    }]
};

ships.PROCURATOR_REPUBLIC = {
    name: "Procurator Battlecruiser",
    asset: "PROCURATOR_BATTLECRUISER.png",
    classification: shipTypes.SuperCapital,
    population: 50,
    size: 1313,
    cost: 11200,
    speed: 2,
    turnSpeed: .008,
    shield: 18300,
    shieldRegen: 18,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 12; i ++) {
            output.push({
                x: -.0875 - .04 * i,
                y: .875 - .125 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.ASSAULT_PROTON_ROCKET,
                shotsAtOnce: i % 2 ? 2 : 4,
                shotDelay: 60
            });
        }

        for (let i = 0; i < 5; i ++) {
            const x = -.1 - .06 * i;
            const y = .4 - .2 * i;

            for (let j = 0; j < 4; j ++) {
                const angle = Math.PI * 2 * j / 4;

                output.push({
                    x: x + .01 * Math.cos(angle),
                    y: y + .01 * Math.sin(angle),
                    weapon: weapons.ASSAULT_PROTON_TORPEDO,
                    shotsAtOnce: 2,
                    shotDelay: 60
                });
            }
        }

        for (let i = 0, l = output.length; i < l; i ++) {
            output.push({
                ...structuredClone(output[i]),
                x: -output[i].x
            });
        }

        output.push({
            x: 0,
            y: .95,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 6,
            shotDelay: 150
        });

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 6 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "V19TORRENT_REPUBLIC"
    }]
};

export default ships;