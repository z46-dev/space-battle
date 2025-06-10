import { shipTypes } from "../constants.js";

const heroes = {};

heroes["AdmiralPellaeon"] = {
    name: "Admiral Gillad Pellaeon",
    tooltip: "Admiral Gillad Pellaeon is a veteran of the Clone Wars and the Galactic Civil War. He is a strong leader and served under Grand Admiral Thrawn, which aided him in his tactical growth. He eventually became the leader of the Imperial Remnant, and ended up signing the treaty that ended the Galactic Civil War.",
    image: "Pellaeon.png",
    ships: ["GLADIATOR_EMPIRE"],
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
                hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00025);
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
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .00001);
        });
    }
};

heroes["CapBrandei"] = {
    name: "Captain Brandei",
    tooltip: "Captain Brandei was a force-attuned Imperial officer who served under Grand Admiral Thrawn's command during the superior's campaign. He commands the Imperial Star Destroyer Judicator, and the Bellator-class Star Destroyer Dominion.",
    image: "Brandei.webp",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
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
    ships: ["VINDICATOR_EMPIRE"],
    modifications: function (ship) {
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
    },
    onTick: function (ship) {
        if (ship.shield > 0 && ship.shield < ship.maxShield) {
            ship.shield = Math.min(ship.maxShield, ship.shield + ship.maxShield * .00025);
        }

        ship.repelMissiles();
    }
};

heroes["Konstantine"] = {
    name: "Admiral Konstantine",
    tooltip: "Admiral Konstantine was an admiral of the Empire who rose to power due to his political connections. He was a poor tactician, and was eventually killed by Commander Sato at the Battle of Atollon due to his greed and power-hungry nature.",
    image: "Konstantine.jfif",
    ships: ["IMOBILIZER_EMPIRE"],
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
    ships: ["IMPERIAL_CARGO_SHIP_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 5;
            hp.maxHealth *= 5;
            hp.range *= 2;
            hp.reload *= .45;
            hp.damage *= 2;
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
    ships: ["VICTORYSTARDESTROYER_EMPIRE"],
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

heroes["TreutenTeradoc"] = {
    name: "Treuten Teradoc",
    tooltip: "Treuten Teradoc was a warlord who rose to power after the fall of the Empire. He was a brilliant tactician and was able to lead the Crimson Command, a fleet of modified Victory-II Class Star Destroyers.",
    image: "TreutenTeradoc.png",
    ships: ["CRIMSONCOMMAND_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 1.5;
            hp.reload *= .8;
            hp.damage *= 1.2;
        });

        ship.addHangar({
            x: 0,
            y: 0,
            offset: 0,
            direction: 0,
            maxSquadrons: 2,
            squadronSize: 4,
            reserveSize: 8,
            squadronKey: "TIEDEFENDER_EMPIRE"
        });
    }
};

heroes["KoshTeradoc"] = {
    name: "Kosh Teradoc",
    tooltip: "Kosh Teradoc was a warlord who rose to power after the fall of the Empire. He was the brother of Treuten Teradoc and lead the Greater Maldrood.",
    image: "KoshTeradoc.webp",
    ships: ["CRIMSONCOMMAND_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 1.5;
            hp.reload *= .8;
            hp.damage *= 1.2;
        });

        ship.addHangar({
            x: 0,
            y: 0,
            offset: 0,
            direction: 0,
            maxSquadrons: 2,
            squadronSize: 4,
            reserveSize: 8,
            squadronKey: "TIEDEFENDER_EMPIRE"
        });
    }
};

heroes["AdyePrittick"] = {
    name: "Adye Prittick",
    tooltip: "Adye Prittick was the ranking officer of Death Squadron after the death of Admiral Piett at Endor. He was a competent officer, but not a skilled politician, unable to unite Death Squadron to counterattack the Rebel fleet at Endor after their victory.",
    image: "AdyePittrick.webp",
    ships: ["TECTOR_STAR_DESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["ApwarTrigit"] = {
    name: "Apwar Trigit",
    tooltip: "Trigit then hired himself and his Imperial-class Star Destroyer, Implacable, to Zsinj. There he bore the title of \"admiral\", although given the number of self-promoted warlords, his penchant for individualism and his command of a single starship, it is unlikely that this was the rank he held within the Imperial Starfleet.",
    image: "Apwar Trigit.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["BarseNeomen"] = {
    name: "Captain Barse Neomen",
    tooltip: "Captain Barse Neomen was a male Human who served in the Imperial Navy during the Galactic Civil War. A competent officer who graduated from the Corulag Imperial Academy, he was stationed at the Sisar Run, placed under the command of Governor Newen Streeg's forces. He quietly despised Governor Streeg and would slip in subtle insults whenever possible; however, he was smart enough not to press his luck too much. He viewed his assignment to the Sisar Run as \"just bad luck.\"",
    image: "Barse Neomen.png",
    ships: ["STRIKECRUISER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 5;
        ship.maxShield *= 5;
        ship.shieldRegen *= 5;
        ship.maxSpeed *= 1.2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 4;
            hp.maxHealth *= 4;
            hp.damage *= 1.15;
            hp.range *= 1.15;
            hp.reload *= .9;
        });
    }
};

