import { shipTypes } from "../constants.js";

const heroes = {};

heroes["Jabba The Hutt"] = {
    name: "Jabba The Hutt",
    tooltip: "Jabba The Hutt is a powerful crime lord who has a lot of influence in the galaxy. He is known for his cunning and his ability to get what he wants. He is also known for his love of luxury and his extravagant lifestyle.",
    image: "jabbaTheHutt.png",
    ships: ["VONTOR_HUTT", "KARAGGA_HUTT", "DORBULLA_HUTT"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 1.5;
        ship.maxSpeed *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
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
            ship.shield = Math.max(ship.shield, Math.min(ship.maxShield * .334, ship.shield + ship.maxShield * .0005));
        } else {
            ship.jabbaAbility.ticker++;

            if (ship.jabbaAbility.ticker >= 1200) {
                ship.jabbaAbility.active = true;
                ship.jabbaAbility.ticker = 300;
            }
        }

        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00075);

            if (ship.jabbaAbility.active) {
                const selfDmg = hp.maxHealth * .001;

                if (hp.health - selfDmg >= hp.maxHealth * .2) {
                    hp.health -= selfDmg;
                }

                hp.tick += 5;
            }
        });
    }
};

export default heroes;