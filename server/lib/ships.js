import { shipTypes, weaponTypes } from "./constants.js";
import { DOUBLE_ION_CANNON, DOUBLE_ION_CANNON_HEAVY, DOUBLE_ION_CANNON_MEDIUM, FIGHTER_ION_CANNON, GREEN_DOUBLE_LASER_CANNON, GREEN_DOUBLE_LASER_CANNON_HEAVY, GREEN_DOUBLE_TURBOLASER_CANNON, GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY, GREEN_LASER_CANNON, GREEN_OCTUPLE_TURBOLASER_CANNON, GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY, GREEN_QUAD_LASER_CANNON_HEAVY, GREEN_QUAD_TURBOLASER_CANNON, GREEN_RAPID_LASER_CANNON, GREEN_TRIPLE_LASER_CANNON_HEAVY, GREEN_TURBOLASER_CANNON, ION_CANNON, ION_CANNON_HEAVY, ION_CANNON_ULTRA, FIGHTER_PROTON_TORPEDO, QUAD_ION_CANNON, QUAD_ION_CANNON_HEAVY, QUAD_ION_CANNON_MEDIUM, RED_DOUBLE_LASER_CANNON, RED_DOUBLE_LASER_CANNON_HEAVY, RED_DOUBLE_TURBOLASER_CANNON, RED_DOUBLE_TURBOLASER_CANNON_HEAVY, RED_FIGHTER_LASER_CANNON, RED_LASER_CANNON, RED_QUAD_LASER_CANNON, RED_RAPID_LASER_CANNON, RED_TRIPLE_LASER_CANNON, RED_TRIPLE_LASER_CANNON_HEAVY, RED_TRIPLE_TURBOLASER_CANNON_HEAVY, RED_TURBOLASER_CANNON, TRIPLE_ION_CANNON_HEAVY, FIGHTER_PROTON_BOMB, GREEN_FIGHTER_LASER_CANNON, FIGHTER_PROTON_ROCKET, ASSAULT_PROTON_ROCKET, ASSAULT_CONCUSSION_MISSILE, DUMMY_BLANK, RED_QUAD_TURBOLASER_CANNON_HEAVY, FIGHTER_PROTON_ROCKET_AOE, GREEN_RAPID_FIGHTER_LASER_CANNON, TIE_DEFENDER_ION_CANNON, RED_QUAD_LASER_CANNON_HEAVY, GREEN_QUAD_TURBOLASER_CANNON_HEAVY, ION_CANNON_MEDIUM, ASSAULT_PROTON_TORPEDO, BLUE_LASER_CANNON_HEAVY, BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY, BLUE_LASER_CANNON, BLUE_FIGHTER_LASER_CANNON, SNUB_ONE_ROCKET, RED_QUAD_TURBOLASER_CANNON, RED_TURBOLASER_CANNON_HEAVY } from "./weapons.js";

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }
}

const ships = {};

ships.ISD = {
    name: "Imperial Star Destroyer",
    asset: "ISD.png",
    classification: shipTypes.Capital,
    size: 400,
    cost: 3200,
    speed: 1.5,
    turnSpeed: .01,
    shield: 4000,
    shieldRegen: 2,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.3,
                y: -.4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON
            }, {
                x: .3,
                y: -.4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON
            }, {
                x: -.125 - .15 * i,
                y: .6 - .4 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : GREEN_DOUBLE_LASER_CANNON
            }, {
                x: .125 + .15 * i,
                y: .6 - .4 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : GREEN_DOUBLE_LASER_CANNON
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "TIEBOMBER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 3,
        reserveSize: 2,
        squadronKey: "TIEDEFENDER"
    }]
};

ships.ARQUITENS = {
    name: "Arquitens",
    asset: "ARQUITENS.png",
    classification: shipTypes.Frigate,
    size: 85,
    cost: 750,
    speed: 8,
    turnSpeed: .075,
    shield: 1300,
    shieldRegen: 2,
    hardpoints: [{
        x: -.225,
        y: .275,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .225,
        y: .275,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.275,
        y: -.125,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY
    }, {
        x: .275,
        y: -.125,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY
    }, {
        x: 0,
        y: .9,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 100
    }]
};

ships.IMOBILIZER = {
    name: "Imobilizer 418",
    asset: "IMOBILIZER.png",
    classification: shipTypes.HeavyFrigate,
    size: 225,
    cost: 2200,
    speed: 3,
    turnSpeed: .06,
    shield: 2100,
    shieldRegen: 3,
    hardpoints: [{
        x: -.175,
        y: .275,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY
    }, {
        x: .175,
        y: .275,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY
    }, {
        x: -.3,
        y: -.25,
        weapon: GREEN_LASER_CANNON
    }, {
        x: .3,
        y: -.25,
        weapon: GREEN_LASER_CANNON
    }, {
        x: -.45,
        y: -.75,
        weapon: ION_CANNON_MEDIUM
    }, {
        x: .45,
        y: -.75,
        weapon: ION_CANNON_MEDIUM
    }, {
        x: 0,
        y: .8,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "TIEFIGHTER"
    }]
};

