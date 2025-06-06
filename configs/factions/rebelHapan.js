import ships from "../../server/lib/ships.js";
import { FactionConfig } from "../baseFactions.js"


export const newRepublic = new FactionConfig("New Republic", "#faa700", "REBEL")
    .addBuildableShips(1, "CR90_REBEL", "DP20_REBEL", "AGAVE_CORVETTE_REBEL", "MARAUDERMISSILECRUISER_REBEL", "MC30A_REBEL", "MC30C_REBEL", "MC40A_REBEL", "NEBULONB_REBEL", "QUASAR_REBEL", "LIBERATOR_REBEL", "NEUTRON_STAR_REBEL")
    .addBuildableShips(2, "MC50_REBEL", "MC75_REBEL", "PELTA_REBEL", "ASSAULT_FRIGATE_MK2_REBEL")
    .addBuildableShips(3, "DAUNTLESS_REBEL", "DEFENDER_ASSAULT_CARRIER_REBEL", "MAJESTIC_REBEL", "MC80A_REBEL", "MC80BLIBERTY_REBEL", "MC80B_REBEL", "MC90_REBEL", "ENDURANCE_REBEL", "NEBULA_REBEL")
    .addBuildableShips(4, "MC85_REBEL", "BLUEDIVER_REBEL", "MEDIATOR_REBEL", "VISCOUNT_PROTOTYPE_REBEL")
    .addStationOptions("GOLAN_I_REBEL", "GOLAN_II_REBEL", "GOLAN_III_REBEL")
    .addShipyardOptions("SHIPYARD_LVL_1_REBEL", "SHIPYARD_LVL_2_REBEL", "SHIPYARD_LVL_3_REBEL", "SHIPYARD_LVL_4_REBEL");

export const hapesConsortium = new FactionConfig("Hapes Consortium", "#FF55EE", "HAPAN")
    .addBuildableShips(1, "BAIDAM_HAPAN", "FLARE_HAPAN", "BETACRUISER_HAPAN", "NOVACRUISER_HAPAN", "STELLA_HAPAN", "CHARUBAH_HAPAN")
    .addBuildableShips(2, "MAGNETAR_HAPAN", "CORONAL_HAPAN", "MIST_HAPAN")
    .addBuildableShips(3, "BATTLEDRAGON_HAPAN", "TEREPHON_HAPAN", "NEUTRON_HAPAN")
    .addStationOptions("GOLAN_I_HAPAN", "GOLAN_II_HAPAN", "GOLAN_III_HAPAN")
    .addShipyardOptions("SHIPYARD_LVL_1_HAPAN", "SHIPYARD_LVL_2_HAPAN", "SHIPYARD_LVL_3_HAPAN", "SHIPYARD_LVL_4_HAPAN");
