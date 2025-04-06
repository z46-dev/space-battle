import Planet, { NoiseOptions, PlanetOptions } from "../Planet/Planet.js";
import UIButton from "./shared/Button.js";
import { canvas, ctx, uiScale } from "./shared/canvas.js";
import { drawText } from "./shared/render.js";
import shared, { STATE_BATTLE, STATE_HOME, STATE_INIT_CAMPAIGN, STATE_INIT_SURVIVAL, STATE_SELECT_TIMEFRAME, STATE_TACTICAL_MAP } from "./shared/shared.js";

import factions, { CapitalInfo, Faction } from "./lib/Factions.js";
import curtains, { curtainState, drawCurtains } from "./lib/curtains.js";
import Campaign from "./lib/Campaign.js";
import drawBattle from "../client/index.js";
import { loadCampaign, campaignConfig } from "./shared/loader.js";

// Do a UI all split up in canvas.
// Add a home menu and an option for saves and an option for
// going into a new campaign.
// The campaign selector should let you select the faction you'll be playing as.
// (Have an option for single-planet start, and an option for multi-planet start.)
// Have an option for the following campaigns:
// - The Sith Wars (Old Republic, Sith, Hutts)
// - The Clone Wars (Republic, CIS, Hutts)
// - The Galactic Civil War (Rebellion, Empire, Zann, Hapans)
// - Reunification (New Republic, Imperial Remnant, Hutts, Zann)
// - The Dark Empire Crisis (New Republic, Dark Empire, Hapans, Hutts)

// Then, make the actual global menu for ingame.
// Add an option to drag your units, and then recode the battle interface to let you start battles.
// The outcome of battles will have an impact on things.
// Shipyards take time for building ships, and credits matter.
// You can save at any time to localStorage.
const planetOptions = new PlanetOptions();
planetOptions.Radius = 512;
planetOptions.Detail = .334;
planetOptions.Seed = .655;
planetOptions.Clouds.Seed = .412;
planetOptions.NoiseFunction = NoiseOptions.staticQuickNoise;

const planet = new Planet(planetOptions);
planet.generate();

class Star {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    }
}

const stars = [];

function regenerateStars() {
    stars.length = 0;

    const scale = uiScale();
    const width = canvas.width / scale;
    const height = canvas.height / scale;

    for (let i = 0; i < 128; i++) {
        internal1: for (let j = 0; j < 32; j++) {
            const x = Math.random() * width;
            const y = Math.random() * height;

            for (let k = 0; k < stars.length; k++) {
                const star = stars[k];
                const dx = star.x - x;
                const dy = star.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 32) {
                    continue internal1;
                }
            }

            stars.push(new Star(x, y, Math.random() * 2 + 1));
            break;
        }
    }
}

regenerateStars();
window.addEventListener("resize", regenerateStars);

function changeState(newState) {
    shared.buttonsEnabled = false;

    if (newState === STATE_INIT_CAMPAIGN) {
        let x = 0;
        for (const faction of factions) {
            buttonMaps[STATE_INIT_CAMPAIGN].push({
                x: -((128 + 32) + 16) + (x % 3) * ((128 + 32) + 16),
                y: (48 + 8) * Math.floor(x / 3),
                width: 128 + 32,
                height: 48,
                text: faction.name,
                color: faction.color,
                action: () => {
                    shared.campaign = new Campaign(faction);
                    changeState(STATE_TACTICAL_MAP);
                    shared.campaign.init();

                    window.campaign = shared.campaign;
                }
            });

            x ++;
        }
    }

    curtains(function onceHalfway() {
        shared.state = newState;
    }).then(() => shared.buttonsEnabled = true);
}

const buttonMaps = [];

buttonMaps[STATE_HOME] = [{
    x: 0,
    y: 0,
    width: 256,
    height: 64,
    text: "New Campaign",
    color: "#C8C8C8",
    action: () => {
        changeState(STATE_SELECT_TIMEFRAME);
    }
}, {
    x: 0,
    y: 72,
    width: 256,
    height: 64,
    text: "Load Campaign",
    color: "#C8C8C8",
    action: () => {
        console.log("Load Campaign");
    }
}, {
    x: 0,
    y: 144,
    width: 256,
    height: 64,
    text: "Survival Mode",
    color: "#C8C8C8",
    action: () => {
        changeState(STATE_INIT_SURVIVAL);
    }
}];

