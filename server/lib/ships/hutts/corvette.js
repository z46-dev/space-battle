import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ACTIONVITRANSPORT_HUTT = templates.corvette.ACTION_VI_TRANSPORT({
    color: "PURPLE",
    asset: "ACTIONVITRANSPORTSTRIPE.png"
})

ships.CONSOLAR_HUTT = templates.corvette.CONSOLAR({
    color: "PURPLE"
});

ships.CR90_HUTT = templates.corvette.CR90({
    color: "PURPLE"
});

ships.LUPUSMISSILEFRIGATE_HUTT = templates.corvette.LUPUS_MISSILE_FRIGATE({
    color: "PURPLE"
});

ships.LIGHT_MINSTREL_HUTT = {
    name: "Light Minstrel Space Yacht",
    asset: "lightMinstrelSpaceYacht.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 90,
    cost: 150,
    speed: 9,
    turnSpeed: .03,
    shield: 500,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: -.5,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

ships.HEAVY_MINSTREL_HUTT = {
    name: "Heavy Minstrel Space Yacht",
    asset: "heavyMinstrelSpaceYacht.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 110,
    cost: 300,
    speed: 7,
    turnSpeed: .02,
    shield: 750,
    shieldRegen: 7.5,
    hardpoints: [{
        x: 0,
        y: -.5,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .5,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .5,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

// OLD REPUBLIC ERA HUTTS

ships.LIGHT_MINSTREL_ANCIENT_HUTT = {
    name: "Light Minstrel Space Yacht",
    asset: "lightMinstrelSpaceYacht.png",
    classification: shipTypes.Corvette,
    population: 3,
    size: 90,
    cost: 350,
    speed: 8,
    turnSpeed: .03,
    shield: 150,
    shieldRegen: .15,
    hardpoints: [{
        x: 0,
        y: -.5,
        weapon: weapons.PURPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }]
};

ships.HEAVY_MINSTREL_ANCIENT_HUTT = {
    name: "Heavy Minstrel Space Yacht",
    asset: "heavyMinstrelSpaceYacht.png",
    classification: shipTypes.Corvette,
    population: 4,
    size: 110,
    cost: 540,
    speed: 6,
    turnSpeed: .02,
    shield: 400,
    shieldRegen: 4,
    hardpoints: [{
        x: 0,
        y: -.5,
        weapon: weapons.PURPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: 0,
        y: -.5,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON
    }]
};

export default ships;