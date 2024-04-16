import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

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
        weapon: weapons.YELLOW_FIGHTER_LASER_CANNON,
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
        weapon: weapons.YELLOW_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 4,
        shotDelay: 200
    }]
};

export default ships;