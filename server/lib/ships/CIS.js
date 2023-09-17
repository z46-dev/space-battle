import { shipTypes } from "../constants.js";
import { DOUBLE_ION_CANNON, DOUBLE_ION_CANNON_MEDIUM, ION_CANNON_HEAVY, RED_DOUBLE_LASER_CANNON, RED_DOUBLE_TURBOLASER_CANNON, RED_DOUBLE_TURBOLASER_CANNON_HEAVY, RED_FIGHTER_LASER_CANNON, RED_LASER_CANNON, RED_QUAD_LASER_CANNON, FIGHTER_PROTON_BOMB, FIGHTER_PROTON_ROCKET, ASSAULT_CONCUSSION_MISSILE, FIGHTER_PROTON_ROCKET_AOE, ASSAULT_PROTON_TORPEDO, RED_TURBOLASER_CANNON_ULTRAHEAVY, TRIPLE_ION_CANNON_MEDIUM, RED_QUAD_TURBOLASER_CANNON } from "../weapons.js";

const ships = {};

ships.LUPUSMISSILEFRIGATE = {
    name: "Lupus Missile Frigate",
    asset: "LUPUSMISSILEFRIGATE.png",
    classification: shipTypes.Frigate,
    size: 85,
    cost: 400,
    speed: 9,
    turnSpeed: .045,
    shield: 1000,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: DOUBLE_ION_CANNON_MEDIUM
    }, {
        x: 0,
        y: 0,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_ROCKET_AOE,
        shotsAtOnce: 4,
        shotDelay: 120
    }]
};

ships.PROVIDENCEDESTROYER = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE.png",
    classification: shipTypes.Capital,
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
                weapon: ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: .1,
                y: .55 - .08 * i,
                weapon: ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: 0,
                y: .45 - .08 * i,
                weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.125,
                y: -.1 - .16 * i,
                weapon: RED_LASER_CANNON
            }, {
                x: .125,
                y: -.1 - .16 * i,
                weapon: RED_LASER_CANNON
            }, {
                x: -.09,
                y: -.175 - .16 * i,
                weapon: DOUBLE_ION_CANNON
            }, {
                x: .09,
                y: -.175 - .16 * i,
                weapon: DOUBLE_ION_CANNON
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
        squadronKey: "VULTUREDROID"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "HYENABOMBER"
    }]
};

ships.PROVIDENCEDREADNOUGHT = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE_DREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    size: 1100,
    cost: 9700,
    speed: 2.25,
    turnSpeed: .025,
    shield: 30000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1,
                y: .55 - .08 * i,
                weapon: ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .1,
                y: .55 - .08 * i,
                weapon: ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: 0,
                y: .45 - .08 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -.14,
                y: -.175 - .16 * i,
                weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .14,
                y: -.175 - .16 * i,
                weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.06,
                y: .5 - .08 * i,
                weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .06,
                y: .5 - .08 * i,
                weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: -.12,
                y: -.1 - .16 * i,
                weapon: RED_DOUBLE_LASER_CANNON
            }, {
                x: .12,
                y: -.1 - .16 * i,
                weapon: RED_DOUBLE_LASER_CANNON
            }, {
                x: -.085,
                y: -.175 - .16 * i,
                weapon: DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .085,
                y: -.175 - .16 * i,
                weapon: DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: -.06,
                y: -.1 - .16 * i,
                weapon: DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .06,
                y: -.1 - .16 * i,
                weapon: DOUBLE_ION_CANNON_MEDIUM
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "HYENABOMBER"
    }]
};

