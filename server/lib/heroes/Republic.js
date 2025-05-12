import { shipTypes } from "../constants.js";

const heroes = {};

heroes["Yularen"] = {
    name: "Admiral Wullf Yularen",
    tooltip: "Admiral Wullf Yularen is a veteran of the Clone Wars and a master tactician. He is a strong leader and worked with Jedi Generals like Anakin Skywalker and Obi-Wan Kenobi. He is a strong leader and a tactical genius, and he is a valuable asset to any fleet.",
    image: "Yularen.png",
    ships: ["VENATOR_REPUBLIC"],
    modifications: function (ship) {
        ship.shield *= 1.25;
        ship.maxShield *= 1.25;
        ship.shieldRegen *= 1.25;
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
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0005);
        });
    }
};

heroes["CapPellaeon"] = {
    name: "Captain Gilad Pellaeon",
    tooltip: "Captain Gilad Pellaeon was a tactical genius during the Clone Wars. He worked with Jedi, including Ahsoka Tano and Anakin Skywalker. He is a strong leader and would go on to become a Grand Admiral in the Galactic Empire.",
    image: "Pellaeon.png",
    ships: ["ACCLIMATOR_REPUBLIC"],
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
        if (ship.pellaeonAbility === undefined) {
            ship.pellaeonAbility = {
                active: false,
                ticker: 0
            };
        }

        if (ship.pellaeonAbility.active) {
            ship.pellaeonAbility.ticker--;

            if (ship.pellaeonAbility.ticker <= 0) {
                ship.pellaeonAbility.active = false;
                ship.pellaeonAbility.ticker = 0;

                ship.hardpoints.forEach(hp => {
                    hp.damage /= 1.05;
                });

                ship.battle.displayText("Pellaeon's ability has ended.");
            }

            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield * .334, ship.shield + ship.maxShield * .0005));
        } else {
            ship.pellaeonAbility.ticker++;

            if (ship.pellaeonAbility.ticker >= 1200) {
                ship.pellaeonAbility.active = true;
                ship.pellaeonAbility.ticker = 300;

                ship.hardpoints.forEach(hp => {
                    hp.damage *= 1.05;
                });

                ship.battle.ships.forEach(s => {
                    if (s.team === ship.team && s.id !== ship.id) {
                        s.shield = Math.min(s.maxShield, s.shield + s.maxShield * .1);
                    }
                });

                ship.battle.displayText("Pellaeon's ability has been activated!");
            }
        }

        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00075);

            if (ship.pellaeonAbility.active) {
                hp.tick += 1.334;
            }
        });
    }
};

heroes["AdarTallon"] = {
    name: "Captain Adar Tallon",
    tooltip: "Adar Tallon made a name for himself during the Clone Wars due to his tactical exploits. He had a good moral compass and was a strong leader. He would go on to serve as a tactician in the Rebel Alliance.",
    image: "AdarTallon.webp",
    ships: ["ACCLIMATOR_REPUBLIC"],
    modifications: function (ship) {
        ship.shield *= 1.3;
        ship.maxShield *= 1.3;
        ship.shieldRegen *= 1.3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.3;
            hp.maxHealth *= 1.3;
        });
    },
    onTick: function (ship) {
        if (ship.tallonRegenAbility === undefined) {
            ship.tallonRegenAbility = 0;
        }

        ship.tallonRegenAbility++;

        if (ship.tallonRegenAbility >= 15) {
            ship.tallonRegenAbility = 0;

            ship.battle.ships.forEach(s => {
                if (s.team === ship.team && s.shield > 0) {
                    s.shield = Math.min(s.maxShield, s.shield + s.maxShield * .0025);
                }
            });
        }
    }
};

heroes["AdmiralWieler"] = {
    name: "Admiral Wieler",
    tooltip: "Admiral Wieler served with Jedi General Plo Koon during the Clone Wars. He worked well in large battle groups and cared about those under his command.",
    image: "AdmiralWieler.webp",
    ships: ["VENATOR_REPUBLIC"],
    modifications: function (ship) {
        ship.shield *= 1.2;
        ship.maxShield *= 1.2;
        ship.shieldRegen *= 1.2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
        });
    },
    onTick: function (ship) {
        if (ship.wielerRegenAbility === undefined) {
            ship.wielerRegenAbility = 0;
        }

        ship.wielerRegenAbility++;

        if (ship.wielerRegenAbility >= 25) {
            ship.wielerRegenAbility = 0;

            ship.battle.ships.forEach(s => {
                if (s.team === ship.team && s.classification >= shipTypes.Corvette) {
                    if (s.shield > 0) {
                        s.shield = Math.min(s.maxShield, s.shield + s.maxShield * .00175);
                    }

                    s.hardpoints.forEach(hp => {
                        hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00075);
                    });
                }
            });
        }
    }
};

heroes["AdmiralCorburnCW"] = {
    name: "Admiral Corburn",
    tooltip: "Admiral Wieler served with Jedi General Plo Koon and Commander Ahsoka Tano during the Clone Wars. he cared about the individuals serving under him and displayed a remarkable amount of calm collectedness in battle.",
    image: "Corburn.png",
    ships: ["ARQUITENS_REPUBLIC"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;
        ship.maxSpeed *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.range *= 2;
            hp.damage *= 2;
            hp.reload *= .334;
        });

        ship.classification = shipTypes.Corvette;
    },
    onTick: function (ship) {
        if (ship.corburnBurst === undefined) {
            ship.corburnBurst = {
                active: false,
                ticker: 0
            };
        }

        if (ship.corburnBurst.active) {
            ship.corburnBurst.ticker--;

            if (ship.corburnBurst.ticker <= 0) {
                ship.corburnBurst.active = false;
                ship.corburnBurst.ticker = 0;

                ship.hardpoints.forEach(hp => {
                    hp.damage /= 1.05;
                    hp.reload /= .15;
                    hp.tick = .5 * hp.reload * Math.random();
                });
            }
        } else {
            ship.corburnBurst.ticker++;

            if (ship.corburnBurst.ticker >= 500) {
                ship.corburnBurst.active = true;
                ship.corburnBurst.ticker = 250;

                ship.hardpoints.forEach(hp => {
                    hp.damage *= 1.05;
                    hp.reload *= .15;
                    hp.tick = 0;
                });
            }
        }
    }
};

heroes["CWTarkin"] = {
    name: "Captain Tarkin",
    tooltip: "Captain Tarkin served with Jedi General Evan Piel during the Clone Wars. He was a political leader who relied on being close to Palpatine to advance his career. He was leader who lead through fear and intimidation.",
    image: "CWTarkin.png",
    ships: ["VENATOR_REPUBLIC", "PRAETOR_REPUBLIC"],
    modifications: function (ship) {
        ship.shield *= 1.4;
        ship.maxShield *= 1.4;
        ship.shieldRegen *= 1.4;
        ship.maxSpeed *= 1.25;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.1;
            hp.maxHealth *= 1.1;
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

            ship.battle.spawn("ACCLIMATOR_REPUBLIC", ship.team, ship.x + Math.random() * ship.size * 2 - ship.size, ship.y + Math.random() * ship.size * 2 - ship.size).onDead = function () {
                ship.tarkinCallInTick = 0;
            }

            ship.battle.displayText("Tarkin has called in reinforcements!");
        }
    }
};

export default heroes;