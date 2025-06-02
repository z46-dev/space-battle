import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_HUTT = templates.stations.GOLAN_I({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT",
    bomber: "SKIPRAYBLASTBOAT_HUTT"
});

ships.GOLAN_II_HUTT = templates.stations.GOLAN_II({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT",
    bomber: "SKIPRAYBLASTBOAT_HUTT"
});

ships.GOLAN_III_HUTT = templates.stations.GOLAN_III({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT",
    bomber: "SKIPRAYBLASTBOAT_HUTT"
});

ships.SHIPYARD_LVL_1_HUTT = templates.stations.SHIPYARD_LVL_1({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT",
    bomber: "SKIPRAYBLASTBOAT_HUTT",
    corvette: ["ACTIONVITRANSPORT_HUTT", "HEAVY_MINSTREL_HUTT", "HEAVY_MINSTREL_HUTT"],
    frigate: ["JUVARD_HUTT", "BARABBULA_HUTT"]
});

ships.SHIPYARD_LVL_2_HUTT = templates.stations.SHIPYARD_LVL_2({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT",
    bomber: "SKIPRAYBLASTBOAT_HUTT",
    corvette: ["ACTIONVITRANSPORT_HUTT", "HEAVY_MINSTREL_HUTT", "HEAVY_MINSTREL_HUTT"],
    frigate: ["JUVARD_HUTT", "BARABBULA_HUTT", "MUNIFICENT_HUTT", "BRUTESUPPORTFRIGATE_HUTT"],
    heavyFrigate: ["UBRIKKIAN_HUTT", "TEMPEST_HUTT"]
});

ships.SHIPYARD_LVL_3_HUTT = templates.stations.SHIPYARD_LVL_3({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT",
    bomber: "SKIPRAYBLASTBOAT_HUTT",
    corvette: ["ACTIONVITRANSPORT_HUTT", "HEAVY_MINSTREL_HUTT", "HEAVY_MINSTREL_HUTT"],
    frigate: ["JUVARD_HUTT", "BARABBULA_HUTT", "MUNIFICENT_HUTT", "BRUTESUPPORTFRIGATE_HUTT"],
    heavyFrigate: ["UBRIKKIAN_HUTT", "TEMPEST_HUTT", "SZAJIN_HUTT"],
    capital: ["CHELANDION_HUTT"]
});

ships.SHIPYARD_LVL_4_HUTT = templates.stations.SHIPYARD_LVL_4({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT",
    bomber: "SKIPRAYBLASTBOAT_HUTT",
    corvette: ["ACTIONVITRANSPORT_HUTT", "HEAVY_MINSTREL_HUTT", "HEAVY_MINSTREL_HUTT"],
    frigate: ["JUVARD_HUTT", "BARABBULA_HUTT", "MUNIFICENT_HUTT", "BRUTESUPPORTFRIGATE_HUTT"],
    heavyFrigate: ["UBRIKKIAN_HUTT", "TEMPEST_HUTT", "SZAJIN_HUTT"],
    capital: ["CHELANDION_HUTT", "KARAGGA_HUTT"]
});

export default ships;