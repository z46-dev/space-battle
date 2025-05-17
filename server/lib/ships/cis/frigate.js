import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../../templates.js";

const ships = {};

ships.C9979_CIS = {
    name: "C9979 Picket Carrier",
    asset: "C9979.png",
    classification: shipTypes.Frigate,
    population: 4,
    size: 149,
    cost: 650,
    speed: 4,
    turnSpeed: .008,
    shield: 850,
    shieldRegen: .85,
    hardpoints: [{
        x: -.8,
        y: .25,
        weapon: weapons.RED_RAPID_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 90
    }, {
        x: .8,
        y: .25,
        weapon: weapons.RED_RAPID_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 90
    }, {
        x: -.8,
        y: -.25,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 3,
        shotDelay: 90
    }, {
        x: .8,
        y: -.25,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 3,
        shotDelay: 90
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 9,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

ships.MUNIFICENT_CIS = templates.frigate.MUNIFICENT();

export default ships;