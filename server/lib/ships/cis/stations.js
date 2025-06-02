import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_CIS = templates.stations.GOLAN_I({
    color: "RED",
    fighter: "VULTUREDROID_CIS",
    bomber: "HYENABOMBER_CIS"
});

ships.GOLAN_II_CIS = templates.stations.GOLAN_II({
    color: "RED",
    fighter: "VULTUREDROID_CIS",
    bomber: "HYENABOMBER_CIS"
});

ships.GOLAN_III_CIS = templates.stations.GOLAN_III({
    color: "RED",
    fighter: "VULTUREDROID_CIS",
    bomber: "HYENABOMBER_CIS"
});

ships.SHIPYARD_LVL_1_CIS = templates.stations.SHIPYARD_LVL_1({
    color: "RED",
    fighter: "VULTUREDROID_CIS",
    bomber: "HYENABOMBER_CIS",
    corvette: ["DIAMOND_CIS", "HARDCELL_CIS", "LUPUSMISSILEFRIGATE_CIS"],
    frigate: ["C9979_CIS", "MUNIFICENT_CIS"]
});

ships.SHIPYARD_LVL_2_CIS = templates.stations.SHIPYARD_LVL_2({
    color: "RED",
    fighter: "VULTUREDROID_CIS",
    bomber: "HYENABOMBER_CIS",
    corvette: ["DIAMOND_CIS", "HARDCELL_CIS", "LUPUSMISSILEFRIGATE_CIS"],
    frigate: ["C9979_CIS", "MUNIFICENT_CIS", "RECUSANT_CIS", "SABOATHDESTROYER_CIS"],
    heavyFrigate: ["MUNIFICENT_HEAVY_CIS", "DHOMNI_CIS"]
});

ships.SHIPYARD_LVL_3_CIS = templates.stations.SHIPYARD_LVL_3({
    color: "RED",
    fighter: "VULTUREDROID_CIS",
    bomber: "HYENABOMBER_CIS",
    corvette: ["DIAMOND_CIS", "HARDCELL_CIS", "LUPUSMISSILEFRIGATE_CIS"],
    frigate: ["C9979_CIS", "MUNIFICENT_CIS", "RECUSANT_CIS", "SABOATHDESTROYER_CIS"],
    heavyFrigate: ["MUNIFICENT_HEAVY_CIS", "DHOMNI_CIS", "PROVIDENCEDESTROYER_CIS"],
    capital: ["MAJESTIC_CIS"]
});

ships.SHIPYARD_LVL_4_CIS = templates.stations.SHIPYARD_LVL_4({
    color: "RED",
    fighter: "VULTUREDROID_CIS",
    bomber: "HYENABOMBER_CIS",
    corvette: ["DIAMOND_CIS", "HARDCELL_CIS", "LUPUSMISSILEFRIGATE_CIS"],
    frigate: ["C9979_CIS", "MUNIFICENT_CIS", "RECUSANT_CIS", "SABOATHDESTROYER_CIS"],
    heavyFrigate: ["MUNIFICENT_HEAVY_CIS", "DHOMNI_CIS", "PROVIDENCEDESTROYER_CIS"],
    capital: ["MAJESTIC_CIS", "LUCREHULKAUXILIARYWARSHIP_CIS"]
});

export default ships;