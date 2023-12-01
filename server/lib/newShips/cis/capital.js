import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PROVIDENCEDESTROYER_CIS = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 600,
    cost: 4000,
    speed: 4.5,
    turnSpeed: .0334,
    shield: 4100,
    shieldRegen: 3,
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
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.125,
                y: -.1 - .16 * i,
                weapon: weapons.RED_LASER_CANNON
            }, {
                x: .125,
                y: -.1 - .16 * i,
                weapon: weapons.RED_LASER_CANNON
            }, {
                x: -.09,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON
            }, {
                x: .09,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON
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

ships.LUCREHULK_CIS = {
    name: "Lucrehulk Carrier",
    asset: "LUCREHULK.png",
    classification: shipTypes.Capital,
    population: 54,
    size: 1500,
    cost: 20000,
    speed: .9,
    turnSpeed: .005,
    shield: 40000,
    shieldRegen: 8,
    hardpoints: (function() {
        const output = [{
            x: -.2,
            y: .2,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: .2,
            y: .2,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }];

        for (let i = 3; i <= 33; i ++) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .8,
                y: Math.sin(angle) * .8 + .15,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
            }, {
                x: Math.cos(angle) * .7,
                y: Math.sin(angle) * .7 + .15,
                weapon: i % 2 ? weapons.RED_QUAD_LASER_CANNON : weapons.ION_CANNON_MEDIUM // Giving triple m-ions is too op cuz it ruins the shields due to having 30 of these :skull:
            });
        }

        return output;
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

ships.LUCREHULK2_CIS = {
    name: "Lucrehulk Battleship",
    asset: "LUCREHULKALT.png",
    classification: shipTypes.Capital,
    population: 54,
    size: 1500,
    cost: 20000,
    speed: .9,
    turnSpeed: .005,
    shield: 56000,
    shieldRegen: 56,
    hardpoints: (function() {
        const output = [{
            x: -.1,
            y: .1,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: .1,
            y: .1,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }];

        for (let i = 3; i <= 33; i ++) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .7,
                y: Math.sin(angle) * .7 + .1,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: Math.cos(angle) * .6,
                y: Math.sin(angle) * .6 + .1,
                weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY
            });
        }

        for (let i = 3; i <= 33; i += 2) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .65,
                y: Math.sin(angle) * .65 + .1,
                weapon:  weapons.DOUBLE_ION_CANNON_HEAVY
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 2
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

ships.LUCREHULK3_CIS = {
    name: "Lucrehulk Auxiliary Warship",
    asset: "LUCREHULK3.png",
    classification: shipTypes.Capital,
    population: 50,
    size: 1400,
    cost: 15000,
    speed: .9,
    turnSpeed: .005,
    shield: 38000,
    shieldRegen: 38,
    hardpoints: (function() {
        const output = [];

        for (let i = 3; i <= 33; i += 2) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .85,
                y: Math.sin(angle) * .85 + .1,
                weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY
            }, {
                x: Math.cos(angle) * .65,
                y: Math.sin(angle) * .65 + .1,
                weapon: weapons.QUAD_ION_CANNON
            });
        }

        for (let i = 3; i <= 33; i ++) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .75,
                y: Math.sin(angle) * .75 + .1,
                weapon:  weapons.RED_QUAD_LASER_CANNON
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 2
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


export default ships;