heroes["BlitzerHarrsk"] = {
    name: "Blitzer Harrsk",
    tooltip: "Blitzer Harrsk was a Human male admiral of the Galactic Empire who was considered one of the Imperial Navy's most talented tacticians and commanders. During the Battle of Endor, Harrsk suffered a cranial injury that left him brain damaged, which resulted in him developing a split personality that alternated between Harrsk himself and his deceased second-in-command, Captain Bolla Thoath. When Captain Gilad Pellaeon gave the order to retreat following the death of Emperor Palpatine, Harrsk initially agreed, but later refused to follow an officer of such low rank and took his fleet into the Deep Core, where he established Zero Command, the first breakaway warlord kingdom.",
    image: "BlitzerHarrsk.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["BockNabyl"] = {
    name: "Bock Nabyl",
    tooltip: "Bock Nabyl was a Human captain in warlord Zsinj's Imperial Remnant. He captained a modified Star-Galleon which he used to defend Zsinj's holdings.",
    image: "Bock Nabyl.png",
    ships: ["STARGALLEON_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.reload *= .75;
        });
    }
};

heroes["CarnorJax"] = {
    name: "Carnor Jax",
    tooltip: "Bock Nabyl was a Human captain in warlord Zsinj's Imperial Remnant. He captained a modified Star-Galleon which he used to defend Zsinj's holdings.",
    image: "CarnorJax.png",
    ships: ["PURSUIT_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["Coross"] = {
    name: "Coross",
    tooltip: "Coross was an officer in the Imperial Navy who was appointed as acting Admiral of the Imperial-class Star Destroyer Vengeance after the death of Admiral Mordon.",
    image: "Coross.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["DorReder"] = {
    name: "Dor Reder",
    tooltip: "Dor Reder was a Human male Imperial Navy officer from the planet Pirralor. A junior officer aboard the Star Destroyer Pulsar during the Battle of Endor, Reder was captured by the Alliance to Restore the Republic but managed to escape by stealing an Alliance transport. Reder joined the warlord forces of Admiral Gaen Drommel, gaining command of the Star Destroyer Krieger. Information about Alliance bases and safe worlds gleaned from the stolen transport's computer was used to devastating effect when Drommel and Reder launched a campaign against them which was responsible for thousands of deaths.",
    image: "Dor Reder.png",
    ships: ["TECTOR_STAR_DESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["EdricDarius"] = {
    name: "Edric Darius",
    tooltip: "Edric Darius was the Captain of an Imperial Navy Torpedo Sphere stationed near Tallaan, in the Tapani sector, during the Galactic Civil War. His first officer was Geffen.",
    image: "Edric Darius.png",
    ships: ["TORPEDO_SPHERE_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["EltaBesk"] = {
    name: "Elta Besk",
    tooltip: "Shortly after the Battle of Endor, Besk was invited to the Pentastar Talks aboard the Reaper. Imperial Moff Ardus Kaine, the convenor of the talks, was proposing the formation of the Pentastar Alignment. Besk agreed with his proposals out of concern that the New Republic's focus on freedom could lead to a revolt among the largely Entymal slave labor used by her corporation.",
    image: "Elta Besk.png",
    ships: ["TONFALKCARRIER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["EmperorPalpatine"] = {
    name: "Emperor Palpatine",
    tooltip: "The Sith Lord Darth Sidious, also known as Emperor Palpatine, was the leader of the Galactic Empire and the mastermind behind the Clone Wars. He was a powerful Force user and a master of manipulation, using his abilities to control the galaxy and eliminate his enemies.",
    image: "EmperorPalpatine.png",
    ships: ["DEATHSTAR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["GarrikTrier"] = {
    name: "Garrik Trier",
    tooltip: "Garrik Trier was an Admiral in the Imperial Navy. He commanded the fleet stationed in the Brak sector during the Galactic Civil War. Trier was known as a confident commander, who spent a great deal of time analyzing naval tactics used by the Rebel Alliance.",
    image: "Garrik Trier.png",
    ships: ["SECUTOR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["IbDekeet"] = {
    name: "Ib Dekeet",
    tooltip: "Dekeet was one of the five powerful representatives present at the Pentastar Talks, and was initially hesitant to join forces with Grand Moff Ardus Kaine. However, the Grand Moff's skills as an orator and negotiator won the governor over. In particular, Governor Dekeet objected to putting the Pentastar Alignment logo on vehicles and troops under their command. Ardus Kaine pushed back on this by pointing out that the badge would strike fear and command respect within the heart of the Alignment's enemies.",
    image: "Ib Dekeet.png",
    ships: ["TAGGE_BATTLECRUISER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.25;
        ship.maxShield *= 1.25;
        ship.shieldRegen *= 1.25;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
            hp.reload *= .75;
        });
    }
};

heroes["IshinIlRaz"] = {
    name: "Ishin-Il-Raz",
    tooltip: "A fanatical supporter of the New Order and its core precepts, Ishin-Il-Raz was one of the original twelve Grand Admirals of the Imperial Navy appointed by Emperor Palpatine two years before the Battle of Yavin. Early in his life, Il-Raz helped found the Commission for the Protection of the Republic, and when it was re-formed in 19 BBY, he became the leader of the Commission for the Preservation of the New Order, and was a key figure in the development of its Humanocentric ideas and concepts.",
    image: "IshinIlRaz.png",
    ships: ["COMPELLOR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["JosefGrunger"] = {
    name: "Josef Grunger",
    tooltip: "Josef Grunger was a Human male serving in the Navy of the Galactic Empire. A Grand Admiral, Grunger was one of the twelve original beings elevated to the rank by Emperor Palpatine two years before the Battle of Yavin. Neither subtle nor loyal by nature, Grunger nonetheless remained devoted to Palpatine until 4 ABY, when the Emperor was killed at the Battle of Endor. The Grand Admiral, having been busy patrolling space near the planet Gargon, seized the world when he received the news of the defeat at Endor. Almost immediately, he set himself up as a warlord and declared that he was the new Emperor.",
    image: "JosefGrunger.png",
    ships: ["CONSOLIDATORASSAULTSHIP_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["Joshi"] = {
    name: "Joshi",
    tooltip: "Joshi was ordered by Warlord Zsinj to go to Talasea and join the Implacable, Constrictor and Night Caller in ambushing the New Republic force shadowing Night Caller. But Zsinj didn't know that Wraith Squadron had already taken control of Night Caller and was planning their own ambush for his forces.",
    image: "Joshi.png",
    ships: ["TARTAN_PATROL_CRUISER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.reload *= .5;
        });
    }
};

heroes["Kedler"] = {
    name: "Kedler",
    tooltip: "Kedler was an Imperial Admiral in command of a navy relief force sent to Sellasas after the Rebel siege there. He commanded a specialized naval fleet geared against the Rebel fleet.",
    image: "Kedler.png",
    ships: ["SECUTOR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["Larm"] = {
    name: "Larm",
    tooltip: "Larm was an admiral in the Imperial Navy who was in charge of forces in the Antemeridian sector under Moff Getelles. Larm was a by-the-book sycophant who ingratiated himself with Moffs while never relaxing his warrior image. Getelles promoted Larm to admiral over the heads of several other officers shortly after his promotion to Moff of Antemeridian Sector. Larm was seen as a sternly efficient foil to Getelles's fair command style.",
    image: "Larm.png",
    ships: ["CARRACK_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.reload *= .5;
        });
    }
};

heroes["LeoniaTavira"] = {
    name: "Leonia Tavira",
    tooltip: "Leonia Tavira was a Human female who became the youngest person to achieve the rank of Moff in the Galactic Empire. Born into poverty on the planet Eiattu 6, Leonia became the mistress of the planet's Imperial governor, Moff Tharil Tavira, at the age of sixteen. After Tavira's wife died under mysterious circumstances, he took Leonia as his wife. Shortly before the Battle of Endor, Tharil suffered a stroke and was paralyzed. Leonia took over as de facto governor while her husband recovered and, when he subsequently took his own life, declared herself Moff of Eiattu.",
    image: "LeoniaTavira.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["LlonBanjeer"] = {
    name: "Llon Banjeer",
    tooltip: "Llon Banjeer was a Human male and Imperial admiral in command of one of the Empire's largest fleets following the Battle of Endor. In the aftermath of the Endor debacle in 4 ABY, Banjeer allied himself with Warlord Zsinj before leading an attack on the New Republic's Hast Shipyards. Years later, the admiral was one of the backers of former Royal Guard and aspiring Sith Lord Carnor Jax's plan to sabotage Emperor Palpatine's clones.",
    image: "Llon Banjeer.png",
    ships: ["QUASAR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.reload *= .5;
        });
    }
};

heroes["LobaxResuun"] = {
    name: "Lobax Resuun",
    tooltip: "Governor Resuun was in charge of his sector when chaos erupted in the Tamarin sector following the Battle of Endor. Challenged by fledgling planetary governments, Governor Resuun was also forced to struggle against the demoralization of the remaining Imperial forces and the expending criminality.",
    image: "Lobax Resuun.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["MaarekStele"] = {
    name: "Maarek Stele",
    tooltip: "Maarek Stele was a pilot in the Imperial Navy and one of the Emperor's Hands. A native of Kuan, he enlisted in the Imperial Navy after the Galactic Empire rescued him from Bordali agents near the end of the Taroonian Civil War. Although he initially served as a mechanic, Stele was offered the opportunity to train as a TIE pilot after saving the life of Admiral Mordon.",
    image: "Maarek Stele.png",
    ships: ["DRAGON_HEAVY_CRUISER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["MalfklaYzu"] = {
    name: "Malfkla Yzu",
    tooltip: "Malfkla Yzu was a male Human and one of the thirteen Imperial warlords killed by Admiral Natasi Daala at Tsoss Beacon in 12 ABY. Under the Empire, Yzu was an admiral in the 15th Deep Core Reserve Fleet.",
    image: "Malfkla Yzu.png",
    ships: ["COMMUNICATIONS_BATTLECRUISER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["MartioBatch"] = {
    name: "Martio Batch",
    tooltip: "Martio Batch was an Imperial officer who rose through the ranks to become one of the twelve Grand Admirals of the Galactic Empire appointed by Emperor Palpatine during an elaborate New Year's Fete Week ceremony two years before the Battle of Yavin. Batch disliked the Imperial court politics that his fellow Grand Admirals reveled in, and as a result of his low profile, he earned the nickname the \"invisible admiral.\"",
    image: "MartioBatch.png",
    ships: ["SORONNAN_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["MoxSlosin"] = {
    name: "Mox Slosin",
    tooltip: "Mox Slosin was a member of the Inquisitorius and one of the Emperor's distinguished High Inquisitors.",
    image: "Mox Slosin.png",
    ships: ["TRENCHANT_CRUISER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.reload *= .5;
        });
    }
};

heroes["NialDeclann"] = {
    name: "Nial Declann",
    tooltip: "Nial Declann was a Human male Force-sensitive who fought for the Galactic Republic during the Clone Wars. He later served the Galactic Empire both as one of its twelve Grand Admirals and as a Dark Side Adept. Declann's impressive, Force-enhanced skills as a TIE pilot brought him to the attention of Emperor Palpatine's agents. He was subsequently taken to the Sith world of Dromund Kaas, where he was educated in the ways of the dark side by the Prophets of the Dark Side. When his training was complete, he was allowed to return to service in the Imperial Navy.",
    image: "NialDeclann.png",
    ships: ["ALLEGIANCE_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["NiclaraVarnillian"] = {
    name: "Niclara Varnillian",
    tooltip: "Niclara Varnillian was a female human Alderaanian who joined the Imperial Navy. She was part of the operations crew that tested the Death Star superlaser on the planet Alderaan. The destruction of her homeworld did not affect her in the least. Prior to the Battle of Yavin, she was transferred to the Imperial Star Destroyer Pulsar to serve as chief gunnery officer under Commander Dor Reder.",
    image: "Niclara Varnillian.png",
    ships: ["QUASAR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.reload *= .5;
        });
    }
};

heroes["OctavianGrant"] = {
    name: "Octavian Grant",
    tooltip: "Octavian Grant was one of the twelve original Imperial Grand Admirals appointed by Emperor Palpatine two years before the Battle of Yavin. A Human male Tapani lord of House Mecetti, Grant saw himself as superior to those who were not members of the nobility, and held a particular dislike for droids and other species. His Humanocentric beliefs stood firm after he joined the ranks of the Galactic Empire, and he proved himself to be an expert military strategist. Due to his military talents, he was appointed as one of the twelve Grand Admirals created by Palpatine in 2 BBY, although he was one of the least popular Grand Admirals, and did not attempt to curry favor with the Imperial moffs.",
    image: "OctavianGrant.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
        });
    }
};

