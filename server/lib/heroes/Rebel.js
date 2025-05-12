import { shipTypes } from "../constants.js";

const heroes = {};

heroes["AdmiralRaddus"] = {
    name: "Admiral Raddus",
    tooltip: "A Mon Calamari Admiral who led the Rebel fleet at the Battle of Scarif, Raddus was a tactician and a fighter for what he believed was good for all people of the galaxy. He commanded a modified MC-75 Cruiser, the Profundity, and was known for his ability to inspire his troops to fight against tyranny.",
    image: "AdmiralRaddus.webp",
    ships: ["MC75_REBEL", "MC90_REBEL"],
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
        if (ship.raddusAbility === undefined) {
            ship.raddusAbility = {
                active: false,
                ticker: 0
            };
        }

        if (ship.raddusAbility.active) {
            ship.raddusAbility.ticker--;

            if (ship.raddusAbility.ticker <= 0) {
                ship.raddusAbility.active = false;
                ship.raddusAbility.ticker = 0;

                ship.hardpoints.forEach(hp => {
                    hp.damage /= 1.3;
                });

                ship.battle.displayText("Raddus's ability has ended.");
            }

            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield * .334, ship.shield + ship.maxShield * .0005));
        } else {
            ship.raddusAbility.ticker++;

            if (ship.raddusAbility.ticker >= 1200) {
                ship.raddusAbility.active = true;
                ship.raddusAbility.ticker = 300;

                ship.hardpoints.forEach(hp => {
                    hp.damage *= 1.3;
                });

                ship.battle.ships.forEach(s => {
                    if (s.team === ship.team && s.id !== ship.id) {
                        s.shield = Math.min(s.maxShield, s.shield + s.maxShield * .1);
                    }
                });

                ship.battle.displayText("Raddus's ability has been activated!");
            }
        }

        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00075);

            if (ship.raddusAbility.active) {
                const selfDmg = hp.maxHealth * .001;

                if (hp.health - selfDmg >= hp.maxHealth * .2) {
                    hp.health -= selfDmg;
                }

                hp.tick += 5;
            }
        });
    }
};

heroes["AdmiralAckbar"] = {
    name: "Admiral Ackbar",
    tooltip: "The Supreme Commander of the Rebel Alliance Fleet, Ackbar was a Mon Calamari Admiral who led the Rebel fleet at the Battle of Endor. He was known for his tactical genius and his ability to inspire his troops to fight against tyranny. He commanded a modified MC-80 Cruiser, the Home One, and was a key figure in the Alliance's victory at Endor.",
    image: "AdmiralAckbar.webp",
    ships: ["MC80A_REBEL", "MC85_REBEL", "MC90_REBEL"],
    modifications: function(ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 1.15;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.range *= 2;
            hp.reload *= .8;
            hp.damage *= 1.2;
        });

        if (ship.ackbarRegenAbility === undefined) {
            ship.ackbarRegenAbility = 0;
        }
    },
    onTick: function(ship) {
        ship.ackbarRegenAbility++;

        if (ship.ackbarRegenAbility >= 15) {
            ship.ackbarRegenAbility = 0;

            ship.battle.ships.forEach(s => {
                if (s.team === ship.team && s.classification >= shipTypes.Corvette) {
                    if (s.shield > 0) {
                        s.shield = Math.min(s.maxShield, s.shield + s.maxShield * .0025);
                    }

                    s.hardpoints.forEach(hp => {
                        hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00125);
                    });
                }
            });
        }
    }
};

