import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.SECUTOR_REPUBLIC = templates.superCapital.SECUTOR({
    color: "BLUE",
    fighter: "ARC170_REPUBLIC",
    interceptor: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC",
    heavyBomber: "NTB630_REPUBLIC"
});

ships.PRAETOR_REPUBLIC = templates.superCapital.PRAETOR_I({
    color: "BLUE"
});

// ships.MAELSTROM_REPUBLIC = {
//     name: "Maelstrom-Class Battlecruiser",
//     asset: "MAELSTROM_BATTLECRUISER.png",
//     classification: shipTypes.SuperCapital,
//     population: 50,
//     size: 1313,
//     cost: 11200,
//     speed: 2,
//     turnSpeed: .01,
//     shield: 16000,
//     shieldRegen: 7,
//     hardpoints: (function() {
//         const output = [];

//         for (let i = 0; i < 6; i ++) {
//             output.push({
//                 x: -.05 - .0375 * i,
//                 y: .95 - .175 * i,
//                 weapon: i % 2 ? weapons.TRIPLE_ION_CANNON_MEDIUM : weapons.BLUE_TRIPLE_LASER_CANNON_HEAVY,
//                 shotsAtOnce: 2,
//                 shotDelay: 60
//             });
//         }

//         for (let i = 0; i < 4; i ++) {
//             output.push({
//                 x: -.23 - .02 * i,
//                 y: -.07 - .08 * i,
//                 weapon: i % 2 ? weapons.BLUE_DOUBLE_TURBOLASER_CANNON : weapons.ASSAULT_PROTON_ROCKET,
//                 shotsAtOnce: 2,
//                 shotDelay: 100
//             }, {
//                 x: -.09,
//                 y: -.2 - .1 * i,
//                 weapon: weapons.BLUE_QUAD_TURBOLASER_CANNON_HEAVY,
//                 shotsAtOnce: 2,
//                 shotDelay: 100
//             });
//         }

//         for (let i = 0, l = output.length; i < l; i ++) {
//             output.push({
//                 ...structuredClone(output[i]),
//                 x: -output[i].x
//             });
//         }

//         output.push({
//             x: 0,
//             y: .95,
//             weapon: weapons.ASSAULT_PROTON_TORPEDO,
//             shotsAtOnce: 6,
//             shotDelay: 150
//         });

//         return output.map(hardpoint => ({
//             ...hardpoint,
//             weapon: {
//                 ...hardpoint.weapon,
//                 health: hardpoint.weapon.health * 4 | 0
//             }
//         }));
//     })(),
//     hangars: [{
//         x: 0,
//         y: 0,
//         maxSquadrons: 3,
//         squadronSize: 6,
//         reserveSize: 6,
//         squadronKey: "V19TORRENT_REPUBLIC"
//     }, {
//         x: 0,
//         y: 0,
//         maxSquadrons: 3,
//         squadronSize: 6,
//         reserveSize: 6,
//         squadronKey: "YWING_REPUBLIC"
//     }]
// };

ships.MAELSTROM_REPUBLIC = templates.superCapital.MAELSTROM();

ships.PROCURATOR_REPUBLIC = {
    name: "Procurator Battlecruiser",
    asset: "PROCURATOR_BATTLECRUISER.png",
    classification: shipTypes.SuperCapital,
    population: 50,
    size: 1313,
    cost: 11200,
    speed: 2,
    turnSpeed: .008,
    shield: 18300,
    shieldRegen: 18,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 12; i ++) {
            output.push({
                x: -.0875 - .04 * i,
                y: .875 - .125 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.ASSAULT_PROTON_ROCKET,
                shotsAtOnce: i % 2 ? 2 : 4,
                shotDelay: 60
            });
        }

        for (let i = 0; i < 5; i ++) {
            const x = -.1 - .06 * i;
            const y = .4 - .2 * i;

            for (let j = 0; j < 4; j ++) {
                const angle = Math.PI * 2 * j / 4;

                output.push({
                    x: x + .01 * Math.cos(angle),
                    y: y + .01 * Math.sin(angle),
                    weapon: weapons.ASSAULT_PROTON_TORPEDO,
                    shotsAtOnce: 2,
                    shotDelay: 60
                });
            }
        }

        for (let i = 0, l = output.length; i < l; i ++) {
            output.push({
                ...structuredClone(output[i]),
                x: -output[i].x
            });
        }

        output.push({
            x: 0,
            y: .95,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 6,
            shotDelay: 150
        });

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 6 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "V19TORRENT_REPUBLIC"
    }]
};

ships.MANDATOR_ONE_REPUBLIC = templates.superCapital.MANDATOR_ONE({
    color: "BLUE",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "NTB630_REPUBLIC"
});

ships.MANDATOR_TWO_REPUBLIC = templates.superCapital.MANDATOR_TWO({
    color: "BLUE",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "NTB630_REPUBLIC"
});

export default ships;