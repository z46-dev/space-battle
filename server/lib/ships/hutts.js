import { shipTypes } from "../constants.js";
import { DOUBLE_ION_CANNON, DOUBLE_ION_CANNON_HEAVY, DOUBLE_ION_CANNON_MEDIUM, ION_CANNON, ION_CANNON_HEAVY, PURPLE_ANTI_FIGHTER_LASER_CANNON, PURPLE_DOUBLE_LASER_CANNON, PURPLE_DOUBLE_TURBOLASER_CANNON, PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY, PURPLE_LASER_CANNON, PURPLE_LASER_CANNON_HEAVY } from "../weapons.js";

const ships = {};

ships.ACTIONVITRANSPORT_HUTT = {
    name: "Action-VI Transport",
    asset: "ACTIONVITRANSPORTSTRIPE.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 100,
    cost: 300,
    speed: 8,
    turnSpeed: .02,
    shield: 600,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .5,
        weapon: PURPLE_LASER_CANNON,
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
        weapon: PURPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

ships.HUTTFRIGATE = {
    name: "Brute Hutt Support Frigate",
    asset: "HUTTCORVETTE.png",
    classification: shipTypes.Frigate,
    population: 6,
    size: 240,
    cost: 600,
    speed: 5.5,
    turnSpeed: .02,
    shield: 1400,
    shieldRegen: 2,
    hardpoints: [{
        x: -.4,
        y: .65,
        weapon: PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .4,
        y: .65,
        weapon: PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.2,
        y: .7,
        weapon: DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .2,
        y: .7,
        weapon: DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.1,
        y: .5,
        weapon: PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .3,
        weapon: PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: -.5,
        weapon: PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: -.3,
        weapon: PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 50
    }]
};

ships.CONSOLARHUTT = {
    name: "Consolar Corvette",
    asset: "CONSOLARHUTT.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 60,
    cost: 100,
    speed: 11,
    turnSpeed: .04,
    shield: 400,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: PURPLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .9,
        weapon: PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: -.9,
        weapon: PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

ships.MC69NOIR = {
    name: "MC-69 Noir",
    asset: "MC69NOIR.png",
    classification: shipTypes.Capital,
    population: 20,
    size: 450,
    cost: 3000,
    speed: 2.9,
    turnSpeed: .01,
    shield: 9500,
    shieldRegen: 5,
    hardpoints: [{
        x: -.04,
        y: .85,
        weapon: PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .085,
        y: .775,
        weapon: PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.12,
        y: .6,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .15,
        y: .45,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.18,
        y: .2,
        weapon: PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .275,
        y: 0,
        weapon: PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.25,
        y: -.2,
        weapon: PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .225,
        y: -.4,
        weapon: PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.1,
        y: -.6,
        weapon: PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .04,
        y: -.8,
        weapon: PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.08,
        y: .35,
        weapon: DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .15,
        y: -.1,
        weapon: DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }]
};

export default ships;