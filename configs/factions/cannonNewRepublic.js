import ships from "../../server/lib/ships.js";
import { FactionConfig } from "../baseFactions.js"

export const resistance = new FactionConfig("Resistance", "#CA5533", "RESISTANCE")
    .addBuildableShips(1, "CR90_RESISTANCE", "AGAVE_CORVETTE_RESISTANCE", "MC30A_RESISTANCE", "MC30C_RESISTANCE")
    .addBuildableShips(2, "MC40A_RESISTANCE", "NEUTRON_STAR_REBEL", "NEBULONB2_RESISTANCE", "FREEVIRGILLIABUNKERBUSTER_RESISTANCE")
    .addBuildableShips(3, "VESPER_RESISTANCE", "MC80BLIBERTY_RESISTANCE", "MC80A_RESISTANCE")
    .addBuildableShips(4, "STARHAWK_RESISTANCE", "MC85_RESISTANCE")
    .addStationOptions("GOLAN_I_RESISTANCE", "GOLAN_II_RESISTANCE", "GOLAN_III_RESISTANCE")
    .addShipyardOptions("SHIPYARD_LVL_1_RESISTANCE", "SHIPYARD_LVL_2_RESISTANCE", "SHIPYARD_LVL_3_RESISTANCE", "SHIPYARD_LVL_4_RESISTANCE");


export const firstOrder = new FactionConfig("First Order", "#555555", "FO")
    .addBuildableShips(1, "IPV1_FO", "RAIDER_II_FO", "ARQUITENS_FO")
    .addBuildableShips(2, "STRIKECRUISER_FO", "MTFCRUISER_FO")
    .addBuildableShips(3, "RESURGENT_FO")
    .addBuildableShips(4, "XYSTON_FO", "MANDATORSIEGEDREADNOUGHT_FO", "EXECUTORSUPERSTARDESTROYER_FO", "MEGASTARDESTROYER_FO")
    .addStationOptions("GOLAN_I_FO", "GOLAN_II_FO", "GOLAN_III_FO")
    .addShipyardOptions("SHIPYARD_LVL_1_FO", "SHIPYARD_LVL_2_FO", "SHIPYARD_LVL_3_FO", "SHIPYARD_LVL_4_FO");
