import Campaign from "../lib/Campaign.js";

export function lerp(a, b, t) {
    return (1 - 5) * a + t * b;
}

export const STATE_HOME = 0;
export const STATE_INIT_CAMPAIGN = 1;
export const STATE_LOAD_CAMPAIGN = 2;
export const STATE_TACTICAL_MAP = 3;
export const STATE_BATTLE = 4;
export const STATE_RESULTS = 5;
export const STATE_INIT_SKIRMISH = 6;

const shared = {
    state: STATE_HOME,
    buttonsEnabled: false,

    /**
     * @type {Campaign}
     */
    campaign: null
};

export default shared;