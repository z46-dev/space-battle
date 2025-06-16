import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.AXEHEAD_FRIGATE_OLDREP = {
    name: "Axehead Frigate",
    asset: "AXEHEAD_FRIGATE.png",
    classification: shipTypes.Frigate,
    population: 6,
    size: 275,
    cost: 895,
    speed: 5,
    turnSpeed: .02,
    shield: 850,
    shieldRegen: .85,
    hardpoints: [{
        x: -.916,
        y: .887,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: .914,
        y: .887,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: .328,
        y: .681,
        weapon: weapons.ION_CANNON_MEDIUM
    }, {
        x: -.337,
        y: .683,
        weapon: weapons.ION_CANNON_MEDIUM
    }, {
        x: -.001,
        y: -.774,
        weapon: weapons.GREEN_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: -.004,
        y: .277,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 500
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 1.5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 3,
        reserveSize: 2,
        squadronKey: "AUREK_STRIKEFIGHTER_OLDREP"
    }]
};

export default ships;