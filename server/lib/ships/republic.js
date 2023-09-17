import { shipTypes } from "../constants.js";
import { DOUBLE_ION_CANNON_MEDIUM, ASSAULT_PROTON_TORPEDO, BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY, BLUE_DOUBLE_LASER_CANNON, ASSAULT_CONCUSSION_MISSILE, BLUE_LASER_CANNON_HEAVY, BLUE_DOUBLE_LASER_CANNON_HEAVY, BLUE_FIGHTER_LASER_CANNON, FIGHTER_PROTON_TORPEDO, FIGHTER_ION_CANNON, FIGHTER_PROTON_BOMB, FIGHTER_PROTON_ROCKET_AOE, BLUE_RAPID_FIGHTER_LASER_CANNON } from "../weapons.js";

const ships = {};

ships.VENATOR = {
    name: "Venator-Class Star Destroyer",
    asset: "VENATOR.png",
    classification: shipTypes.Capital,
    size: 500,
    cost: 4000,
    speed: 4,
    turnSpeed: .01,
    shield: 3800,
    shieldRegen: 3,
    hardpoints: (function() {
        const output = [{
            x: -.4,
            y: -.55,
            weapon: ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: .4,
            y: -.55,
            weapon: ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: -.275,
            y: .05,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: .275,
            y: .05,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: -.25,
            y: .225,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: .25,
            y: .225,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1 - .025 * i,
                y: .7 - .1 * i,
                weapon: BLUE_DOUBLE_LASER_CANNON
            }, {
                x: .1 + .025 * i,
                y: .7 - .1 * i,
                weapon: BLUE_DOUBLE_LASER_CANNON
            }, {
                x: -.175,
                y: 0 - .155 * i,
                weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .15,
                y: 0 - .155 * i,
                weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "ARC170"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "REPUBLIC_YWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 1,
        squadronKey: "NTB630"
    }]
};

ships.ACCLIMATOR = {
    name: "Acclimator Assault Cruiser",
    asset: "ACCLIMATOR.png",
    classification: shipTypes.HeavyFrigate,
    size: 300,
    cost: 2500,
    speed: 3,
    turnSpeed: .01,
    shield: 2780,
    shieldRegen: 1.5,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .85,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 100
        }, {
            x: -.55,
            y: -.35,
            weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY
        }, {
            x: .55,
            y: -.35,
            weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2 - .1 * i,
                y: .6 - .225 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : BLUE_DOUBLE_LASER_CANNON_HEAVY
            }, {
                x: .2 + .1 * i,
                y: .6 - .225 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : BLUE_DOUBLE_LASER_CANNON_HEAVY
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "ARC170"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "REPUBLIC_YWING"
    }]
};

ships.ARC170 = {
    name: "ARC-170",
    asset: "ARC170.png",
    classification: shipTypes.Fighter,
    size: 20,
    cost: 6,
    speed: 18,
    turnSpeed: .1,
    shield: 15,
    shieldRegen: 0.5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: BLUE_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...BLUE_LASER_CANNON_HEAVY,
            reload: BLUE_LASER_CANNON_HEAVY.reload * 1.5
        }
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.REPUBLIC_YWING = {
    name: "Republic Y-Wing",
    asset: "YWING.png",
    classification: shipTypes.Bomber,
    size: 22,
    cost: 8,
    speed: 14,
    turnSpeed: .025,
    shield: 25,
    shieldRegen: 0.5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: BLUE_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_ION_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: FIGHTER_PROTON_BOMB,
        shotsAtOnce: 3,
        shotDelay: 200
    }, {
        x: .5,
        y: 0,
        weapon: FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 200
    }]
};

ships.NTB630 = {
    name: "NTB-630 Naval Bomber",
    asset: "NTB630.png",
    classification: shipTypes.Bomber,
    size: 26,
    cost: 12,
    speed: 12,
    turnSpeed: .05,
    shield: 50,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: BLUE_DOUBLE_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: BLUE_RAPID_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_BOMB,
        shotsAtOnce: 4,
        shotDelay: 200
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_ROCKET_AOE,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 200
    }]
};

export default ships;