import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.BASILISKAN_SHAADLAR_TROOPSHIP_MANDO = {
    name: "Basiliskan Shaadlar Troopship",
    asset: "BASILISKAN_SHAADLAR_TROOPSHIP.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 400,
    cost: 790,
    speed: 6,
    turnSpeed: .04,
    shield: 500,
    shieldRegen: .5,
    hardpoints: [{
        x: -.129,
        y: .760,
        weapon: weapons.BLUE_TURBOLASER_CANNON
    }, {
        x: .129,
        y: .760,
        weapon: weapons.BLUE_TURBOLASER_CANNON
    }, {
        x: -.269,
        y: -.038,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON
    }, {
        x: -.269,
        y: -.504,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON
    }, {
        x: .277,
        y: -.501,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON
    }, {
        x: .267,
        y: -.052,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON
    }, {
        x: .257,
        y: .310,
        weapon: weapons.ION_CANNON_MEDIUM
    }, {
        x: -.263,
        y: .314,
        weapon: weapons.ION_CANNON_MEDIUM
    }]
};

ships.SHAADLAR_TROOPSHIP_MANDO = {
    name: "Shaadlar Troopship",
    asset: "SHAADLAR_TROOPSHIP.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 400,
    cost: 740,
    speed: 5,
    turnSpeed: .04,
    shield: 550,
    shieldRegen: .55,
    hardpoints: [{
        x: -.424,
        y: .567,
        weapon: weapons.BLUE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 300
    }, {
        x: -.209,
        y: .682,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 300
    }, {
        x: -.289,
        y: -.001,
        weapon: weapons.BLUE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: -.174,
        y: -.604,
        weapon: weapons.BLUE_TURBOLASER_CANNON
    }, {
        x: .424,
        y: .567,
        weapon: weapons.BLUE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 300
    }, {
        x: .209,
        y: .682,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 300
    }, {
        x: .289,
        y: -.001,
        weapon: weapons.BLUE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .174,
        y: -.604,
        weapon: weapons.BLUE_TURBOLASER_CANNON
    }]
};

ships.BAARUR_DUNGEON_SHIP_MANDO = {
    name: "Baar'ur Dungeon Ship",
    asset: "BAAR-UR_DUNGEON_SHIP.png",
    classification: shipTypes.Frigate,
    population: 10,
    size: 400,
    cost: 800,
    speed: 3,
    turnSpeed: .04,
    shield: 700,
    shieldRegen: .7,
    tenderAbility: {
        frequency: 1.25,
        power: .2
    },
    hardpoints: [{
        x: -.169,
        y: .967,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: .165,
        y: .969,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: -.173,
        y: .388,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: .170,
        y: .388,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: -.080,
        y: -.194,
        weapon: weapons.BLUE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .087,
        y: -.191,
        weapon: weapons.BLUE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 150
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 1.45 | 0
        }
    }))
};

export default ships;