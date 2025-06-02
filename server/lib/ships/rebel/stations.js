import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_REBEL = templates.stations.GOLAN_I({
    color: "RED",
    fighter: "XWING_REBEL",
    bomber: "YWING_REBEL"
});

ships.GOLAN_II_REBEL = templates.stations.GOLAN_II({
    color: "RED",
    fighter: "XWING_REBEL",
    bomber: "YWING_REBEL"
});

ships.GOLAN_III_REBEL = templates.stations.GOLAN_III({
    color: "RED",
    fighter: "XWING_REBEL",
    bomber: "YWING_REBEL"
});

ships.SHIPYARD_LVL_1_REBEL = templates.stations.SHIPYARD_LVL_1({
    color: "RED",
    fighter: "XWING_REBEL",
    bomber: "YWING_REBEL",
    corvette: ["CR90_REBEL", "DP20_REBEL", "MARAUDERMISSILECRUISER_REBEL"],
    frigate: ["PELTA_REBEL", "NEBULONB_REBEL"]
});

ships.SHIPYARD_LVL_2_REBEL = templates.stations.SHIPYARD_LVL_2({
    color: "RED",
    fighter: "XWING_REBEL",
    bomber: "YWING_REBEL",
    corvette: ["CR90_REBEL", "DP20_REBEL", "MARAUDERMISSILECRUISER_REBEL"],
    frigate: ["PELTA_REBEL", "NEBULONB_REBEL", "MC30C_REBEL", "MC40A_REBEL"],
    heavyFrigate: ["ASSAULT_FRIGATE_MK2_REBEL", "MC75_REBEL"]
});

ships.SHIPYARD_LVL_3_REBEL = templates.stations.SHIPYARD_LVL_3({
    color: "RED",
    fighter: "XWING_REBEL",
    bomber: "YWING_REBEL",
    corvette: ["CR90_REBEL", "DP20_REBEL", "MARAUDERMISSILECRUISER_REBEL"],
    frigate: ["PELTA_REBEL", "NEBULONB_REBEL", "MC30C_REBEL", "MC40A_REBEL"],
    heavyFrigate: ["ASSAULT_FRIGATE_MK2_REBEL", "MC75_REBEL", "DAUNTLESS_REBEL"],
    capital: ["MAJESTIC_REBEL"]
});

ships.SHIPYARD_LVL_4_REBEL = templates.stations.SHIPYARD_LVL_4({
    color: "RED",
    fighter: "XWING_REBEL",
    bomber: "YWING_REBEL",
    corvette: ["CR90_REBEL", "DP20_REBEL", "MARAUDERMISSILECRUISER_REBEL"],
    frigate: ["PELTA_REBEL", "NEBULONB_REBEL", "MC30C_REBEL", "MC40A_REBEL"],
    heavyFrigate: ["ASSAULT_FRIGATE_MK2_REBEL", "MC75_REBEL", "DAUNTLESS_REBEL"],
    capital: ["MAJESTIC_REBEL", "MC80B_REBEL"]
});

export default ships;