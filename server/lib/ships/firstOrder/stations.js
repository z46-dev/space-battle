import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_FO = templates.stations.GOLAN_I({
    color: "GREEN",
    fighter: "TIEFIGHTER_FO",
    bomber: "TIEBOMBER_FO"
});

ships.GOLAN_II_FO = templates.stations.GOLAN_II({
    color: "GREEN",
    fighter: "TIEFIGHTER_FO",
    bomber: "TIEBOMBER_FO"
});

ships.GOLAN_III_FO = templates.stations.GOLAN_III({
    color: "GREEN",
    fighter: "TIEFIGHTER_FO",
    bomber: "TIEBOMBER_FO"
});

ships.SHIPYARD_LVL_1_FO = templates.stations.SHIPYARD_LVL_1({
    color: "GREEN",
    fighter: "TIEFIGHTER_FO",
    bomber: "TIEBOMBER_FO",
    corvette: ["IPV1_FO", "RAIDER_II_FO"],
    frigate: ["ARQUITENS_FO", "STRIKECRUISER_FO"]
});

ships.SHIPYARD_LVL_2_FO = templates.stations.SHIPYARD_LVL_2({
    color: "GREEN",
    fighter: "TIEFIGHTER_FO",
    bomber: "TIEBOMBER_FO",
    corvette: ["IPV1_FO", "RAIDER_II_FO"],
    frigate: ["ARQUITENS_FO", "STRIKECRUISER_FO"],
    heavyFrigate: ["MTFCRUISER_FO"]
});

ships.SHIPYARD_LVL_3_FO = templates.stations.SHIPYARD_LVL_3({
    color: "GREEN",
    fighter: "TIEFIGHTER_FO",
    bomber: "TIEBOMBER_FO",
    corvette: ["IPV1_FO", "RAIDER_II_FO"],
    frigate: ["ARQUITENS_FO", "STRIKECRUISER_FO"],
    heavyFrigate: ["MTFCRUISER_FO"],
    capital: ["MTFCRUISER_FO", "MTFCRUISER_FO"]
});

ships.SHIPYARD_LVL_4_FO = templates.stations.SHIPYARD_LVL_4({
    color: "GREEN",
    fighter: "TIEFIGHTER_FO",
    bomber: "TIEBOMBER_FO",
    corvette: ["IPV1_FO", "RAIDER_II_FO"],
    frigate: ["ARQUITENS_FO", "STRIKECRUISER_FO"],
    heavyFrigate: ["MTFCRUISER_FO"],
    capital: ["MTFCRUISER_FO", "RESURGENT_FO"]
});

export default ships;