buttonMaps[STATE_SELECT_TIMEFRAME] = campaignConfig.map((campaign, i) => ({
    x: 0,
    y: i * 72,
    width: 256,
    height: 64,
    text: campaign.name,
    color: "#C8C8C8",
    action: () => {
        const campaignConfig = loadCampaign(campaign.name);

        factions.length = 0;

        campaignConfig.campaign.factions.forEach(conf => {
            const faction = new Faction();
            faction.id = conf.id;
            faction.color = conf.color;
            faction.name = conf.name;
            faction.key = conf.key;

            if (conf.planets && conf.planets.length > 0) {
                faction.defaultStartingPlanets = conf.planets;
            }

            if (conf.capital) {
                faction.capitalPlanet = new CapitalInfo();
                faction.capitalPlanet.name = conf.capital.name;
                faction.capitalPlanet.fleetPopulation = conf.capital.fleetPopulation;
                faction.capitalPlanet.baseIncome = conf.capital.baseIncome;
            }

            faction.shipyardConfigs = conf.shipyards;

            factions.push(faction);
        });

        shared.campaignType = i;
        shared.campaignConfig = campaignConfig;
        changeState(STATE_INIT_CAMPAIGN);
    }
}));

buttonMaps[STATE_INIT_CAMPAIGN] = [];
buttonMaps[STATE_INIT_SURVIVAL] = [];

for (let i = 0; i < factions.length - 1; i++) {
    const faction = factions[i + 1]; // Skip Neutral Systems

    buttonMaps[STATE_INIT_SURVIVAL].push({
        x: -((128 + 32) + 16) + (i % 3) * ((128 + 32) + 16),
        y: (48 + 8) * Math.floor(i / 3),
        width: 128 + 32,
        height: 48,
        text: faction.name,
        color: faction.color,
        action: () => {
            changeState(STATE_HOME);
        }
    });
}

const buttons = new Array(Math.max(...campaignConfig.map(e => e.factions.length), ...buttonMaps.filter(e => e.length).map(map => map.length))).fill(0).map(() => new UIButton(0, 0, 0, 0));

function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (shared.state === STATE_BATTLE) {
        drawBattle();
        return;
    }

    const scale = uiScale();
    const width = canvas.width / scale;
    const height = canvas.height / scale;

    ctx.save();
    ctx.scale(scale, scale);

    switch (shared.state) {
        case STATE_HOME: {
            for (const star of stars) {
                star.draw();
            }

            ctx.shadowColor = planetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(planet.canvas, -300, -200);
            ctx.shadowBlur = 0;

            drawText("Conquest", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_INIT_CAMPAIGN: {
            for (const star of stars) {
                star.draw();
            }

            ctx.shadowColor = planetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(planet.canvas, -300, -200);
            ctx.shadowBlur = 0;

            drawText("Create New Campaign", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_SELECT_TIMEFRAME: {
            for (const star of stars) {
                star.draw();
            }

            ctx.shadowColor = planetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(planet.canvas, -300, -200);
            ctx.shadowBlur = 0;

            drawText("Select Timeframe", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_INIT_SURVIVAL: {
            for (const star of stars) {
                star.draw();
            }

            ctx.shadowColor = planetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(planet.canvas, -300, -200);
            ctx.shadowBlur = 0;

            drawText("Select a Faction", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_TACTICAL_MAP: {
            ctx.scale(1 / scale, 1 / scale);
            shared.campaign.draw();
        } break;
    }

    if (shared.state in buttonMaps) {
        for (let i = 0; i < buttonMaps[shared.state].length; i++) {
            const button = buttons[i];
            const map = buttonMaps[shared.state][i];

            button.centerX = width / 2 + map.x;
            button.centerY = height / 2 + map.y;
            button.width = map.width;
            button.height = map.height;
            button.color = map.color;
            button.nowDrawMe = () => {
                drawText(map.text, 0, 0, 1, "#FFFFFF");
            };
            button.clickEvent = map.action;
            button.draw();
        }
    }

    ctx.restore();

    if (curtainState.active) {
        drawCurtains();
    }
}

window.addEventListener("mousemove", event => {
    const scale = uiScale();
    const x = event.offsetX / scale * window.devicePixelRatio;
    const y = event.offsetY / scale * window.devicePixelRatio;

    if (shared.state in buttonMaps) {
        for (let i = 0; i < buttonMaps[shared.state].length; i++) {
            const button = buttons[i];
            button.mouseIsOver = button.contains(x, y);
        }
    }
});

window.addEventListener("click", event => {
    if (!shared.buttonsEnabled) {
        return;
    }

    const scale = uiScale();
    const x = event.offsetX / scale * window.devicePixelRatio;
    const y = event.offsetY / scale * window.devicePixelRatio;

    if (shared.state in buttonMaps) {
        for (let i = 0; i < buttonMaps[shared.state].length; i++) {
            const button = buttons[i];

            if (button.contains(x, y)) {
                button.clickEvent();
            }
        }
    }
});

curtains().then(() => shared.buttonsEnabled = true);
curtainState.value = 1;
draw();