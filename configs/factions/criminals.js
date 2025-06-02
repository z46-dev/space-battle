import ships from "../../server/lib/ships.js";
import { FactionConfig } from "../baseFactions.js"

export const hutts = new FactionConfig("Hutt Cartels", "#c6ff1a", "EMPIRE")
    .addBuildableShips(1, "ACTIONVITRANSPORT_HUTT", "CONSOLAR_HUTT", "CR90_HUTT", "LUPUSMISSILEFRIGATE_HUTT", "LIGHT_MINSTREL_HUTT", "HEAVY_MINSTREL_HUTT", "BRUTESUPPORTFRIGATE_HUTT", "JUVARD_HUTT", "BARABBULA_HUTT")
    .addBuildableShips(2, "SABOATHDESTROYER_HUTT", "UBRIKKIAN_HUTT", "TEMPEST_HUTT", "SZAJIN_HUTT", "KARABOS_HUTT")
    .addBuildableShips(3, "MC69NOIR_HUTT", "VENATOR_HUTT", "KARAGGA_HUTT", "VONTOR_HUTT", "CHELANDION_HUTT")
    .addBuildableShips(4, "VORACIOUS_HUTT", "DORBULLA_HUTT")
    .addStationOptions("GOLAN_I_HUTT", "GOLAN_II_HUTT", "GOLAN_III_HUTT")
    .addShipyardOptions("SHIPYARD_LVL_1_HUTT", "SHIPYARD_LVL_2_HUTT", "SHIPYARD_LVL_3_HUTT", "SHIPYARD_LVL_4_HUTT");
