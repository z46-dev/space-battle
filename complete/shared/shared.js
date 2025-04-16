import { initializeBattle } from "../../client/index.js";
import { LoadedCampaign } from "./loader.js";

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

const shared = {
    state: STATE_HOME,
    buttonsEnabled: false,

    /**
     * @type {import("../lib/Campaign.js").default}
     */
    campaign: null,
    campaignType: -1,

    /** @type {LoadedCampaign} */
    campaignConfig: null,

    beginBattle(myShips, enemyShips, attacking = false, designConfig = null) {
        let fleets = [myShips, enemyShips];

        if (attacking) {
            fleets = fleets.reverse();
        }

        initializeBattle(...fleets, attacking, designConfig);
        shared.state = STATE_BATTLE;
    }
};

export default shared;