heroes["GarmBelIblis"] = {
    name: "Garm Bel Iblis",
    tooltip: "A Corellian Senator and leader of the Corellian Resistance, Garm Bel Iblis was a key figure in the early days of the Rebel Alliance. His tactical prowess and ability to work well with others made him a valuable asset to the Alliance, and later the New Republic. He commanded a modified Nebulon-B Escort Frigate, the Thunderstrike, and could draw a winning strategy from even the most dire of situations.",
    image: "GarmBelIblis.webp",
    ships: ["NEBULONB_REBEL", "DREADNOUGHTHEAVYCRUISER_REBEL", "MC85_REBEL"],	
    modifications: function(ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 5;
            hp.maxHealth *= 5;
            hp.range *= 2;
        });
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .001);
        });

        if (ship.garmBurst === undefined) {
            ship.garmBurst = {
                active: false,
                ticker: 0
            };
        }

        if (ship.garmBurst.active) {
            ship.garmBurst.ticker--;

            if (ship.garmBurst.ticker <= 0) {
                ship.garmBurst.active = false;
                ship.garmBurst.ticker = 0;

                ship.hardpoints.forEach(hp => {
                    hp.damage /= 1.2;
                    hp.reload /= .15;
                    hp.tick = .5 * hp.reload * Math.random();
                });
            }
        } else {
            ship.garmBurst.ticker++;

            if (ship.garmBurst.ticker >= 800) {
                ship.garmBurst.active = true;
                ship.garmBurst.ticker = 100;

                ship.hardpoints.forEach(hp => {
                    hp.damage *= 1.2;
                    hp.reload *= .15;
                    hp.tick = 0;
                });
            }
        }
    }
};

heroes["GeneralDodonna"] = {
    name: "General Dodonna",
    tooltip: "A defector from the Imperial Navy, General Dodonna was a great part of the Alliance intelligence network. His command was designated over a modified Starhawk-class Battleship, the Amity, and he was known for his ability to inspire his troops to fight against tyranny. He was a key figure in the Alliance's victory at Yavin.",
    image: "GeneralDodonna.webp",
    ships: ["STARHAWK_REBEL", "MC80A_REBEL"],
    modifications: function(ship) {
        ship.shield *= 1.6;
        ship.maxShield *= 1.6;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.3;
            hp.maxHealth *= 1.3;
        });

        ship.tractorBeam = {
            lock: null,
            timer: 50
        };
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0001);
        });

        if (ship.ai == null) {
            return;
        }

        const currTarget = ship.ai.target;

        if (currTarget == null) {
            ship.tractorBeam.lock = null;
            return;
        }

        if (ship.tractorBeam.lock == null || ship.tractorBeam.lock.id !== currTarget.id) {
            ship.tractorBeam.lock = currTarget;
            ship.tractorBeam.timer = 51;
        } else if (ship.tractorBeam.lock.health <= .001) {
            ship.tractorBeam.lock = null;
            return;
        }

        ship.tractorBeam.timer--;

        if (ship.tractorBeam.timer <= 0) {
            const dist = ship.size + ship.tractorBeam.lock.size + 100;
            const projX = ship.x + Math.cos(ship.angle) * dist;
            const projY = ship.y + Math.sin(ship.angle) * dist;

            const dx = ship.tractorBeam.lock.x - projX;
            const dy = ship.tractorBeam.lock.y - projY;

            const angle = Math.atan2(dy, dx) + Math.PI;

            ship.tractorBeam.lock.x += Math.cos(angle) * ship.tractorBeam.lock.maxSpeed * 1.5;
            ship.tractorBeam.lock.y += Math.sin(angle) * ship.tractorBeam.lock.maxSpeed * 1.5;

            ship.tractorBeam.lock.hardpoints.forEach(hp => {
                hp.tick -= .25;
            });
        }
    }
};

heroes["WedgeAntilles"] = {
    name: "Wedge Antilles",
    tooltip: "A Corellian pilot and leader of Rogue Squadron, Wedge Antilles was a key figure in the Alliance's victory at Endor. He was known for his ability to inspire his pilots to become the best fighter pilots in the galaxy, and his tactical prowess. He commanded a modified Executor-class Star Dreadnought, the Lusankya, and was a prominent figure in the New Republic's fight against the Empire.",
    image: "WedgeAntilles.webp",
    ships: ["MC85_REBEL", "MC80BLIBERTY_REBEL"],
    modifications: function(ship) {
        ship.shield *= 1.6;
        ship.maxShield *= 1.6;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.3;
            hp.maxHealth *= 1.3;
        });
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0001);
        });
    }
};

