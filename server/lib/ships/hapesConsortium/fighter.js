import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MIYTILFIGHTER_HAPAN = {
    name: "Miy'til Starfighter",
    asset: "MIYTILFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 16,
    cost: 3,
    speed: 24,
    turnSpeed: .08,
    shield: 100,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_RAPID_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 15
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_ION_CANNON,
        shotsAtOnce: 4,
        shotDelay: 15
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 130
    }]
};

export default ships;