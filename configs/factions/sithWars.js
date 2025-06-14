import ships from "../../server/lib/ships.js";
import { FactionConfig } from "../baseFactions.js"

export const oldRepublic = new FactionConfig("Old Republic", "#25BEEE", "OLDREP")
    .addBuildableShips(1, "CORUSCANT_COURIER_OLDREP", "FORAY_BLOCKADE_RUNNER_OLDREP")
    .addBuildableShips(2, "AXEHEAD_FRIGATE_OLDREP", "HAMMERHEAD_CRUISER_OLDREP", "ZENITH_CRUISER_OLDREP")
    .addBuildableShips(3, "STALWART_CRUISER_OLDREP", "VALOR_CRUISER_OLDREP", "SWIFTSURE_CRUISER_I_OLDREP")
    .addBuildableShips(4, "INEXPUGNABLE_COMMAND_SHIP_OLDREP");

export const sithEmpire = new FactionConfig("Sith Empire", "#EEA5A5", "SITHEMP")
    .addBuildableShips(1, "DRESHDAE_PATROL_CORVETTE_SITHEMP", "DERRIPHAN_BATTLESHIP_SITHEMP", "HERAKLON_TRANSPORT_SITHEMP", "HERAKLON_MISSILE_BOAT_SITHEMP")
    .addBuildableShips(2, "SITH_PERSONNEL_CARRIER_SITHEMP", "SITH_HEAVY_CARRIER_SITHEMP")
    .addBuildableShips(3, "SUPREMACY_ATTACK_SHIP_SITHEMP", "INTERDICTOR_CRUISER_SITHEMP")
    .addBuildableShips(4, "CENTURION_BATTLECRUISER_SITHEMP");

export const mandalorians = new FactionConfig("Mandalorians", "#EEBE55", "MANDO")
    .addBuildableShips(1, "VERGEBUIR_CORVETTE_MANDO", "AKAANAR_CORVETTE_MANDO", "BASILISKAN_SHAADLAR_TROOPSHIP_MANDO", "BAARUR_DUNGEON_SHIP_MANDO")
    .addBuildableShips(2, "SHAADLAR_TROOPSHIP_MANDO", "SHUKALAR_FRIGATE_MANDO", "JEHAVEYIR_ASSAULT_SHIP_MANDO")
    .addBuildableShips(3, "RUSUR_DUNGEON_SHIP_MANDO", "KYRAMUD_BATTLESHIP_MANDO")
    .addBuildableShips(4, "KANDOSII_DREADNOUGHT_MANDO");

export const ancientHutts = new FactionConfig("Hutt Empire", "#C6FF1A", "HUTT")
    .addBuildableShips(1, "LIGHT_MINSTREL_ANCIENT_HUTT", "HEAVY_MINSTREL_ANCIENT_HUTT", "JUVARD_ANCIENT_HUTT")
    .addBuildableShips(2, "BARABBULA_ANCIENT_HUTT", "AJUUR_HEAVY_CRUISER_HUTT")
    .addBuildableShips(3, "AZALUS_HUTT_DREADNOUGHT_HUTT");