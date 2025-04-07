import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.DIEMOSFRIGATE_AURUM = {
    name: "Diemos-Class Frigate",
    asset: "DIEMOS.png",
    classification: shipTypes.Frigate,
    population: 9,
    size: 280,
    cost: 780,
    speed: 6,
    turnSpeed: .02,
    shield: 3890,
    shieldRegen: 6,
    hardpoints: [{
        x: 0,
        y: .4,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 70
    }, {
        x: -.315,
        y: .28,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 110
    }, {
        x: .315,
        y: .28,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 110
    }, {
        x: 0,
        y: -.395,
        weapon: weapons.BLACK_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 60
    }, {
        x: -.105,
        y: -.645,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 110
    }, {
        x: .105,
        y: -.645,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 110
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 3 | 0,
            range: e.weapon.range * 2.5 | 0,
            speed: e.weapon.speed * 1.8 | 0,
            damage: e.weapon.damage * 1.2 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "SNUB1_AURUM"
    }]
};

export default ships;