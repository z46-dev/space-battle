const heroes = {};

heroes["TI-99"] = {
    name: "TI-99",
    tooltip: "The tactical droid TI-99 was a tactical droid in service of the Confederacy of Independent Systems during the Clone Wars. TI-99 was the tactical droid on board Trench's flagship, the Invincible, during the Battle of Christophsis. TI-99 was destroyed when the Invincible was destroyed by Anakin Skywalker and Ahsoka Tano.",
    image: "TI-99.webp",
    ships: ["PROVIDENCEDESTROYER_CIS", "MUNIFICENT_HEAVY_CIS"],
    modifications: function(ship) {
        ship.shield *= 1.15;
        ship.maxShield *= 1.15;
        ship.shieldRegen *= 1.15;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.15;
            hp.maxHealth *= 1.15;
            hp.range *= 1.25;
        });

        if (ship.ti99RegenAbility === undefined) {
            ship.ti99RegenAbility = 0;
        }

        ship.ti99RegenAbility++;

        if (ship.ti99RegenAbility >= 15) {
            ship.ti99RegenAbility = 0;

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

heroes["AdmiralTrench"] = {
    name: "Admiral Trench",
    tooltip: "A fearsome Harch admiral of the CIS who prided himself on many victories against the Republic's best commanders and tacticians. Trench Commanded Providence-Class Dreadnoughts Invincible and Invulnerable, both which in the end proved to be anything but their names.",
    image: "Trench.png",
    ships: ["PROVIDENCEDREADNOUGHT_CIS"],
    modifications: function(ship) {
        ship.shield *= 1.6;
        ship.maxShield *= 1.6;
        ship.shieldRegen *= 1.6;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.3;
            hp.maxHealth *= 1.3;
            hp.damage *= 1.2;
            hp.range *= 1.6;
        });
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00015);
        });

        if (ship.trenchBurst === undefined) {
            ship.trenchBurst = {
                active: false,
                ticker: 0
            };
        }

        if (ship.trenchBurst.active) {
            ship.trenchBurst.ticker--;

            if (ship.trenchBurst.ticker <= 0) {
                ship.trenchBurst.active = false;
                ship.trenchBurst.ticker = 0;

                ship.hardpoints.forEach(hp => {
                    hp.damage /= 1.05;
                    hp.reload /= .15;
                    hp.tick = .5 * hp.reload * Math.random();
                });
            }
        } else {
            ship.trenchBurst.ticker++;

            if (ship.trenchBurst.ticker >= 800) {
                ship.trenchBurst.active = true;
                ship.trenchBurst.ticker = 250;

                ship.hardpoints.forEach(hp => {
                    hp.damage *= 1.05;
                    hp.reload *= .15;
                    hp.tick = 0;
                });
            }
        }
    }
};

heroes["NuteGunray"] = {
    name: "Nute Gunray",
    tooltip: "The Vicerory of the Trade Federation wasn't a great tactician, however what was lacking in the tactics department was more than made up with in resources and riches.",
    image: "Nute.png",
    ships: ["LUCREHULKBATTLESHIP_CIS", "MUNIFICENT_HEAVY_CIS"],
    modifications: function(ship) {
        ship.shield *= 1.1;
        ship.maxShield *= 1.1;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.1;
            hp.maxHealth *= 1.1;
        });
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00005);
        });
    }
};

heroes["Aut-0"] = {
    name: "Aut-0",
    tooltip: "Aut-0 was a Super Tactical Droid in service of the Confederacy of Independent Systems during the Clone Wars. Aut-0 was the admiral of a deep space fleet that was tasked with destroying the Republic's supply lines. Aut-0 commanded a Providence-class dreadnought.",
    image: "Aut0.webp",
    ships: ["PROVIDENCEDESTROYER_CIS", "PROVIDENCEDREADNOUGHT_CIS", "MUNIFICENT_HEAVY_CIS"],
    modifications: function(ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;
        ship.maxSpeed *= 1.25;
        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.1;
        });
    },
    onTick: function(ship) {
        if (ship.aut0Ability === undefined) {
            ship.aut0Ability = {
                active: false,
                ticker: 0
            };
        }

        if (ship.aut0Ability.active) {
            ship.aut0Ability.ticker --;

            if (ship.aut0Ability.ticker <= 0) {
                ship.aut0Ability.active = false;
                ship.aut0Ability.ticker = 0;

                ship.hardpoints.forEach(hp => {
                    if (hp.config.explodes) {
                        hp.damage /= 1.5;
                        hp.explosionDamage /= 1.15;
                        hp.explosionRange /= 1.25;
                    }

                    hp.tick -= .5 * hp.reload * Math.random();
                });

                ship.battle.displayText("Aut-0's ability has ended.");
            }
        } else {
            ship.aut0Ability.ticker ++;

            if (ship.aut0Ability.ticker >= 1500) {
                ship.aut0Ability.active = true;
                ship.aut0Ability.ticker = 300;
                ship.hardpoints.forEach(hp => {
                    if (hp.config.explodes) {
                        hp.damage *= 1.5;
                        hp.explosionDamage *= 1.15;
                        hp.explosionRange *= 1.25;
                    }
                });

                ship.battle.displayText("Aut-0's ability has been activated!");
            }
        }

        let k = 0;
        ship.battle.ships.forEach(s => {
            if (s.team === ship.team && s.maxShield > 100 && s.shield > 1) {
                s.shield = Math.min(s.maxShield, s.shield + s.maxShield * .00005);
                k ++;
            }
        });

        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00015);

            if (ship.aut0Ability.active && hp.config.explodes) {
                hp.tick += 3;
            }
        });

        if (ship.shield > 1) {
            ship.shield = Math.min(ship.maxShield, ship.shield + ship.maxShield * .0001 * (1 + k / 15));
        }
    }
};

