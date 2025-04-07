import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.CHIMERADESTROYER_AURUM = {
    name: "Chimera-Class Destroyer",
    asset: "CHIMERA_DESTROYER.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 750,
    cost: 7250,
    speed: 4.25,
    turnSpeed: .015,
    shield: 9530,
    shieldRegen: 9,
    hardpoints: [{ // FRONT
        x: -.175,
        y: .725,
        weapon: weapons.BLACK_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.175,
        y: .575,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: .175,
        y: .725,
        weapon: weapons.BLACK_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .175,
        y: .575,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 120
    }, { // BACK
        x: -.125,
        y: -.8625,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.125,
        y: -.775,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: .125,
        y: -.8625,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .125,
        y: -.775,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 120
    }, { // MIDDLE
        x: 0,
        y: -0.04625,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 250
    }, {
        x: -.155,
        y: .01,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.155,
        y: -.11,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.155,
        y: -.55,
        weapon: weapons.BLACK_OCTUPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .155,
        y: .01,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .155,
        y: -.11,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .155,
        y: -.55,
        weapon: weapons.BLACK_OCTUPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4 | 0,
            range: e.weapon.range * 2 | 0,
            speed: e.weapon.speed * 2 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "SNUB1_AURUM"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "BLAST2_AURUM"
    }]
};

ships.ARGENTUMBATTLESHIP_AURUM = {
    name: "Argentum Battleship",
    asset: "ARGENTUM_BATTLESHIP.png",
    classification: shipTypes.Capital,
    population: 26,
    size: 800,
    cost: 12300,
    speed: 3,
    turnSpeed: .007,
    shield: 12450,
    shieldRegen: 12,
    hardpoints: (function() {
        const output = [{
            x: -.2,
            y: -.3,
            weapon: {
                ...weapons.SIEGE_CONCUSSION_MISSILE,
                reload: weapons.SIEGE_CONCUSSION_MISSILE.reload * 2.5
            },
            shotsAtOnce: 4,
            shotDelay: Math.random() * 1500 + 250
        }, {
            x: .2,
            y: -.3,
            weapon: {
                ...weapons.SIEGE_CONCUSSION_MISSILE,
                reload: weapons.SIEGE_CONCUSSION_MISSILE.reload * 2.5
            },
            shotsAtOnce: 4,
            shotDelay: Math.random() * 1500 + 250
        }];

        for (let i = 0; i < 6; i ++) {
            const angle = Math.PI / 3 * i;
            const d = .05;

            const x = Math.cos(angle) * d;
            const y = Math.sin(angle) * d;

            output.push({
                x: -.2 + x,
                y: -.3 + y,
                weapon: {
                    ...weapons.SIEGE_CONCUSSION_MISSILE,
                    reload: weapons.SIEGE_CONCUSSION_MISSILE.reload * 2.5
                },
                shotsAtOnce: 4,
                shotDelay: Math.random() * 1500 + 250
            }, {
                x: .2 + x,
                y: -.3 + y,
                weapon: {
                    ...weapons.SIEGE_CONCUSSION_MISSILE,
                    reload: weapons.SIEGE_CONCUSSION_MISSILE.reload * 2.5
                },
                shotsAtOnce: 4,
                shotDelay: Math.random() * 1500 + 250
            });
        }

        // Front wedge
        output.push({
            x: 0,
            y: .815,
            weapon: weapons.BLACK_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 130
        }, {
            x: -.2175,
            y: .58,
            weapon: weapons.BLACK_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 130
        }, {
            x: .2175,
            y: .58,
            weapon: weapons.BLACK_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 130
        });

        // Middle wedge
        output.push({
            x: 0,
            y: .5334,
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 130
        }, {
            x: -.3575,
            y: .195,
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 130
        }, {
            x: .3575,
            y: .195,
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 130
        });

        // Back wedge
        output.push({
            x: 0,
            y: .235,
            weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 30
        }, {
            x: -.22,
            y: .057,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 30
        }, {
            x: .22,
            y: .057,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 30
        }, {
            x: -.47,
            y: -.19,
            weapon: weapons.BLACK_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 30
        }, {
            x: .47,
            y: -.19,
            weapon: weapons.BLACK_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 30
        });

        // Anti-Fighter bulbs
        output.push({
            x: -.223,
            y: -.515,
            weapon: weapons.BLACK_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 15
        }, {
            x: .223,
            y: -.515,
            weapon: weapons.BLACK_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 15
        });

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 7 | 0,
                range: e.weapon.range * 1.8 | 0,
                speed: e.weapon.speed * 2 | 0,
                damage: e.weapon.damage * 1.334 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "SNUB1_AURUM"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "BLAST2_AURUM"
    }]
};

export default ships;