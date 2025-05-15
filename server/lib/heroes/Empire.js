import { shipTypes } from "../constants.js";

const heroes = {};

heroes["AdmiralPellaeon"] = {
    name: "Admiral Gillad Pellaeon",
    tooltip: "Admiral Gillad Pellaeon is a veteran of the Clone Wars and the Galactic Civil War. He is a strong leader and served under Grand Admiral Thrawn, which aided him in his tactical growth. He eventually became the leader of the Imperial Remnant, and ended up signing the treaty that ended the Galactic Civil War.",
    image: "Pellaeon.png",
    ships: ["EXECUTORSUPERSTARDESTROYER_EMPIRE", "IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;
        ship.maxSpeed *= 1.15;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.3;
            hp.maxHealth *= 1.3;
            hp.damage *= 1.3;
            hp.range *= 1.3;
            hp.reload *= .85;
        });
    },
    onTick: function (ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00025);
        });
    }
};

heroes["AdmiralPiett"] = {
    name: "Admiral Firmus Piett",
    tooltip: "Admiral Firmus Piett was the commander of Death Squadron, after Darth Vader killed Admiral Ozzel. He was a strong leader and was able to command the Executor during the Battle of Endor. He was killed when the Executor was destroyed by the Rebel Fleet.",
    image: "AdmiralPiett.webp",
    ships: ["EXECUTORSUPERSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.3;
        ship.maxShield *= 1.3;
        ship.shieldRegen *= 1.3;
        ship.maxSpeed *= 1.225;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 1.5;
        });
    },
    onTick: function (ship) {
        if (ship.piettAbility === undefined) {
            ship.piettAbility = {
                active: false,
                ticker: 0
            };
        }

        if (ship.piettAbility.active) {
            ship.piettAbility.ticker--;

            if (ship.piettAbility.ticker <= 0) {
                ship.piettAbility.active = false;
                ship.piettAbility.ticker = 0;

                ship.hardpoints.forEach(hp => {
                    hp.damage /= 1.1;
                });

                ship.battle.displayText("Piett's ability has ended.");
            }

            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield * .334, ship.shield + ship.maxShield * .0005));
        } else {
            ship.piettAbility.ticker++;

            if (ship.piettAbility.ticker >= 1200) {
                ship.piettAbility.active = true;
                ship.piettAbility.ticker = 300;

                ship.hardpoints.forEach(hp => {
                    hp.damage *= 1.1;
                });

                ship.battle.ships.forEach(s => {
                    if (s.team === ship.team && s.id !== ship.id) {
                        s.shield = Math.min(s.maxShield, s.shield + s.maxShield * .1);
                    }
                });

                ship.battle.displayText("Piett's ability has been activated!");
            }
        }

        ship.hardpoints.forEach(hp => {
            if (hp.health > 0) {
                hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00075);
            }

            if (ship.piettAbility.active) {
                hp.tick += 2.5;
            }
        });
    }
};

heroes["GrandAdmiralThrawn"] = {
    name: "Grand Admiral Thrawn",
    tooltip: "Grand Admiral Thrawn was a Chiss who was a brilliant tactician. He was able to defeat the New Republic on multiple occasions, and was able to take over the Empire after the death of Emperor Palpatine. He was eventually killed by his bodyguard, Rukh.",
    image: "AdmiralThrawn.jfif",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;
        ship.maxSpeed *= 1.3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
            hp.damage *= 1.2;
            hp.range *= 1.5;
            hp.reload *= .775;
        });

        ship.addHangar({
            x: 0,
            y: 0,
            offset: 0,
            direction: 0,
            maxSquadrons: 3,
            squadronSize: 3,
            reserveSize: 12,
            squadronKey: "TIEDEFENDER_EMPIRE"
        });
    },
    onTick: function (ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0003);
        });

        //ship.repelMissiles();
    }
};

heroes["GeneralDelvarus"] = {
    name: "Superior General Delvarus",
    tooltip: "General Delvarus was a warlord after the fall of the Empire, and the leader of the Eriadu Authority. He assumed command after coming into command of the Executor-class Star Dreadnought Nighthammer.",
    image: "DELVARUS.webp",
    ships: ["EXECUTORSUPERSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.4;
        ship.maxShield *= 1.4;
        ship.shieldRegen *= 2;
        ship.maxSpeed *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.2;
            hp.maxHealth *= 1.2;
            hp.range *= 3;
            hp.reload *= 1.3;
            hp.damage *= 1.5;
        });

        ship.asset = "NIGHTHAMMER.png";
    },
    onTick: function (ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .001);
        });
    }
};

heroes["CapBrandei"] = {
    name: "Captain Brandei",
    tooltip: "Captain Brandei was a force-attuned Imperial officer who served under Grand Admiral Thrawn's command during the superior's campaign. He commands the Imperial Star Destroyer Judicator, and the Bellator-class Star Destroyer Dominion.",
    image: "Brandei.webp",
    ships: ["BELLATORSUPERSTARDESTROYER_EMPIRE", "IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.2;
        ship.maxShield *= 1.2;
        ship.shieldRegen *= 1.1;
        ship.maxSpeed *= 1.15;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.1;
            hp.maxHealth *= 1.1;
            hp.range *= 1.2;
        });
    },
    onTick: function (ship) {
        if (ship.shield > 0 && ship.shield < ship.maxShield) {
            ship.shield = Math.min(ship.maxShield, ship.shield + ship.maxShield * .0001);
        }
    }
};

