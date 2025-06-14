import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../../templates.js";

const ships = {};

ships.CR90_REBEL = templates.corvette.CR90();

ships.DP20_REBEL = templates.corvette.DP20({
    color: "RED",
    asset: "DP20REBEL.png"
});

ships.MARAUDERMISSILECRUISER_REBEL = {
    name: "Marauder Missile Cruiser",
    asset: "MARAUDERCORVETTE.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 100,
    cost: 500,
    speed: 7.25,
    turnSpeed: .05,
    shield: 1100,
    shieldRegen: 2,
    hardpoints: [{
        x: -.55,
        y: -.3,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .55,
        y: -.3,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.55,
        y: -.3,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 6,
        shotDelay: 80
    }, {
        x: .55,
        y: -.3,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 6,
        shotDelay: 80
    }, {
        x: 0,
        y: .6,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }]
};

ships.AGAVE_CORVETTE_REBEL = templates.corvette.AGAVE_CORVETTE();
ships.CR92A_REBEL = templates.corvette.CR92A();

export default ships;