ships.RAIDER = {
    name: "Raider",
    asset: "RAIDER.png",
    classification: shipTypes.Corvette,
    size: 50,
    cost: 200,
    speed: 10,
    turnSpeed: .1,
    shield: 400,
    shieldRegen: 1,
    hardpoints: [{
        x: -.15,
        y: .075,
        weapon: GREEN_TURBOLASER_CANNON
    }, {
        x: .15,
        y: .075,
        weapon: GREEN_TURBOLASER_CANNON
    }, {
        x: 0,
        y: -.4,
        weapon: GREEN_RAPID_LASER_CANNON
    }]
};

ships.QUASAR = {
    name: "Quasar",
    asset: "QUASAR.png",
    classification: shipTypes.Frigate,
    size: 100,
    cost: 2000,
    speed: 3,
    turnSpeed: .025,
    shield: 1900,
    shieldRegen: 5,
    hardpoints: [{
        x: -.05,
        y: .95,
        weapon: GREEN_DOUBLE_LASER_CANNON
    }, {
        x: .05,
        y: .95,
        weapon: GREEN_DOUBLE_LASER_CANNON
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
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .325,
        y: .15,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.55,
        y: -.3,
        weapon: GREEN_QUAD_LASER_CANNON_HEAVY
    }, {
        x: .55,
        y: -.3,
        weapon: GREEN_QUAD_LASER_CANNON_HEAVY
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEBOMBER"
    }]
};

ships.THRAWN_QUASAR = {
    ...ships.QUASAR,
    name: "Quasar (Thrawn)",
    shield: 3000,
    shieldRegen: 7.5,
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "TIEDEFENDER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "TIEBOMBER"
    }]
};

ships.TIEFIGHTER = {
    name: "Tie Fighter",
    asset: "TIEFIGHTER.png",
    classification: shipTypes.Fighter,
    size: 15,
    cost: 4,
    speed: 18,
    turnSpeed: .0334,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...GREEN_FIGHTER_LASER_CANNON,
            health: 100
        },
        shotsAtOnce: 2,
        shotDelay: 75
    }]
};

ships.TIEBOMBER = {
    name: "Tie Bomber",
    asset: "TIEBOMBER.png",
    classification: shipTypes.Bomber,
    size: 19,
    cost: 9,
    speed: 13,
    turnSpeed: .0175,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: GREEN_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: GREEN_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: .5,
        y: 0,
        weapon: FIGHTER_PROTON_BOMB,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .5,
        y: 0,
        weapon: FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 1,
        shotDelay: 75
    }]
};

ships.TIEDEFENDER = {
    name: "Tie Defender",
    asset: "TIEDEFENDER.png",
    classification: shipTypes.Fighter,
    size: 18,
    cost: 25,
    speed: 20,
    turnSpeed: .08,
    shield: 200,
    shieldRegen: 100,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: GREEN_RAPID_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: TIE_DEFENDER_ION_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_ROCKET_AOE,
        shotsAtOnce: 3,
        shotDelay: 250
    }]
};

ships.SSD = {
    name: "Super Star Destroyer",
    asset: "SSD.png",
    classification: shipTypes.SuperCapital,
    size: 6000,
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
                weapon: GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: .04 + .02 * i,
                y: .8 - .1 * i,
                weapon: GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: -.01 - .0225 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON_HEAVY
            }, {
                x: .03 + .02 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON_HEAVY
            }, {
                x: -.025 - .0225 * i,
                y: .8 - .1 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                x: .025 + .02 * i,
                y: .8 - .1 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 2,
                shotDelay: 250
            });
        }

        for (let i = -4; i < 12; i ++) {
            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON_HEAVY
            });

            i += .5;

            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? GREEN_DOUBLE_LASER_CANNON : DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? GREEN_DOUBLE_LASER_CANNON : DOUBLE_ION_CANNON_MEDIUM
            });

            i |= 0;
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "TIEBOMBER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "TIEDEFENDER"
    }]
};