ships.MUNIFICENT = {
    name: "Munificent Frigate",
    asset: "MUNIFICENT.png",
    classification: shipTypes.HeavyFrigate,
    size: 300,
    cost: 2700,
    speed: 4,
    turnSpeed: .02,
    shield: 2400,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: RED_TURBOLASER_CANNON_ULTRAHEAVY
    }, {
        x: -.5,
        y: -.05,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .5,
        y: -.05,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.1,
        y: 0,
        weapon: TRIPLE_ION_CANNON_MEDIUM
    }, {
        x: .1,
        y: 0,
        weapon: TRIPLE_ION_CANNON_MEDIUM
    }, {
        x: -.225,
        y: .25,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .225,
        y: .25,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.15,
        y: .6,
        weapon: RED_DOUBLE_LASER_CANNON
    }, {
        x: .15,
        y: .6,
        weapon: RED_DOUBLE_LASER_CANNON
    }, {
        x: -.15,
        y: -.4,
        weapon: DOUBLE_ION_CANNON
    }, {
        x: .15,
        y: -.4,
        weapon: DOUBLE_ION_CANNON
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "VULTUREDROID"
    }]
};

ships.RECUSANT = {
    name: "Recusant Light Destroyer",
    asset: "RECUSANT.png",
    classification: shipTypes.Capital,
    size: 500,
    cost: 3000,
    speed: 3.5,
    turnSpeed: .01,
    shield: 2600,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .9,
        weapon: RED_TURBOLASER_CANNON_ULTRAHEAVY,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: -.03,
        y: .825,
        weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: .03,
        y: .825,
        weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: -.06,
        y: .7,
        weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: .06,
        y: .7,
        weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: -.075,
        y: .55,
        weapon: ION_CANNON_HEAVY
    }, {
        x: .075,
        y: .55,
        weapon: ION_CANNON_HEAVY
    }, {
        x: -.075,
        y: .35,
        weapon: RED_QUAD_LASER_CANNON
    }, {
        x: .075,
        y: .35,
        weapon: RED_QUAD_LASER_CANNON
    }, {
        x: -.06,
        y: 0,
        weapon: RED_QUAD_LASER_CANNON
    }, {
        x: .06,
        y: 0,
        weapon: RED_QUAD_LASER_CANNON
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 3,
        reserveSize: 2,
        squadronKey: "VULTUREDROID"
    }]
};

ships.LUCREHULK = {
    name: "Lucrehulk Carrier",
    asset: "LUCREHULK.png",
    classification: shipTypes.Capital,
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
            weapon: ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: .2,
            y: .2,
            weapon: ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }];

        for (let i = 3; i <= 33; i ++) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .8,
                y: Math.sin(angle) * .8 + .15,
                weapon: RED_QUAD_TURBOLASER_CANNON
            }, {
                x: Math.cos(angle) * .7,
                y: Math.sin(angle) * .7 + .15,
                weapon: i % 2 ? RED_QUAD_LASER_CANNON : TRIPLE_ION_CANNON_MEDIUM
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
        squadronKey: "VULTUREDROID"
    }, {
        x: .25,
        y: .85,
        maxSquadrons: 3,
        squadronSize: 10,
        reserveSize: 6,
        squadronKey: "VULTUREDROID"
    }, {
        x: -.25,
        y: .85,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "HYENABOMBER"
    }, {
        x: .25,
        y: .85,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "HYENABOMBER"
    }]
};

ships.VULTUREDROID = {
    name: "Vulture Droid",
    asset: "VULTUREDROID.png",
    classification: shipTypes.Fighter,
    size: 15,
    cost: 3,
    speed: 18,
    turnSpeed: .025,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...RED_FIGHTER_LASER_CANNON,
            health: 100
        },
        shotsAtOnce: 3,
        shotDelay: 100
    }]
};

ships.HYENABOMBER = {
    name: "Hyena Bomber",
    asset: "HYENABOMBER.png",
    classification: shipTypes.Bomber,
    size: 20,
    cost: 5,
    speed: 14,
    turnSpeed: .1,
    shield: 15,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...RED_FIGHTER_LASER_CANNON,
            health: 100
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_BOMB,
        shotsAtOnce: 3,
        shotDelay: 200
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

export default ships;