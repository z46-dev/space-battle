import { shipTypes } from "../constants.js";
import { ASSAULT_CONCUSSION_MISSILE, DOUBLE_ION_CANNON, DOUBLE_ION_CANNON_HEAVY, FIGHTER_PROTON_BOMB, ION_CANNON, OCTUPLE_ION_CANNON_MEDIUM, YELLOW_ANTI_FIGHTER_LASER_CANNON, YELLOW_DOUBLE_LASER_CANNON, YELLOW_DOUBLE_LASER_CANNON_HEAVY, YELLOW_DOUBLE_TURBOLASER_CANNON, YELLOW_DOUBLE_TURBOLASER_CANNON_HEAVY, YELLOW_FIGHTER_LASER_CANNON, YELLOW_LASER_CANNON, YELLOW_OCTUPLE_TURBOLASER_CANNON, YELLOW_OCTUPLE_TURBOLASER_CANNON_HEAVY, YELLOW_QUAD_LASER_CANNON, YELLOW_QUAD_LASER_CANNON_HEAVY } from "../weapons.js";

const ships = {};

ships.ACTIONVITRANSPORT_ZANN = {
    name: "Action-VI Transport",
    asset: "ACTIONVITRANSPORTGREY.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 100,
    cost: 300,
    speed: 8,
    turnSpeed: .02,
    shield: 700,
    shieldRegen: 7,
    hardpoints: [{
        x: 0,
        y: .5,
        weapon: YELLOW_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.5,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 70
    }, {
        x: 0,
        y: 0,
        weapon: YELLOW_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }]
};

ships.KELDABEBATTLESHIP_ZANN = {
    name: "Keldabe Battleship",
    asset: "KELDABEBATTLESHIP.png",
    classification: shipTypes.Capital,
    population: 28,
    size: 1150,
    cost: 7200,
    speed: 2.5,
    turnSpeed: .01,
    shield: 10000,
    shieldRegen: 8,
    hardpoints: [{
        x: -.075,
        y: .9,
        weapon: YELLOW_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .05,
        y: .9,
        weapon: YELLOW_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.075,
        y: .7,
        weapon: YELLOW_OCTUPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .05,
        y: .7,
        weapon: YELLOW_OCTUPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.075,
        y: .5,
        weapon: DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: .05,
        y: .5,
        weapon: DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: -.075,
        y: .3,
        weapon: YELLOW_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .05,
        y: .3,
        weapon: YELLOW_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: .175,
        weapon: OCTUPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: .125,
        y: .175,
        weapon: OCTUPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: -.3,
        y: -.05,
        weapon: YELLOW_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .3,
        y: -.05,
        weapon: YELLOW_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.4,
        y: -.15,
        weapon: DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: .4,
        y: -.15,
        weapon: DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: -.5,
        y: -.3,
        weapon: YELLOW_OCTUPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: -.3,
        weapon: YELLOW_OCTUPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.6,
        y: -.45,
        weapon: YELLOW_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .6,
        y: -.45,
        weapon: YELLOW_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.5,
        y: -.6,
        weapon: YELLOW_QUAD_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: -.6,
        weapon: YELLOW_QUAD_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.4,
        y: -.8,
        weapon: DOUBLE_ION_CANNON,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: .4,
        y: -.8,
        weapon: DOUBLE_ION_CANNON,
        shotsAtOnce: 3,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "STARVIPERATTACKCRAFT_ZANN"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "AUZITUCKGUNSHIP_ZANN"
    }]
};

ships.STARVIPERATTACKCRAFT_ZANN = {
    name: "StarViper Attack Craft",
    asset: "STARVIPERATTACKCRAFT.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 25,
    cost: 0,
    speed: 18,
    turnSpeed: .02,
    shield: 50,
    shieldRegen: .1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: YELLOW_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

ships.AUZITUCKGUNSHIP_ZANN = {
    name: "Auzituck Gunship",
    asset: "AUZITUCKGUNSHIP.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 25,
    cost: 0,
    speed: 15,
    turnSpeed: .02,
    shield: 60,
    shieldRegen: .2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: YELLOW_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_BOMB,
        shotsAtOnce: 4,
        shotDelay: 200
    }]
};

export default ships;