heroes["ParLankin"] = {
    name: "Par Lankin",
    tooltip: "Par Lankin was the Human male Imperial Moff of the Lambda sector. Following the Battle of Endor, he became one of the many Imperial warlords, keeping his strategic area under control. The New Republic did not launch any offensive against Lankin, even when General Airen Cracken of New Republic Intelligence filled reports on the threat posed by such a man.",
    image: "Par Lankin.png",
    ships: ["ALLEGIANCE_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["PeccatiSyn"] = {
    name: "Peccati Syn",
    tooltip: "Peccati Syn was one of the twelve original Grand Admirals of the Imperial Navy. Raised as a devout Sacred Way follower, the young Syn was forced to abandon his religion under the Galactic Empire oppression. He joined the Empire to fill a spiritual void, rising through the ranks thanks to his tactical expertise and energetic devotion. After becoming a Grand Admiral in 2 BBY, he fought with distinction in the Galactic Civil War aboard his flagship, the Fi.",
    image: "PeccatiSyn.png",
    ships: ["PRAETOR_II_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["PhanRiizolo"] = {
    name: "Phan Riizolo",
    tooltip: "Phan Riizolo was a pirate associated with the Invids and the captain of the Booty Full. He was captured by Rogue Squadron at Alakatha in 11 ABY, after attempting to leave the Invids in order to strike out on his own. He later joined the Greater Maldrood under the promise of protection by the Teradoc brothers.",
    image: "Phan Riizolo.png",
    ships: ["NEUTRON_STAR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 3;
            hp.maxHealth *= 3;
            hp.reload *= .5;
        });
    }
};

