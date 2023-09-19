import { shipTypes } from "../constants.js";
import { DOUBLE_ION_CANNON, DOUBLE_ION_CANNON_HEAVY, DOUBLE_ION_CANNON_MEDIUM, FIGHTER_ION_CANNON, ION_CANNON, FIGHTER_PROTON_TORPEDO, QUAD_ION_CANNON, RED_DOUBLE_LASER_CANNON, RED_DOUBLE_LASER_CANNON_HEAVY, RED_DOUBLE_TURBOLASER_CANNON, RED_DOUBLE_TURBOLASER_CANNON_HEAVY, RED_FIGHTER_LASER_CANNON, RED_LASER_CANNON, RED_QUAD_LASER_CANNON, RED_RAPID_LASER_CANNON, RED_TRIPLE_TURBOLASER_CANNON_HEAVY, RED_TURBOLASER_CANNON, FIGHTER_PROTON_BOMB, FIGHTER_PROTON_ROCKET, ASSAULT_CONCUSSION_MISSILE, RED_QUAD_TURBOLASER_CANNON_HEAVY, RED_TURBOLASER_CANNON_ULTRAHEAVY, RED_QUAD_LASER_CANNON_HEAVY, ASSAULT_PROTON_TORPEDO, TRIPLE_ION_CANNON_MEDIUM, TRIPLE_ION_CANNON, RED_TRIPLE_TURBOLASER_CANNON } from "../weapons.js";

const ships = {};

// Give more HP to mon cala hardpoints
// MC85

