import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.DARKNON_OLDREP = templates.stations.DARKNON_DEFENSE_STATION({
    color: "GREEN",
    fighter: "AUREK_STRIKEFIGHTER_OLDREP",
    bomber: "CHELA_BOMBER_OLDREP"
});

ships.RONIKA_OLDREP = templates.stations.RONIKA_DEFENSE_STATION({
    color: "GREEN",
    fighter: "AUREK_STRIKEFIGHTER_OLDREP",
    bomber: "CHELA_BOMBER_OLDREP"
});

ships.KEMPLEX_OLDREP = templates.stations.KEMPLEX_DEFENSE_STATION({
    color: "GREEN",
    fighter: "AUREK_STRIKEFIGHTER_OLDREP",
    bomber: "CHELA_BOMBER_OLDREP"
});

ships.SHIPYARD_LVL_1_OLDREP = templates.stations.SHIPYARD_LVL_1({
    color: "GREEN",
    fighter: "AUREK_STRIKEFIGHTER_OLDREP",
    bomber: "CHELA_BOMBER_OLDREP",
    corvette: ["CORUSCANT_COURIER_OLDREP", "FORAY_BLOCKADE_RUNNER_OLDREP"],
    frigate: ["AXEHEAD_FRIGATE_OLDREP"]
});

ships.SHIPYARD_LVL_2_OLDREP = templates.stations.SHIPYARD_LVL_2({
    color: "GREEN",
    fighter: "AUREK_STRIKEFIGHTER_OLDREP",
    bomber: "CHELA_BOMBER_OLDREP",
    corvette: ["CORUSCANT_COURIER_OLDREP", "FORAY_BLOCKADE_RUNNER_OLDREP"],
    frigate: ["AXEHEAD_FRIGATE_OLDREP"],
    heavyFrigate: ["HAMMERHEAD_CRUISER_OLDREP"]
});

ships.SHIPYARD_LVL_3_OLDREP = templates.stations.SHIPYARD_LVL_3({
    color: "GREEN",
    fighter: "AUREK_STRIKEFIGHTER_OLDREP",
    bomber: "CHELA_BOMBER_OLDREP",
    corvette: ["CORUSCANT_COURIER_OLDREP", "FORAY_BLOCKADE_RUNNER_OLDREP"],
    frigate: ["AXEHEAD_FRIGATE_OLDREP"],
    heavyFrigate: ["HAMMERHEAD_CRUISER_OLDREP"],
    capital: ["STALWART_CRUISER_OLDREP"]
});

ships.SHIPYARD_LVL_4_OLDREP = templates.stations.SHIPYARD_LVL_4({
    color: "GREEN",
    fighter: "AUREK_STRIKEFIGHTER_OLDREP",
    bomber: "CHELA_BOMBER_OLDREP",
    corvette: ["CORUSCANT_COURIER_OLDREP", "FORAY_BLOCKADE_RUNNER_OLDREP"],
    frigate: ["AXEHEAD_FRIGATE_OLDREP"],
    heavyFrigate: ["HAMMERHEAD_CRUISER_OLDREP"],
    capital: ["STALWART_CRUISER_OLDREP", "SWIFTSURE_CRUISER_I_OLDREP"]
});

export default ships;