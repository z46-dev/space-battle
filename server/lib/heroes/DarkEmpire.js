import { shipTypes } from "../constants.js";

const heroes = {};

heroes["ArdusKaine"] = {
    name: "Ardus Kaine",
    tooltip: "Grand Moff Ardus Kaine was the leader of the Pentastar Alignment, a splinter faction of the Imperial Remnant. He was ruthless and cunning, but valued keeping his forces' autonomy, rarely dedicating all of his assets to battle.",
    image: "ardusKaine.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;
        ship.maxSpeed *= 1.5;
    },
    onTick: function (ship) {
        ship.hardpoints.forEach(hp => {
            if (hp.health > 0) {
                hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0001);
            }
        });
    }
};

heroes["Cronal"] = {
    name: "Cronal",
    tooltip: "Lord Cronal was a Sith Acolyte who served the Emperor during the Galactic Civil War. He used the dark side of the Force to enhance his abilities, and was a master of deception and manipulation. During the Galactic Civil War, he commanded the Imperial Intelligence Division, and managed the ISB during the Imperial Remnant.",
    image: "cronal.png",
    ships: ["IMPERIALSTARDESTROYER_DARKEMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.2;
        ship.maxShield *= 1.2;
        ship.shieldRegen *= 1.2;
        ship.maxSpeed *= 1.2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.2;
            hp.maxHealth *= 1.2;
            hp.range *= 1.2;
        });

        ship.asset = "ISD_CRONAL.png";
    },
    onTick: function (ship) {
        if (ship.cronalAbility === undefined) {
            ship.cronalAbility = {
                active: false,
                ticker: 0
            };
        }

        if (ship.cronalAbility.active) {
            ship.cronalAbility.ticker--;

            if (ship.cronalAbility.ticker <= 0) {
                ship.cronalAbility.active = false;
                ship.cronalAbility.ticker = 0;

                ship.hardpoints.forEach(hp => {
                    hp.damage /= 1.1;
                });

                ship.battle.displayText("Cronal's ability has ended.");
            }

            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield * .334, ship.shield + ship.maxShield * .0005));
        } else {
            ship.cronalAbility.ticker++;

            if (ship.cronalAbility.ticker >= 1200) {
                ship.cronalAbility.active = true;
                ship.cronalAbility.ticker = 300;

                ship.hardpoints.forEach(hp => {
                    hp.damage *= 1.1;
                });

                ship.battle.ships.forEach(s => {
                    if (s.team === ship.team && s.id !== ship.id) {
                        s.shield = Math.min(s.maxShield, s.shield + s.maxShield * .02);
                    }
                });

                ship.battle.displayText("Cronal's ability has been activated!");
            }
        }

        ship.hardpoints.forEach(hp => {
            if (hp.health <= 0) {
                if (hp.tick >= 50) {
                    hp.tick = 0;
                    hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0001);
                }
            } else {
                hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0001);
            }

            if (ship.cronalAbility.active) {
                hp.tick += 2.5;
            }
        });
    }
};

heroes["NatasiDaala"] = {
    name: "Natasi Daala",
    tooltip: "Natasi Daala was the first female to ever reach the rank of Admiral in the Imperial Navy. She eventually was crowned Chief of State of the Galactic Alliance, far after the fall of the Empire. She was a brilliant tactician, and was known for her loyalty to allies.",
    image: "natasiDaala.png",
    ships: ["IMPELLORFLEETCARRIER_DARKEMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;
        ship.maxSpeed *= 1.1;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
            hp.damage *= 1.2;
            hp.range *= 1.5;
            hp.reload *= .775;
        });
    },
    onTick: function (ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00025);
        });
    }
};

heroes["SatePestage"] = {
    name: "Sate Pestage",
    tooltip: "One of the most trusted and powerful advisors to Emperor Palpatine, Pestage was a master of manipulation and deception. He was a brilliant tactician, and was known for his ruthlessness and cunning, which he used to lead the Empire after Palpatine's first fall at Endor.",
    image: "satePestage.png",
    ships: ["TORPEDOSPHERE_DARKEMPIRE"],
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
    },
    onTick: function (ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0001);
        });
    }
};

heroes["YsanneIsard"] = {
    name: "Ysanne Isard",
    tooltip: "Ysanne Isard was a master of the art of war, and was known for her position as the Director of Imperial Intelligence.",
    image: "ysanneIsard.png",
    ships: ["INTERDICTORSTARDESTROYER_DARKEMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 2;
            hp.damage *= 1.5;
        });
    },
    onTick: function (ship) {
        if (ship.shield > 0 && ship.shield < ship.maxShield) {
            ship.shield = Math.min(ship.maxShield, ship.shield + ship.maxShield * .00025);

            ship.hardpoints.forEach(hp => {
                if (hp.health > 0) {
                    hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00015);
                }
            });
        }

        ship.repelMissiles();
    }
};

heroes["Zsinj"] = {
    name: "Warlord Zsinj",
    tooltip: "Zsinj was a warlord of the Empire who commanded the Iron Fist, an exclusive dreadnought. He was the leader of the Zsinj Empire, a splinter faction of the Imperial Remnant.",
    image: "zsinj.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
        });
    }
};

export default heroes;