heroes["AdmiralCorburn"] = {
    name: "Admiral Corburn",
    tooltip: "Admiral Corburn was a veteran of the Clone Wars and knew how to utilize smaller ship types to their fullest potential. He commanded a modified Imobilizer-418 cruiser, the Constrainer, and the Legator-class Star Dreadnought Intimidator.",
    image: "Corburn.png",
    ships: ["IMOBILIZER_EMPIRE", "LEGATORSTARDREADNOUGHT_EMPIRE"],
    modifications: function (ship) {
        switch (ship.key) {
            case "IMOBILIZER_EMPIRE":
                ship.shield *= 4;
                ship.maxShield *= 4;
                ship.shieldRegen *= 2;
                ship.maxSpeed *= 1.25;

                ship.hardpoints.forEach(hp => {
                    hp.health *= 2;
                    hp.maxHealth *= 2;
                    hp.range *= 2;
                    hp.damage *= 2;
                    hp.range *= 2;
                    hp.reload *= .667;
                });
                break;
            case "LEGATORSTARDREADNOUGHT_EMPIRE":
                ship.shield *= 1.2;
                ship.maxShield *= 1.2;
                ship.shieldRegen *= 1.1;
                ship.maxSpeed *= 1.15;

                ship.hardpoints.forEach(hp => {
                    hp.health *= 1.1;
                    hp.maxHealth *= 1.1;
                    hp.range *= 1.2;
                });
                break;
        }
    },
    onTick: function (ship) {
        if (ship.shield > 0 && ship.shield < ship.maxShield) {
            ship.shield = Math.min(ship.maxShield, ship.shield + ship.maxShield * .00025);
        }

        if (ship.key === "IMOBILIZER_EMPIRE") {
            ship.repelMissiles();
        }
    }
};

heroes["Konstantine"] = {
    name: "Admiral Konstantine",
    tooltip: "Admiral Konstantine was an admiral of the Empire who rose to power due to his political connections. He was a poor tactician, and was eventually killed by Commander Sato at the Battle of Atollon due to his greed and power-hungry nature.",
    image: "Konstantine.jfif",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE", "IMOBILIZER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.2;
        ship.maxShield *= 1.2;
        ship.shieldRegen *= 1.1;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.1;
            hp.maxHealth *= 1.1;
            hp.range *= 2;
        });
    }
};

heroes["TerisaKerrill"] = {
    name: "Terisa Kerill",
    tooltip: "Terisa Kerrill was a competent captain of the ISD Retribution. She commanded Titan Squadron, which was a squadron of TIE fighters that were quite effective.",
    image: "Terisa_Kerrill.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.2;
            hp.maxHealth *= 1.2;
            hp.range *= 1.5;
        });

        ship.addHangar({
            x: 0,
            y: 0,
            offset: 0,
            direction: 0,
            maxSquadrons: 1,
            squadronSize: 5,
            reserveSize: 0,
            squadronKey: "TITAN_SQUADRON_EMPIRE"
        });
    }
};

heroes["RaeSloane"] = {
    name: "Rae Sloane",
    tooltip: "Rae Sloane was a Grand Admiral of the Empire after the fall of the Empire. She lead the Imperial Remnant and lead the Empire to its defeat at the Battle of Jakku to support the birth of the First Order.",
    image: "RaeSloane.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE", "EXECUTORSUPERSTARDESTROYER_EMPIRE", "BELLATORSUPERSTARDESTROYER_EMPIRE", "LEGATORSTARDREADNOUGHT_EMPIRE", "VENGEANCE_EMPIRE", "ASSERTORSTARDREADNOUGHT_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
            hp.range *= 2;
            hp.reload *= .75;
        });

        ship.addHangar({
            x: 0,
            y: 0,
            offset: 0,
            direction: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 8,
            squadronKey: "TIEREAPER_EMPIRE"
        });
    }
};

heroes["GMTarkin"] = {
    name: "Grand Moff Tarkin",
    tooltip: "Grand Moff Tarkin was a brilliant tactician and the commander of the Death Star. He was a ruthless leader who relied on fear to control the galaxy. He was killed by Luke Skywalker during the Battle of Yavin.",
    image: "GMTarkin.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.6;
        ship.maxShield *= 1.6;
        ship.shieldRegen *= 1.6;
        ship.maxSpeed *= 1.25;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.3;
            hp.maxHealth *= 1.3;
            hp.range *= 1.1;
            hp.damage *= 1.05;
            hp.reload *= .95;
        });

        ship.classification = shipTypes.Corvette;
        ship.tarkinCallInTick = 0;
    },
    onTick: function (ship) {
        ship.tarkinCallInTick++;

        if (ship.tarkinCallInTick >= 1500) {
            ship.tarkinCallInTick = -Infinity;

            ship.battle.spawn("ARQUITENS_EMPIRE", ship.team, ship.x + Math.random() * ship.size * 2 - ship.size, ship.y + Math.random() * ship.size * 2 - ship.size).onDead = function () {
                ship.tarkinCallInTick = 0;
            }

            ship.battle.displayText("Tarkin has called in reinforcements!");
        }
    }
};

export default heroes;