heroes["PurdyMTrico"] = {
    name: "Purdy M. Trico",
    tooltip: "Purdy M. Trico was a Human male who served as the captain of an Imperial Star Destroyer that would later be renamed the Crynyd during the Galactic Civil War.",
    image: "Purdy M. Trico.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["QuarshPanaka"] = {
    name: "Quarsh Panaka",
    tooltip: "Quarsh Panaka was a Human male who served as the head of the Royal Naboo Security Forces before, during, and after the Invasion of Naboo, and later was the Moff for the Chommell sector during the Galactic Civil War. He was a vocal militarist among the peaceful people of Naboo, a fish out of water amongst his peers. Shaken by the murder of King Ars Veruna, he installed various security measures to make sure that the same thing did not happen to his second monarch, Queen Padmé Amidala. By learning from the mistakes of his predecessor, Maris Magneta, he was able to successfully defend her in several periods of danger, and continued to serve Naboo, the Republic, and eventually, the Empire.",
    image: "Quarsh Panaka.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["RalchioNervi"] = {
    name: "Ralchio Nervi",
    tooltip: "Ralchio Nervi, born Ralchio Sargan, was a human male who served in the navy of the Galactic Empire. The son of Vilola Sargan and Cacique Jans Coorsa of a clan of Confederacy of Independent Systems sympathizers on Gall, Nervi was Force-sensitive. After unintentionally killing Coorsa in a fit of rage, Sargan fled, marrying Lila Nervi and joining the Empire. Nervi served as a lieutenant in the 14th Sector Fleet, where he gained the attention of Grand Moff Ravik. Due to his connections, Nervi was promoted to the rank of captain and placed in command of his own task force.",
    image: "Ralchio Nervi.png",
    ships: ["GLADIATOR_EMPIRE"],
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
    }
};

