import { shipTypes } from "../constants.js";
import { ION_CANNON, FIGHTER_PROTON_BOMB, ASSAULT_CONCUSSION_MISSILE, BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY, BLUE_LASER_CANNON, BLUE_FIGHTER_LASER_CANNON } from "../weapons.js";

const ships = {};

ships.CHIMERA_DESTROYER = {
    name: "Chimera-Class Destroyer",
    asset: "CHIMERA_DESTROYER.png",
    classification: shipTypes.Capital,
    size: 450,
    cost: 7250,
    speed: 2.5,
    turnSpeed: .02,
    shield: 10000,
    shieldRegen: 4,
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

export default ships;