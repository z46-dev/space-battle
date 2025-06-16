import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.DARKNON_MANDO = templates.stations.DARKNON_DEFENSE_STATION({
    color: "BLUE",
    fighter: "BASILISK_FIGHTER_MANDO",
    bomber: "BASILISK_BOMBER_MANDO"
});

ships.RONIKA_MANDO = templates.stations.RONIKA_DEFENSE_STATION({
    color: "BLUE",
    fighter: "BASILISK_FIGHTER_MANDO",
    bomber: "BASILISK_BOMBER_MANDO"
});

ships.KEMPLEX_MANDO = templates.stations.KEMPLEX_DEFENSE_STATION({
    color: "BLUE",
    fighter: "BASILISK_FIGHTER_MANDO",
    bomber: "BASILISK_BOMBER_MANDO"
});

ships.SHIPYARD_LVL_1_MANDO = templates.stations.SHIPYARD_LVL_1({
    color: "BLUE",
    fighter: "BASILISK_FIGHTER_MANDO",
    bomber: "BASILISK_BOMBER_MANDO",
    corvette: ["VERGEBUIR_CORVETTE_MANDO", "AKAANAR_CORVETTE_MANDO"],
    frigate: ["BASILISKAN_SHAADLAR_TROOPSHIP_MANDO", "SHAADLAR_TROOPSHIP_MANDO"]
});

ships.SHIPYARD_LVL_2_MANDO = templates.stations.SHIPYARD_LVL_2({
    color: "BLUE",
    fighter: "BASILISK_FIGHTER_MANDO",
    bomber: "BASILISK_BOMBER_MANDO",
    corvette: ["VERGEBUIR_CORVETTE_MANDO", "AKAANAR_CORVETTE_MANDO"],
    frigate: ["BASILISKAN_SHAADLAR_TROOPSHIP_MANDO", "SHAADLAR_TROOPSHIP_MANDO", "BAARUR_DUNGEON_SHIP_MANDO"],
    heavyFrigate: ["JEHAVEYIR_ASSAULT_SHIP_MANDO", "SHUKALAR_FRIGATE_MANDO"]
});

ships.SHIPYARD_LVL_3_MANDO = templates.stations.SHIPYARD_LVL_3({
    color: "BLUE",
    fighter: "BASILISK_FIGHTER_MANDO",
    bomber: "BASILISK_BOMBER_MANDO",
    corvette: ["VERGEBUIR_CORVETTE_MANDO", "AKAANAR_CORVETTE_MANDO"],
    frigate: ["BASILISKAN_SHAADLAR_TROOPSHIP_MANDO", "SHAADLAR_TROOPSHIP_MANDO", "BAARUR_DUNGEON_SHIP_MANDO"],
    heavyFrigate: ["JEHAVEYIR_ASSAULT_SHIP_MANDO", "SHUKALAR_FRIGATE_MANDO"],
    capital: ["RUSUR_DUNGEON_SHIP_MANDO"]
});

ships.SHIPYARD_LVL_4_MANDO = templates.stations.SHIPYARD_LVL_4({
    color: "BLUE",
    fighter: "BASILISK_FIGHTER_MANDO",
    bomber: "BASILISK_BOMBER_MANDO",
    corvette: ["VERGEBUIR_CORVETTE_MANDO", "AKAANAR_CORVETTE_MANDO"],
    frigate: ["BASILISKAN_SHAADLAR_TROOPSHIP_MANDO", "SHAADLAR_TROOPSHIP_MANDO", "BAARUR_DUNGEON_SHIP_MANDO"],
    heavyFrigate: ["JEHAVEYIR_ASSAULT_SHIP_MANDO", "SHUKALAR_FRIGATE_MANDO"],
    capital: ["RUSUR_DUNGEON_SHIP_MANDO", "KYRAMUD_BATTLESHIP_MANDO"]
});

export default ships;