heroes["RodinHlianVerpalion"] = {
    name: "Rodin Hlian Verpalion",
    tooltip: "Early in his life, Verpalion served aboard the cruiser Ballista along with Imre Talberenina, with whom he was acquainted. He eventually amassed a large personal fortune and rose to power in the Imperial Senate, where he won favor from Palpatine and was given the title of Imperial Advisor. In this capacity, Rodin spent his time handling sensitive situations for the Emperor, who he was totally loyal to.",
    image: "Rodin Hlian Verpalion.png",
    ships: ["VICTORYSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 1.1;
            hp.reload *= .9;
        });
    }
};

heroes["Sahreel"] = {
    name: "Sahreel",
    tooltip: "Sahreel was an Imperial Admiral under the orders of Moff Nile Owen aboard the Star Destroyer Impending Doom.",
    image: "Sahreel.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["SebastianParnell"] = {
    name: "Sebastian Parnell",
    tooltip: "Sebastian Parnell was an Imperial general who served as governor of the Sil'Lume system during the time of the New Order. He was distinguishable with his silver hair and ice-blue eyes. As governor, it was his personal task to bring the miners and prospectors of the Sil'Lume asteroid belt under Imperial control, while also overseeing the prisoners on Tol Ado, the third planet in the system.",
    image: "Sebastian Parnell.png",
    ships: ["SUPER_TRANSPORT_XI_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["SheaHublin"] = {
    name: "Shea Hublin",
    tooltip: "Shea Hublin was a renowned Human male pilot of the Galactic Empire known as \"the Rebel Destroyer.\" Born around 35 BBY, Hublin grew up on the planet Talcene before joining the naval forces of the Galactic Republic during the Clone Wars at the age of sixteen. Hublin had not yet completed his flight training when the Confederacy of Independent Systems surrendered, but entered the service of the Republic's successor, the Galactic Empire, at the end of the war and soon became an ace V-wing pilot. As leader of Sword Squadron in the 77th Air Wing, Hublin fought in the Western Reaches Operation of 17 BBY, helping to bring Imperial law to the Western Reaches of the galaxy. HoloNet coverage of Hublin's actions, most notably his assault on the Citadel of Axes at the Battle of Kelrodo-Ai, made him famous throughout the Empire and his likeness was subsequently used on Imperial recruitment posters.",
    image: "Shea Hublin.png",
    ships: ["TONFALKCARRIER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });

        ship.hangars.forEach(s => s.config.squadronKey = "TIEDEFENDER_EMPIRE");
    }
};

heroes["TandaPryl"] = {
    name: "Tanda Pryl",
    tooltip: "Tanda Pryl was the captain of the Imperial I-class Star Destroyer Thunderflare, which was part of Moff Villis Andal's fleet in the Elrood sector. She had a great rivalry with Akal Zed, captain of the Stalker.",
    image: "Tanda Pryl.png",
    ships: ["IMPERIALSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["TerrinaldScreed"] = {
    name: "Terrinald Screed",
    tooltip: "Vice Admiral Terrinald Screed was a human male who served the Galactic Empire as an officer of the Imperial Navy, along with being a high-ranking member of the Naval Intelligence Agency, in the years following the end of the Clone Wars. Before the Clone Wars, he was an officer within the Galactic Republic's Judicial Department during the Separatist Crisis and was a supporter of the Military Creation Act, which allowed the creation of the Grand Army of the Republic. Screed eventually perished during a confrontation with pirates.",
    image: "Terrinald Screed.png",
    ships: ["GLADIATOR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 1.15;
            hp.reload *= .85;
        });
    }
};

