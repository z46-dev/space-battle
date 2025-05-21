import { shipTypes } from "../constants.js";

const heroes = {};

heroes["Jabba The Hutt"] = {
    name: "Jabba The Hutt",
    tooltip: "Jabba The Hutt is a powerful crime lord who has a lot of influence in the galaxy. He is known for his cunning and his ability to get what he wants. He is also known for his love of luxury and his extravagant lifestyle.",
    image: "jabbaTheHutt.png",
    ships: ["KARAGGA_HUTT"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;
        ship.maxSpeed *= 1.25;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 2;
            hp.damage *= 1.25;
        });
    },
    onTick: function (ship) {
        if (ship.jabbaAbility === undefined) {
            ship.jabbaAbility = {
                active: false,
                ticker: 0
            };
        }

        if (ship.jabbaAbility.active) {
            ship.jabbaAbility.ticker--;

            if (ship.jabbaAbility.ticker <= 0) {
                ship.jabbaAbility.active = false;
            }

            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield * .334, ship.shield + ship.maxShield * .0005));
        } else {
            ship.jabbaAbility.ticker++;

            if (ship.jabbaAbility.ticker >= 1200) {
                ship.jabbaAbility.active = true;
                ship.jabbaAbility.ticker = 300;
            }
        }

        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .000025);

            if (ship.jabbaAbility.active) {
                const selfDmg = hp.maxHealth * .0005;

                if (hp.health - selfDmg >= hp.maxHealth * .2) {
                    hp.health -= selfDmg;
                }

                hp.tick += 10;
            }
        });
    }
};

heroes["Gorga The Hutt"] = {
    name: "Gorga The Hutt",
    tooltip: "Gorga The Hutt was a member of the Hutt Ruling Council, and nephew of Jabba The Hutt. Gorga preferred to remain neutral on the council, but still had a pension for playing in the shadows.",
    image: "gorgaTheHutt.png",
    ships: ["VORACIOUS_HUTT"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.reload *= .85;
        });

        ship.gorgaReinforcements = 0;
    },
    onTick: function (ship) {
        if (ship.shield > 0) {
            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield * .334, ship.shield + ship.maxShield * .001));
        }

        ship.gorgaReinforcements++;

        if (ship.gorgaReinforcements >= 256) {
            ship.gorgaReinforcements = -Infinity;

            ship.battle.spawn("UBRIKKIAN_HUTT", ship.team, ship.x + Math.random() * ship.size * 2 - ship.size, ship.y + Math.random() * ship.size * 2 - ship.size).onDead = function () {
                ship.gorgaReinforcements = 0;
            }

            ship.battle.displayText("Gorga The Hutt has called in reinforcements!");
        }
    }
};

heroes["Marlo The Hutt"] = {
    name: "Marlo The Hutt",
    tooltip: "Marlo The Hutt was a member of the Hutt Ruling Council, a major dealer in the Zygerian slave trade, drawing the ire of the Jedi Order.",
    image: "marloTheHutt.png",
    ships: ["CHELANDION_HUTT"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 2;
        });

        ship.marloReinforcements = 0;
    },
    onTick: function (ship) {
        if (ship.shield > 0) {
            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield * .334, ship.shield + ship.maxShield * .001));
        }

        ship.marloReinforcements++;

        if (ship.marloReinforcements >= 512) {
            ship.marloReinforcements = -Infinity;

            let stillLiving = 0;

            for (let i = 0; i < 5; i++) {
                stillLiving++;

                ship.battle.spawn("JUVARD_HUTT", ship.team, ship.x + Math.random() * ship.size * 2 - ship.size, ship.y + Math.random() * ship.size * 2 - ship.size).onDead = function () {
                    stillLiving--;

                    if (stillLiving <= 0) {
                        ship.marloReinforcements = 0;
                    }
                }
            }

            ship.battle.displayText("Gorga The Hutt has called in reinforcements!");
        }
    }
};

heroes["Oruba The Hutt"] = {
    name: "Oruba The Hutt",
    tooltip: "Oruba The Hutt was a member of the Hutt Ruling Council. An elder Hutt, Oruba had a skin condition that made him look like an albino. He was a major contributor to the Hutt Navy.",
    image: "orubaTheHutt.png",
    ships: ["VONTOR_HUTT"],
    modifications: function (ship) {
        ship.shield *= 2.5;
        ship.maxShield *= 2.5;
        ship.shieldRegen *= 2.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.damage *= 1.1;
            hp.reload *= .9;
            hp.range *= 1.2;
        });

    },
    onTick: function (ship) {
        if (ship.shield > 0) {
            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield, ship.shield + ship.maxShield * .0005));
        }
    }
};

heroes["Ziro The Hutt"] = {
    name: "Ziro The Hutt",
    tooltip: "Ziro The Hutt was the slimy cousin of Jabba The Hutt. He was flamboyant and incrediblely vain, known for his constant betrayal of his family. He was a major player in the Hutt Cartel, and was known for his connections to the Separatists.",
    image: "ziroTheHutt.png",
    ships: ["BARABBULA_HUTT"],
    modifications: function (ship) {
        ship.shield *= 5;
        ship.maxShield *= 5;
        ship.shieldRegen *= 5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 5;
            hp.maxHealth *= 5;
            hp.damage *= 1.5;
            hp.reload *= .5;
            hp.range *= 1.5;
        });

    },
    onTick: function (ship) {
        if (ship.shield > 0) {
            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield, ship.shield + ship.maxShield * .0001));
        }

        ship.hardpoints.forEach(hp => {
            if (hp.health > 0) {
                hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0001);
            }
        });
    }
};


export default heroes;