heroes["HanAndChewie"] = {
    name: "Han and Chewie",
    tooltip: "A Corellian smuggler and his Wookiee co-pilot, Han Solo and Chewbacca were key figures in the Alliance's victory at Endor. They were known for their ability to inspire their troops to fight against tyranny, and their piloting skills.",
    image: "HanChewie.webp",
    ships: ["FALCON_REBEL", "MC80B_REBEL"],
    modifications: function(ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.reload *= .75;
        });
    }
};

heroes["JunSato"] = {
    name: "Commander Jun Sato",
    tooltip: "The compassionate rebel leader of the Phoenix Squadron, Sato was a well loved leader who commanded a modified Quasar-Class Fire Carrier the Phoenix Nest. He lost his life at the battle of Atollon when going up against Grand Admiral Thrawn, heroically sacrificing himself so the Rebellion would go on.",
    image: "CommanderSato.webp",
    ships: ["QUASAR_REBEL", "MC50_REBEL", "MC80BLIBERTY_REBEL", "PELTA_REBEL"],
    modifications: function(ship) {
        ship.shield *= 4;
        ship.maxShield *= 4;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.reload *= .75;
            hp.damage *= .75;
        });

        ship.addHangar({
            x: 0,
            y: 0,
            offset: 0,
            direction: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 3,
            squadronKey: "YWING_REBEL"
        });
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0001);
        });

        ship.hangars.forEach(hangar => {
            hangar.hangarSize = Math.max(1, hangar.hangarSize);
        });
    }
};

heroes["GeneralLeiaOrganaSolo"] = {
    name: "General Leia Organa Solo",
    tooltip: "The Princess of Alderaan and leader of the Resistance, Leia Organa Solo was a key figure in the Rebel Alliance's victory at Endor. She was known for her ability to inspire her troops to fight against tyranny, and her leadership skills. She commanded a modified MC-90 Cruiser, the Hope, and was a prominent figure in the New Republic's fight against the Empire.",
    image: "leia.png",
    ships: ["MC85_REBEL", "MC80BLIBERTY_REBEL", "MC90_REBEL"],
    modifications: function(ship) {
        ship.shield *= 4;
        ship.maxShield *= 4;

        ship.hardpoints.forEach(hp => {
            hp.health *= 4;
            hp.maxHealth *= 4;
            hp.reload *= .7;
            hp.damage *= .8;
        });

        ship.addHangar({
            x: 0,
            y: 0,
            offset: 0,
            direction: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 3,
            squadronKey: "YWING_REBEL"
        });

        ship.addHangar({
            x: 0,
            y: 0,
            offset: 0,
            direction: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 3,
            squadronKey: "AWING_REBEL"
        });
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00025);
        });
    }
};

heroes["AdmriralTallon"] = {
    name: "Admiral Adar Tallon",
    tooltip: "Adar Tallon made a name for himself during the Clone Wars due to his tactical exploits. He had a good moral compass and was a strong leader. He would go on to serve as a major tactician in the Rebel Alliance.",
    image: "AdarTallon.webp",
    ships: ["MC90_REBEL", "BLUEDIVER_REBEL"],
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

heroes["IdenVersio"] = {
    name: "Iden Versio",
    tooltip: "Iden Versio was a former Imperial commander who defected to the Rebellion after witnessing the horrors of the Empire. She ended up commanding a group, Inferno Squadron, which went on often unsanctioned missions to support the Rebellion, and later the Resistance.",
    image: "IdenVersio.png",
    ships: ["CR90_REBEL"],
    modifications: function(ship) {
        ship.shield *= 5;
        ship.maxShield *= 5;
        ship.speed *= 1.25;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.reload *= .5;
            hp.damage *= 2;
            hp.speed *= 1.2;
            hp.range *= 1.5;
        });
    }
};

export default heroes;