heroes["Therbon"] = {
    name: "Therbon",
    tooltip: "Therbon was an individual who served the Galactic Empire shortly after the Declaration of a New Order. Therbon was made Grand Moff of the Maldrood Oversector and commander of the Twelfth Army of the Republic.",
    image: "Therbon.png",
    ships: ["ALLEGIANCE_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["Torpin"] = {
    name: "Torpin",
    tooltip: "A short, stout man, Torpin became a Moff despite never having served in the Imperial Military, and commanded no respect from his subordinates. He was one of the two Moffs with territories bordering the Maelstrom. Along with his compatriot, Moff Vanko, Torpin submitted falsified budgets and financial reports to the Galactic Empire to try and hide the fact that he was losing a great deal of money and resources to the Riders of the Maelstrom, a pirate group operating in the Maelstrom.",
    image: "Torpin.png",
    ships: ["MAELSTROM_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["Touler"] = {
    name: "Touler",
    tooltip: "Touler served the Galactic Empire as Fleet Commander in the Imperial Navy during the Galactic Civil War. Touler was present during the assault on Kamino, an attempt by the Rebel Alliance to take out the cloning facilities of the planet Kamino, in 1 BBY. When Rebel starships entered the Kamino system, the Sith Lord Darth Vader told a signals officer to inform Touler that it was time to commence the battle. Though the Empire had its fleet positioned above Kamino, the Rebellion eventually broke through its defenses and was victorious.",
    image: "Touler.png",
    ships: ["PRAETOR_CARRIER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.25;
        ship.maxShield *= 1.25;
        ship.shieldRegen *= 1.25;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.25;
            hp.maxHealth *= 1.25;
        });
    }
};