ships.HOMEONE = {
    name: "Home One",
    asset: "HOMEONE.png",
    classification: shipTypes.Capital,
    size: 1100,
    cost: 4500,
    speed: 2.5,
    turnSpeed: .02,
    shield: 14000,
    shieldRegen: 6,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: [-.05, -.15, -.15, -.05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: {
                    ...RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
                    health: RED_TRIPLE_TURBOLASER_CANNON_HEAVY.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [.05, .15, .15, .05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: {
                    ...RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
                    health: RED_TRIPLE_TURBOLASER_CANNON_HEAVY.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [-.025, -.1, -.1, -.025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? {
                    ...DOUBLE_ION_CANNON_MEDIUM,
                    health: DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...RED_LASER_CANNON,
                    health: RED_LASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [.025, .1, .1, .025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? {
                    ...DOUBLE_ION_CANNON_MEDIUM,
                    health: DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...RED_LASER_CANNON,
                    health: RED_LASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [-.025, -.05, -.05, -.025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? {
                    ...DOUBLE_ION_CANNON_MEDIUM,
                    health: DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...RED_DOUBLE_TURBOLASER_CANNON,
                    health: RED_DOUBLE_TURBOLASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [.025, .05, .05, .025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? {
                    ...DOUBLE_ION_CANNON_MEDIUM,
                    health: DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...RED_DOUBLE_TURBOLASER_CANNON,
                    health: RED_DOUBLE_TURBOLASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "XWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "AWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "YWING"
    }]
};

ships.MC80LIBERTY = {
    name: "MC80 Liberty",
    asset: "MC80LIBERTY.png",
    classification: shipTypes.Capital,
    size: 500,
    cost: 2400,
    speed: 3,
    turnSpeed: .025,
    shield: 8000,
    shieldRegen: 4,
    hardpoints: (function() {
        const output = [{
            x: -.2,
            y: -.4,
            weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
        }, {
            x: -.3,
            y: -.2,
            weapon: RED_RAPID_LASER_CANNON
        }, {
            x: -.2,
            y: .05,
            weapon: DOUBLE_ION_CANNON_HEAVY
        }, {
            x: -.075,
            y: .1,
            weapon: RED_QUAD_LASER_CANNON
        }, {
            x: -.05,
            y: .4,
            weapon: DOUBLE_ION_CANNON
        }, {
            x: -.025,
            y: .7,
            weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon
            })
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "XWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "YWING"
    }]
};

ships.MC75 = {
    name: "MC-75",
    asset: "MC75.png",
    classification: shipTypes.Capital,
    size: 500,
    cost: 2400,
    speed: 3,
    turnSpeed: .025,
    shield: 12000,
    shieldRegen: 4,
    hardpoints: [{
        x: 0,
        y: .1,
        weapon: ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 100
    }, {
        x: 0,
        y: .875,
        weapon: RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .7,
        weapon: RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .7,
        weapon: RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: .5,
        weapon: TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .5,
        weapon: TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.175,
        y: .35,
        weapon: RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .175,
        y: .35,
        weapon: RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.175,
        y: .15,
        weapon: RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .175,
        y: .15,
        weapon: RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: -.025,
        weapon: RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: -.025,
        weapon: RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: -.25,
        weapon: TRIPLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: -.25,
        weapon: TRIPLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1125,
        y: -.5,
        weapon: RED_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1125,
        y: -.5,
        weapon: RED_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.09,
        y: -.75,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .09,
        y: -.75,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "AWING"
    }]
};

ships.MC85 = {
    name: "MC-85",
    asset: "MC85.png",
    classification: shipTypes.SuperCapital,
    size: 1650,
    cost: 20000,
    speed: 2.25,
    turnSpeed: .02,
    shield: 45000,
    shieldRegen: 15,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.06 - .025 * i,
                y: .8 - .1 * i,
                weapon: (i % 3 === 0) ? RED_TURBOLASER_CANNON_ULTRAHEAVY : RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .06 + .025 * i,
                y: .8 - .1 * i,
                weapon: (i % 3 === 0) ? RED_TURBOLASER_CANNON_ULTRAHEAVY : RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.06 - .025 * i,
                y: -.4 + .1 * i,
                weapon: (i % 3 === 0) ? RED_TURBOLASER_CANNON_ULTRAHEAVY : RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .06 + .025 * i,
                y: -.4 + .1 * i,
                weapon: (i % 3 === 0) ? RED_TURBOLASER_CANNON_ULTRAHEAVY : RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.03 - .025 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.03 - .025 * i,
                y: -.3 + .1 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: -.3 + .1 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "XWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "YWING"
    }]
};

ships.NEBULONB = {
    name: "Nebulon-B",
    asset: "NEBULONB.png",
    classification: shipTypes.Frigate,
    size: 150,
    cost: 500,
    speed: 4.5,
    turnSpeed: .05,
    shield: 1000,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: RED_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .5,
        weapon: RED_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .5,
        weapon: RED_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .3,
        weapon: DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: -.7,
        weapon: {
            ...RED_RAPID_LASER_CANNON,
            speed: RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: RED_RAPID_LASER_CANNON.damage * 2,
            range: RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: -.7,
        weapon: {
            ...RED_RAPID_LASER_CANNON,
            speed: RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: RED_RAPID_LASER_CANNON.damage * 2,
            range: RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.85,
        weapon: DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "XWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "YWING"
    }]
};

ships.PELTA = {
    name: "Pelta Frigate",
    asset: "PELTA.png",
    classification: shipTypes.Frigate,
    size: 120,
    cost: 640,
    speed: 4.2,
    turnSpeed: .03,
    shield: 2000,
    shieldRegen: 4,
    hardpoints: [{
        x: -.2,
        y: .85,
        weapon: {
            ...RED_RAPID_LASER_CANNON,
            speed: RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: RED_RAPID_LASER_CANNON.damage * 2,
            range: RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .2,
        y: .85,
        weapon: {
            ...RED_RAPID_LASER_CANNON,
            speed: RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: RED_RAPID_LASER_CANNON.damage * 2,
            range: RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.125,
        y: .2,
        weapon: ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .125,
        y: .2,
        weapon: ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.25,
        y: -.6,
        weapon: RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .25,
        y: -.6,
        weapon: RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 7,
        reserveSize: 2,
        squadronKey: "AWING"
    }]
};

ships.CR90 = {
    name: "CR-90",
    asset: "CR90.png",
    classification: shipTypes.Corvette,
    size: 60,
    cost: 200,
    speed: 12,
    turnSpeed: .075,
    shield: 600,
    shieldRegen: .5,
    hardpoints: [{
        x: 0,
        y: .6,
        weapon: {
            ...RED_RAPID_LASER_CANNON,
            speed: RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: RED_RAPID_LASER_CANNON.damage * 2,
            range: RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: .2,
        weapon: {
            ...RED_DOUBLE_TURBOLASER_CANNON,
            speed: RED_DOUBLE_TURBOLASER_CANNON.speed * 1.25,
            damage: RED_DOUBLE_TURBOLASER_CANNON.damage * 2,
            range: RED_DOUBLE_TURBOLASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: 0,
        y: -.2,
        weapon: {
            ...RED_RAPID_LASER_CANNON,
            speed: RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: RED_RAPID_LASER_CANNON.damage * 2,
            range: RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }]
};

ships.STARHAWK = {
    name: "Starhawk",
    asset: "STARHAWK.png",
    classification: shipTypes.Capital,
    size: 750,
    cost: 6540,
    speed: 2,
    turnSpeed: .01,
    shield: 7200,
    shieldRegen: 4,
    hardpoints: (function() {
        const output = [{
            x: -.075,
            y: .95,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 75
        }, {
            x: .075,
            y: .95,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 75
        }, {
            x: -.3,
            y: .3,
            weapon: DOUBLE_ION_CANNON_MEDIUM
        }, {
            x: -.225,
            y: -.55,
            weapon: RED_DOUBLE_TURBOLASER_CANNON
        }, {
            x: .225,
            y: -.55,
            weapon: RED_DOUBLE_TURBOLASER_CANNON
        }, {
            x: -.15,
            y: -.7,
            weapon: RED_DOUBLE_TURBOLASER_CANNON
        }, {
            x: .15,
            y: -.7,
            weapon: RED_DOUBLE_TURBOLASER_CANNON
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2,
                y: .6 - .075 * i,
                weapon: RED_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: .2,
                y: .6 - .075 * i,
                weapon: RED_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.125,
                y: .2 - .125 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON : RED_DOUBLE_LASER_CANNON
            }, {
                x: .125,
                y: .2 - .125 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON : RED_DOUBLE_LASER_CANNON
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "AWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "YWING"
    }]
};

ships.REBEL_QUASAR = {
    name: "Quasar (Rebel)",
    asset: "QUASAR.png",
    classification: shipTypes.Frigate,
    size: 175,
    cost: 2000,
    speed: 3,
    turnSpeed: .025,
    shield: 3500,
    shieldRegen: 2.5,
    hardpoints: [{
        x: -.05,
        y: .95,
        weapon: RED_DOUBLE_LASER_CANNON
    }, {
        x: .05,
        y: .95,
        weapon: RED_DOUBLE_LASER_CANNON
    }, {
        x: -.175,
        y: .6,
        weapon: DOUBLE_ION_CANNON
    }, {
        x: .175,
        y: .6,
        weapon: DOUBLE_ION_CANNON
    }, {
        x: -.325,
        y: .15,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .325,
        y: .15,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.55,
        y: -.3,
        weapon: RED_QUAD_LASER_CANNON_HEAVY
    }, {
        x: .55,
        y: -.3,
        weapon: RED_QUAD_LASER_CANNON_HEAVY
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "AWING"
    }]
};

ships.XWING = {
    name: "X-Wing",
    asset: "XWING.png",
    classification: shipTypes.Fighter,
    size: 17.5,
    cost: 5,
    speed: 20,
    turnSpeed: .05,
    shield: 10,
    shieldRegen: 0.1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: RED_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.YWING = {
    name: "Y-Wing",
    asset: "YWING.png",
    classification: shipTypes.Bomber,
    size: 20,
    cost: 8,
    speed: 15,
    turnSpeed: .025,
    shield: 17.5,
    shieldRegen: 0.2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: RED_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_ION_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: FIGHTER_PROTON_BOMB,
        shotsAtOnce: 2,
        shotDelay: 125
    }]
};

ships.AWING = {
    name: "A-Wing",
    asset: "AWING.png",
    classification: shipTypes.Fighter,
    size: 17,
    cost: 6,
    speed: 22.5,
    turnSpeed: .1,
    shield: 7.5,
    shieldRegen: 0.15,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: RED_FIGHTER_LASER_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 4,
        shotDelay: 50
    }]
};

ships.LUSANKYA = {
    name: "Lusankya",
    asset: "SSD.png",
    classification: shipTypes.SuperCapital,
    size: 8000,
    cost: 60000,
    speed: .5,
    turnSpeed: .0005,
    shield: 86000,
    shieldRegen: 20,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 13; i ++) {
            output.push({
                x: -.02 - .0225 * i,
                y: .8 - .1 * i,
                weapon: RED_QUAD_LASER_CANNON_HEAVY
            }, {
                x: .04 + .02 * i,
                y: .8 - .1 * i,
                weapon: RED_QUAD_LASER_CANNON_HEAVY
            }, {
                x: -.01 - .0225 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON
            }, {
                x: .03 + .02 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON
            }, {
                x: -.025 - .0225 * i,
                y: .8 - .1 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: .025 + .02 * i,
                y: .8 - .1 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 250
            });
        }

        for (let i = -4; i < 12; i ++) {
            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: RED_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: RED_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.08 - .01 * i,
                y: .4 - .075 * i,
                weapon: RED_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: .09 + .00825 * i,
                y: .4 - .075 * i,
                weapon: RED_TURBOLASER_CANNON_ULTRAHEAVY
            });

            i += .5;

            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? RED_DOUBLE_LASER_CANNON : DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? RED_DOUBLE_LASER_CANNON : DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: -.08 - .01 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? RED_DOUBLE_TURBOLASER_CANNON : RED_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: .09 + .00825 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? RED_DOUBLE_TURBOLASER_CANNON : RED_TURBOLASER_CANNON_ULTRAHEAVY
            });

            i |= 0;
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "AWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "YWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "XWING"
    }]
};

export default ships;