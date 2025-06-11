import { initializeBattle } from "../../client/index.js";
import { generateAsteroids } from "../client/lib/state.js";
import { LoadedCampaign } from "./loader.js";
import { playSong, SONG_TYPE_BATTLE, stopSong } from "./audio.js";
import { CampaignConfig } from "../configs/campaigns.js";
import { initializeSurvival } from "../client/index.js";

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export const STATE_HOME = 0;
export const STATE_INIT_CAMPAIGN = 1;
export const STATE_LOAD_CAMPAIGN = 2;
export const STATE_TACTICAL_MAP = 3;
export const STATE_BATTLE = 4;
export const STATE_RESULTS = 5;
export const STATE_INIT_SURVIVAL = 6;
export const STATE_SELECT_TIMEFRAME = 7;
export const STATE_SELECT_AUTOSAVE = 8;
export const STATE_PRE_BATTLE = 9;
export const STATE_BATTLE_RESULTS = 10;

export const AUTOSAVE_MODE_NONE = 0;
export const AUTOSAVE_MODE_LOAD = 1;
export const AUTOSAVE_MODE_SAVE = 2;

const shared = {
    state: STATE_HOME,
    autosaveSelectMode: AUTOSAVE_MODE_NONE,
    buttonsEnabled: false,

    /**
     * @type {import("../lib/Campaign.js").default}
     */
    campaign: null,
    campaignType: -1,

    /** @type {CampaignConfig} */
    campaignConfig: null,

    acceptingDeathClones: false,

    beginBattle(myShips, enemyShips, attacking = false, designConfig = null, myColor = "#FF0000", enemyColor = "#0000FF", planetName = "Wild Space") {
        let fleets = [myShips, enemyShips];

        if (attacking) {
            fleets = fleets.reverse();
        }

        initializeBattle(...fleets, attacking, designConfig, myColor, enemyColor, planetName);
        shared.state = STATE_BATTLE;

        setTimeout(() => shared.acceptingDeathClones = true, 5000);

        generateAsteroids();
    },

    /**
     * @param {{name:string,color:string,fleet:{ship:string,hero:string|null}[],pathfinder:{ship:string,hero:string|null}|null,defenses:{shipyards:string[],stations:string[]}}} attackingFaction
     * @param {{name:string,color:string,fleet:{ship:string,hero:string|null}[],pathfinder:{ship:string,hero:string|null}|null,defenses:{shipyards:string[],stations:string[]}}} defendingFaction
     * @param {boolean} attacking
     * @param {string} designConfig
     * @param {string} planetName
     */
    newBeginBattle(attackingFaction, defendingFaction, attacking = false, designConfig = null, planetName = "Wild Space") {
        initializeBattle(attackingFaction, defendingFaction, attacking, designConfig, planetName);

        shared.state = STATE_BATTLE;
        stopSong();
        playSong(SONG_TYPE_BATTLE);

        generateAsteroids();
    },

    initSurvival(myFaction) {
        initializeSurvival(myFaction);
        shared.state = STATE_BATTLE;
        stopSong();
        playSong(SONG_TYPE_BATTLE);
        generateAsteroids();
    },

    preBattle: {
        cb: () => {},
        planet: null,
        /** @type {import("../configs/baseFactions.js").FactionConfig[]} */
        factionsInvolved: []
    },

    battleResults: {
        won: true,
        planet: null,
        /** @type {{ faction: import("../configs/baseFactions.js").FactionConfig, heroLosses: { ship: string, hero: string }[], shipLosses: string[] }[]} */
        entries: [] // [player, enemy]
    }
};

export default shared;