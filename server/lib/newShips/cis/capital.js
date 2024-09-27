import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PROVIDENCEDESTROYER_CIS = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE.png",
    classification: shipTypes.Capital,
    population: 24,
    size: 600,
    cost: 4250,
    speed: 4.5,
    turnSpeed: .006,
    shield: 5340,
    shieldRegen: 5,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: .1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: 0,
                y: .45 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.125,
                y: -.1 - .16 * i,
                weapon: weapons.RED_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 30
            }, {
                x: .125,
                y: -.1 - .16 * i,
                weapon: weapons.RED_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 30
            }, {
                x: -.09,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 30
            }, {
                x: .09,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 30
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "HYENABOMBER_CIS"
    }]
};

ships.LUCREHULKBATTLESHIP_CIS = {
    name: "Lucrehulk Battleship",
    asset: "LUCREHULKALT.png",
    classification: shipTypes.Capital,
    population: 50,
    size: 1500,
    cost: 14000,
    speed: .6,
    turnSpeed: .0025,
    shield: 25000,
    shieldRegen: 25,
    hardpoints: (function() {
        const output = [{
            x: -.1,
            y: .1,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 5,
            shotDelay: 250
        }, {
            x: .1,
            y: .1,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 5,
            shotDelay: 250
        }];

        for (let i = 3; i <= 33; i ++) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .7,
                y: Math.sin(angle) * .7 + .1,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: Math.cos(angle) * .6,
                y: Math.sin(angle) * .6 + .1,
                weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        for (let i = 3; i <= 33; i += 2) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .65,
                y: Math.sin(angle) * .65 + .1,
                weapon:  weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        for (let i = 0; i < 8; i ++) {
            const angle = Math.PI * 2 / 8 * i - Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .125,
                y: Math.sin(angle) * .125 + .1,
                weapon: [weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY, weapons.QUAD_ION_CANNON][i % 2],
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 2.25 | 0
            }
        }));
    })(),
    hangars: [{
        x: -.25,
        y: .85,
        maxSquadrons: 3,
        squadronSize: 10,
        reserveSize: 6,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: .25,
        y: .85,
        maxSquadrons: 3,
        squadronSize: 10,
        reserveSize: 6,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: -.25,
        y: .85,
        maxSquadrons: 6,
        squadronSize: 1,
        reserveSize: 12,
        squadronKey: "DROIDGUNSHIP_CIS",
        reload: 90
    }, {
        x: .25,
        y: .85,
        maxSquadrons: 6,
        squadronSize: 1,
        reserveSize: 12,
        squadronKey: "DROIDGUNSHIP_CIS",
        reload: 90
    }, {
        x: -.25,
        y: .85,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }, {
        x: .25,
        y: .85,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

ships.LUCREHULKAUXILIARYWARSHIP_CIS = {
    name: "Lucrehulk Auxiliary Warship",
    asset: "LUCREHULK3.png",
    classification: shipTypes.Capital,
    population: 45,
    size: 1400,
    cost: 11000,
    speed: .25,
    turnSpeed: .0015,
    shield: 18000,
    shieldRegen: 18,
    hardpoints: (function() {
        const output = [];

        for (let i = 3; i <= 33; i += 2) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .75,
                y: Math.sin(angle) * .75 + .05,
                weapon:  weapons.RED_QUAD_LASER_CANNON
            }, {
                x: Math.cos(angle) * .85,
                y: Math.sin(angle) * .85 + .05,
                weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY
            }, {
                x: Math.cos(angle) * .65,
                y: Math.sin(angle) * .65 + .05,
                weapon: weapons.QUAD_ION_CANNON
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 4
            }
        }));
    })(),
    hangars: [{
        x: -.25,
        y: .85,
        maxSquadrons: 3,
        squadronSize: 10,
        reserveSize: 6,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: .25,
        y: .85,
        maxSquadrons: 3,
        squadronSize: 10,
        reserveSize: 6,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: -.25,
        y: .85,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "HYENABOMBER_CIS"
    }, {
        x: .25,
        y: .85,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "HYENABOMBER_CIS"
    }],
    production: [{
        x: .25,
        y: .85,
        maxAlive: 2,
        reserve: 4,
        key: "C9979_CIS",
        cooldown: 250
    },{
        x: -.25,
        y: .85,
        maxAlive: 2,
        reserve: 4,
        key: "C9979_CIS",
        cooldown: 250
    }]
};

ships.DHOMNI_CIS = {
    name: "DH-Omni Support Vessel",
    asset: "DHOMNI.png",
    classification: shipTypes.Capital,
    population: 30,
    size: 875,
    cost: 3000,
    speed: 1.2,
    turnSpeed: .0075,
    shield: 6000,
    shieldRegen: 6,
    tenderAbility: {
        frequency: 2,
        power: .5
    },
    hardpoints: (function() {
        const output = [{
            x: -.15,
            y: .15,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 75
        }, {
            x: .15,
            y: .15,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 75
        }];

        const ringWeapons = [
            weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            weapons.RED_DOUBLE_TURBOLASER_CANNON,
            weapons.RED_LASER_CANNON,
            weapons.RED_LASER_CANNON,
            weapons.ION_CANNON_MEDIUM
        ];

        for (let i = 0; i < 5; i ++) {
            const angle = Math.PI * 2 / 10 * i - Math.PI / 2 + Math.PI / 10;

            output.push({
                x: -.4 - Math.cos(angle) * .5,
                y: Math.sin(angle) * .6,
                weapon: ringWeapons[i],
                shotsAtOnce: 3,
                shotDelay: 75
            }, {
                x: .4 + Math.cos(angle) * .5,
                y: Math.sin(angle) * .6,
                weapon: ringWeapons[i],
                shotsAtOnce: 3,
                shotDelay: 75
            });
        }

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: -.35,
                y: .5 - .5 * i,
                weapon: ringWeapons[i + 1],
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .35,
                y: .5 - .5 * i,
                weapon: ringWeapons[i + 1],
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 4
            }
        }));
    })(),
    hangars: [{
        x: -.35,
        y: .5,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: .35,
        y: .5,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: -.35,
        y: .5,
        maxSquadrons: 1,
        squadronSize: 1,
        reserveSize: 4,
        squadronKey: "DROIDGUNSHIP_CIS"
    }, {
        x: .35,
        y: .5,
        maxSquadrons: 1,
        squadronSize: 1,
        reserveSize: 4,
        squadronKey: "DROIDGUNSHIP_CIS"
    }],
    production: [{
        x: 0,
        y: 0,
        maxAlive: 1,
        reserve: 2,
        key: "C9979_CIS",
        cooldown: 250
    }]
};

export default ships;