heroes["General Kalani"] = {
    name: "General Kalani",
    tooltip: "Kalani was a Super Tactical Droid in service of the Confederacy of Independent Systems during the Clone Wars, and has survived past the conflict. One of the most effective tactical units in the Confederacy's army and navy, Kalani could manage large fleets and armys with great efficiency.",
    image: "KALANI.png",
    ships: ["DHOMNI_CIS", "BULWARKII_CIS"],
    modifications: function(ship) {
        ship.shield *= 1.75;
        ship.maxShield *= 1.75;
        ship.shieldRegen *= 1.75;
        ship.maxSpeed *= 1.25;
        ship.hardpoints.forEach(hp => {
            hp.health *= 1.6;
            hp.maxHealth *= 1.6;
        });
    },
    onTick: function(ship) {
        if (ship.kalaniAbility === undefined) {
            ship.kalaniAbility = {
                active: false,
                ticker: 0
            };
        }

        if (ship.kalaniAbility.active) {
            ship.kalaniAbility.ticker --;

            ship.battle.ships.forEach(s => {
                if (s.team === ship.team) {
                    if (s.maxShield > 1 && s.shield > 0) {
                        s.shield = Math.min(s.maxShield, s.shield + s.maxShield * .0005);
                    }

                    s.hardpoints.forEach(h => {
                        h.tick ++;
                        h.health = Math.min(h.maxHealth, h.health + h.maxHealth * .0005);
                    });
                }
            });

            if (ship.kalaniAbility.ticker <= 0) {
                ship.kalaniAbility.active = false;
                ship.kalaniAbility.ticker = 0;

                ship.battle.displayText("Kalani's ability has ended.");
            }
        } else {
            ship.kalaniAbility.ticker ++;

            if (ship.kalaniAbility.ticker >= 1500) {
                ship.kalaniAbility.active = true;
                ship.kalaniAbility.ticker = 300;
                ship.battle.displayText("Kalani's ability has been activated!");
            }
        }

        if (ship.shield > 1) {
            ship.shield = Math.min(ship.maxShield, ship.shield + ship.maxShield * .00025);
        }
    }
};

heroes["Grievous"] = {
    name: "General Grievous",
    tooltip: "Grievous was a Kaleesh cyborg general who held the title of Supreme Commander of the Droid Army during the Clone Wars. Known for his ruthlessness and combat prowess, Grievous was feared throughout the galaxy.",
    image: "Grievous.png",
    ships: ["PROVIDENCEDREADNOUGHT_CIS", "MUNIFICENT_HEAVY_CIS", "MUNIFICENT_CIS", "RECUSANTDREADNOUGHT_CIS", "SUBJUGATOR_CIS"],
    modifications: function(ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
            hp.range *= 2;
            hp.reload *= .85;
        });
    }
};

heroes["Dooku"] = {
    name: "Count Dooku",
    tooltip: "Count Dooku, also known as Darth Tyranus, was a Sith Lord who played a key role in the Confederacy of Independent Systems during the Clone Wars. Dooku was a master of the dark side of the Force and a skilled duelist.",
    image: "Dooku.png",
    ships: ["PROVIDENCEDREADNOUGHT_CIS", "DHOMNI_CIS", "SUBJUGATOR_CIS"],
    modifications: function(ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
            hp.range *= 2;
            hp.reload *= .85;
        });
    }
};

export default heroes;