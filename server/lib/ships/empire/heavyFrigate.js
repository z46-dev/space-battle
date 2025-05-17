import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ARQUITENS_EMPIRE = templates.heavyFrigate.ARQUITENS();

ships.IMOBILIZER_EMPIRE = {
    name: "Imobilizer 418",
    asset: "IMOBILIZER.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 360,
    cost: 2200,
    speed: 3,
    turnSpeed: .015,
    shield: 5700,
    shieldRegen: 5.7,
    hardpoints: [{
        x: -.1,
        y: .275,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .1,
        y: .275,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.2,
        y: -.25,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .2,
        y: -.25,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.35,
        y: -.725,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .35,
        y: -.725,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: 0,
        y: .75,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }]
};

ships.DREADNOUGHTHEAVYCRUISER_EMPIRE = templates.heavyFrigate.DREADNOUGHTHEAVYCRUISER();

ships.ACCLIMATOR_EMPIRE = templates.heavyFrigate.ACCLIMATOR();

ships.IMPERIAL_II_EMPIRE = templates.heavyFrigate.IMPERIAL_II();

ships.GLADIATOR_EMPIRE = templates.heavyFrigate.GLADIATOR();

export default ships;