ships.HOMEONE = {
    name: "Home One",
    asset: "HOMEONE.png",
    classification: shipTypes.Capital,
    size: 750,
    cost: 3750,
    speed: 2.5,
    turnSpeed: .02,
    shield: 9000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: [-.05, -.15, -.15, -.05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: RED_TRIPLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: [.05, .15, .15, .05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: RED_TRIPLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: [-.025, -.1, -.1, -.025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : RED_LASER_CANNON
            }, {
                x: [.025, .1, .1, .025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : RED_LASER_CANNON
            }, {
                x: [-.025, -.05, -.05, -.025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : RED_LASER_CANNON
            }, {
                x: [.025, .05, .05, .025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : RED_LASER_CANNON
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
        maxSquadrons: 2,
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
    shield: 5500,
    shieldRegen: 5,
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
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "AWING"
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
        weapon: RED_TURBOLASER_CANNON
    }, {
        x: .1,
        y: .5,
        weapon: RED_DOUBLE_LASER_CANNON_HEAVY
    }, {
        x: -.1,
        y: .5,
        weapon: RED_DOUBLE_LASER_CANNON_HEAVY
    }, {
        x: 0,
        y: .3,
        weapon: DOUBLE_ION_CANNON
    }, {
        x: .125,
        y: -.7,
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: -.125,
        y: -.7,
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: 0,
        y: -.85,
        weapon: DOUBLE_ION_CANNON
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
    size: 90,
    cost: 600,
    speed: 3.4,
    turnSpeed: .04,
    shield: 1600,
    shieldRegen: 3,
    hardpoints: [{
        x: -.2,
        y: .85,
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: .2,
        y: .85,
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: -.125,
        y: .2,
        weapon: ION_CANNON
    }, {
        x: .125,
        y: .2,
        weapon: ION_CANNON
    }, {
        x: -.25,
        y: -.6,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .25,
        y: -.6,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
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
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: 0,
        y: .2,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: 0,
        y: -.2,
        weapon: RED_RAPID_LASER_CANNON
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
    shieldRegen: 15,
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
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "AWING"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "YWING"
    }]
};

ships.REBEL_QUASAR = {
    name: "Quasar (Rebel)",
    asset: "QUASAR.png",
    classification: shipTypes.Frigate,
    size: 100,
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

// CIS
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
    shield: 4250,
    shieldRegen: 50,
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
                weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 350
            }, {
                x: -.125,
                y: -.1 - .16 * i,
                weapon: RED_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 350
            }, {
                x: .125,
                y: -.1 - .16 * i,
                weapon: RED_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 350
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
    })()
};

ships.MUNIFICENT = {
    name: "Munificent Frigate",
    asset: "MUNIFICENT.png",
    classification: shipTypes.HeavyFrigate,
    size: 550,
    cost: 2700,
    speed: 3.25,
    turnSpeed: .02,
    shield: 2800,
    shieldRegen: 50,
    hardpoints: [{
        x: 0,
        y: .9,
        weapon: RED_TURBOLASER_CANNON_HEAVY
    }]
};

// TEST DUMMIES
ships.DUMMY_CARRIER = {
    name: "Dummy Carrier",
    asset: "QUASAR.png",
    classification: shipTypes.Frigate,
    size: 100,
    cost: 1,
    speed: .01,
    turnSpeed: .025,
    shield: 1000,
    shieldRegen: 10,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: DUMMY_BLANK
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 10,
        reserveSize: 9,
        squadronKey: "TIEBOMBER"
    }]
};

ships.DUMMY_TARGET = {
    name: "Dummy Target",
    asset: "MC80LIBERTY.png",
    classification: shipTypes.Capital,
    size: 300,
    cost: 1,
    speed: .01,
    turnSpeed: .025,
    shield: 1000,
    shieldRegen: 10,
    hardpoints: (function() {
        const weapon = DUMMY_BLANK; // Dummy weapon

        const output = [{
            x: -.2,
            y: -.4,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.3,
            y: -.2,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.2,
            y: .05,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.075,
            y: .1,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.05,
            y: .4,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.025,
            y: .7,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon,
                shotsAtOnce: 10,
                shotDelay: 40
            })
        }

        return output;
    })()
};

// New ships
ships.CHIMERA_DESTROYER = {
    name: "Chimera-Class Destroyer",
    asset: "CHIMERA_DESTROYER.png",
    classification: shipTypes.Capital,
    size: 450,
    cost: 7250,
    speed: 2.5,
    turnSpeed: .02,
    shield: 10000,
    shieldRegen: 10,
    hardpoints: [{ // FRONT
        x: -.175,
        y: .725,
        weapon: BLUE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.175,
        y: .575,
        weapon: ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: .175,
        y: .725,
        weapon: BLUE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .175,
        y: .575,
        weapon: ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 120
    }, { // BACK
        x: -.125,
        y: -.8625,
        weapon: BLUE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.125,
        y: -.775,
        weapon: ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: .125,
        y: -.8625,
        weapon: BLUE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .125,
        y: -.775,
        weapon: ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 120
    }, { // MIDDLE
        x: 0,
        y: -0.04625,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 250
    }, {
        x: -.155,
        y: .01,
        weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.155,
        y: -.11,
        weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.155,
        y: -.55,
        weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .155,
        y: .01,
        weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .155,
        y: -.11,
        weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .155,
        y: -.55,
        weapon: BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 10,
        reserveSize: 8,
        squadronKey: "SNUB1"
    }]
};

ships.SNUB1 = {
    name: "Snub-1",
    asset: "SNUB1.png",
    classification: shipTypes.Fighter,
    size: 15,
    cost: 8,
    speed: 30,
    turnSpeed: .125,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...BLUE_FIGHTER_LASER_CANNON,
            health: 150
        },
        shotsAtOnce: 3,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_BOMB,
        shotsAtOnce: 2,
        shotDelay: 150
    }]
};

for (const ship in ships) {
    ships[ship].hardpoints.forEach(hardpoint => {
        const vector = new Vector(hardpoint.y, hardpoint.x);

        hardpoint.offset = vector.length;
        hardpoint.direction = vector.angle;
    });
}

export default ships;