heroes["TurrPhennir"] = {
    name: "Turr Phennir",
    tooltip: "Turr Phennir was a Human male hailing from the Valahari Provinces who served for years as an ace starfighter pilot in the Galactic Empire's 181st Imperial Fighter Group. Recruited into the group by Major Soontir Fel around 1 ABY, Captain Phennir spent the next several years battling forces of the Rebel Alliance, the Empire's opponent in the ongoing Galactic Civil War. By 4 ABY, he was a major and the fighter group's executive officer. Phennir and the 181st flew in the Battle of Endor that year, which saw Galactic Emperor Palpatine die aboard the Empire's second Death Star battle station.",
    image: "Turr Phennir.png",
    ships: ["AGGRESSORSTARDESTROYER_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.reload *= .85;
        });
    }
};

heroes["WyrnOtro"] = {
    name: "Wyrn Otro",
    tooltip: "Wyrn Otro worked for Galentro Heavy Works corporation, unswervingly loyal as he regarded it as his only family. He represented the corporation at the Pentastar Talks in 7 ABY. While he signed the Pentastar Alignment Treaty, recognizing the need to align with a party to avoid being absorbed into the New Republic, he had personal reservations about Moff Ardus Kaine, worrying that the formation of the Pentastar Alignment was only a way to gain personal power.",
    image: "Wyrn Otro.png",
    ships: ["VINDICATOR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 1.15;
            hp.reload *= .85;
        });
    }
};

heroes["ZurelDarillian"] = {
    name: "Zurel Darillian",
    tooltip: "A former Imperial Intelligence officer from Coruscant, Darillian commanded Night Caller, a heavily modified CR90 corvette. Darillian had a tremendous ego – despite having a boring job, he kept his logs in full-holographic format. Captain Darillian last saw Coruscant exactly two years, seven months, and six days before the Battle of Ession. He was effectively exiled from his homeworld after former Director of Imperial Intelligence Ysanne Isard lost the planet to the New Republic, and his wife died when the Executor-class Star Dreadnought Lusankya launched from its berth beneath Coruscant, destroying the Darillian's home.",
    image: "Zurel Darillian.png",
    ships: ["CR92A_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 5;
        ship.maxShield *= 5;
        ship.shieldRegen *= 5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 5;
            hp.maxHealth *= 5;
            hp.range *= 1.2;
            hp.reload *= .6;
        });
    }
};

heroes["PalpatineClone"] = {
    name: "Darth Sidious",
    tooltip: "Upon his death at the Battle of Endor, Emperor Palpatine's consciousness was transferred to a clone body on Byss. There, he continued to plot the return of the Sith and the destruction of the Jedi, manipulating events from the shadows to ensure his ultimate return to power.",
    image: "PalpatineClone.png",
    ships: ["ECLIPSE_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
        });
    }
};

heroes["Lumiya"] = {
    name: "Lady Lumiya",
    tooltip: "Lumiya, born Shira Elan Colla Brie, was a Force-sensitive Human female who went from being an agent of the Galactic Empire to Dark Lady of the Sith. Born on Imperial Center during the height of Galactic Emperor Palpatine's reign over the majority of the galaxy, Brie dedicated herself to the tenets of the Imperial New Order doctrine. This garnered the interest of Palpatine's chief enforcer, the Sith Lord Darth Vader, who sped the young woman's advancement in various Imperial-sponsored programs, including her enrollment into the Intelligence Academy of Carida. After she graduated with top honors and was promoted to the rank of major by Vader himself, Brie was given a highly classified mission to infiltrate the Rebel Alliance and either cause the death or ostracism of Rebel hero and Jedi Luke Skywalker amongst his peers.",
    image: "LadyLumiya.png",
    ships: ["PROCURSATOR_EMPIRE"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.range *= 1.15;
            hp.reload *= .85;
        });
    }
};

export default heroes;