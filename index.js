import Planet, { NoiseOptions, PlanetColors, PlanetOptions } from "./Planet/Planet.js";
import UIButton from "./shared/Button.js";
import { canvas, ctx, uiScale } from "./shared/canvas.js";
import { drawText } from "./shared/render.js";
import shared, { AUTOSAVE_MODE_LOAD, AUTOSAVE_MODE_SAVE, STATE_BATTLE, STATE_HOME, STATE_INIT_CAMPAIGN, STATE_INIT_SURVIVAL, STATE_LOAD_CAMPAIGN as STATE_MANAGE_SAVES, STATE_SELECT_AUTOSAVE, STATE_SELECT_TIMEFRAME, STATE_TACTICAL_MAP } from "./shared/shared.js";

import factions, { CapitalInfo, Faction } from "./lib/Factions.js";
import curtains, { curtainState, drawCurtains } from "./lib/curtains.js";
import Campaign from "./lib/Campaign.js";
import drawBattle from "./client/index.js";
import { loadCampaign, campaignConfig, survivalFactions } from "./shared/loader.js";
import * as autosave from "./shared/autosave.js";
import Fleet from "./lib/Fleet.js";
import { EVENTS, on } from "./client/lib/state.js";
import ships from "./server/lib/ships.js";
import heroes from "./server/lib/heroes.js";

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

const secondPlanetOptions = new PlanetOptions();
secondPlanetOptions.Radius = 512;
secondPlanetOptions.Detail = 1;
secondPlanetOptions.Seed = 4.2321;
secondPlanetOptions.Clouds.Seed = 8.12342;
secondPlanetOptions.NoiseFunction = NoiseOptions.perlin3;
secondPlanetOptions.Colors = PlanetColors.desertColors;

const secondPlanet = new Planet(secondPlanetOptions);
secondPlanet.generate();

autosave.initDB().then(() => console.log("Database initialized successfully.")).catch(error => console.error("Database initialization failed:", error));

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

                    // Find the capital planet for the faction and set the camera to it
                    const capital = faction.capitalPlanet;
                    if (capital) {
                        const planet = shared.campaign.getPlanet(capital.name);
                        if (planet) {
                            shared.campaign.camera.realX = planet.x;
                            shared.campaign.camera.realY = planet.y;
                            shared.campaign.camera.zoom = 2;
                        }
                    }

                    window.campaign = shared.campaign;
                }
            });

            x++;
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
    text: "Manage Saves",
    color: "#C8C8C8",
    action: () => {
        changeState(STATE_MANAGE_SAVES);
    }
}, {
    x: 0,
    y: 144,
    width: 256,
    height: 64,
    text: "Sandbox Mode",
    color: "#C8C8C8",
    action: () => {
        // changeState(STATE_INIT_SURVIVAL);
        const selections = [];
        const choose = () => {
            let faction;

            do {
                faction = prompt("Enter a faction: \n One of: " + survivalFactions.map(e => e.name).join(", "));

                if (faction === null) {
                    return;
                }

                faction = faction.trim();
            } while (!survivalFactions.some(r => r.name === faction));

            const factionObj = survivalFactions.find(r => r.name === faction);
            let pop = 0;

            do {
                pop = prompt("Enter a fleet population (10 - 500):", 100);
                if (pop === null) {
                    return;
                }

                pop = +pop.trim();
            } while (!Number.isFinite(pop) || pop < 10 || pop > 500);

            const selection = {
                name: factionObj.name,
                fleet: Fleet.random(pop, factionObj.key).__ships.map(e => ({
                    ship: e,
                    hero: null
                })),
                color: factionObj.color
            };

            if (prompt("Allow heroes? (y/n)", "y").toLowerCase() === "y") {
                for (const heroKey of Object.keys(heroes).sort(() => .5 - Math.random())) {
                    const hero = heroes[heroKey];
                    const union = hero.ships.filter(s => selection.fleet.some(f => f.ship === s && f.hero === null));

                    if (union.length > 0) {
                        const shipSelection = union[Math.random() * union.length | 0];
                        selection.fleet.find(f => f.ship === shipSelection && f.hero === null).hero = heroKey;
                    }
                }
            }

            selections.push(selection);
        }

        alert("Select attacking faction:");
        choose();

        alert("Select defending faction:");
        choose();

        shared.newBeginBattle(selections[0], selections[1], true, null, "Sandbox");
        on(EVENTS.BATTLE_END, () => changeState(STATE_HOME), true);
    }
}];

if (location.search.includes("debug")) {
    buttonMaps[STATE_HOME].push({
        x: 0,
        y: 216,
        width: 256,
        height: 64,
        text: "Testing",
        color: "#C8C8C8",
        action: () => {
            const pop = 200;
            shared.newBeginBattle({
                name: "Hutt Cartel",
                fleet: Fleet.random(pop, "HUTT").__ships.map(e => ({
                    ship: e,
                    hero: null
                })),
                color: survivalFactions.find(e => e.name === "Hutt Cartel").color
            }, {
                name: "Galactic Empire",
                fleet: Fleet.random(pop, "EMPIRE").__ships.map(e => ({
                    ship: e,
                    hero: null
                })),
                color: survivalFactions.find(e => e.name === "Galactic Empire").color
            }, true, null, "Sandbox");
            on(EVENTS.BATTLE_END, () => changeState(STATE_HOME), true);
        }
    });
}

buttonMaps[STATE_MANAGE_SAVES] = [{
    x: 0,
    y: 0,
    width: 256,
    height: 64,
    text: "Load Save",
    color: "#C8C8C8",
    action: () => {
        buttonMaps[STATE_SELECT_AUTOSAVE] = [];

        autosave.saveKeys().then(keys => {
            if (keys.length === 0) {
                buttonMaps[STATE_SELECT_AUTOSAVE].push({
                    x: 0,
                    y: 0,
                    width: 256,
                    height: 64,
                    text: "No Saves Found",
                    color: "#C8C8C8",
                    action: () => {
                        changeState(STATE_HOME);
                    }
                });

                return;
            }

            keys.sort().reverse().forEach((key, i) => {
                buttonMaps[STATE_SELECT_AUTOSAVE].push({
                    x: keys.length > 3 ? (-200 + (i % 2) * 400) : 0,
                    y: keys.length > 3 ? ((i / 2 | 0) * 72) : (i * 72),
                    width: 384,
                    height: 64,
                    text: key,
                    color: "#C8C8C8",
                    action: async () => {
                        const value = await autosave.loadSave(key);
                        if (value) {
                            try {
                                shared.campaign = Campaign.fromSaved(value);
                                changeState(STATE_TACTICAL_MAP);
                                window.campaign = shared.campaign;
                            } catch (error) {
                                console.error("Failed to load campaign:", error);
                                changeState(STATE_HOME);
                            }
                        } else {
                            console.error("Failed to load save:", key);
                            changeState(STATE_HOME);
                        }
                    }
                });
            });
        });

        shared.autosaveSelectMode = AUTOSAVE_MODE_LOAD;
        changeState(STATE_SELECT_AUTOSAVE);
    }
}, {
    x: 0,
    y: 72,
    width: 256,
    height: 64,
    text: "Load Local File",
    color: "#C8C8C8",
    action: () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";

        input.addEventListener("change", event => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.addEventListener("load", event => {
                try {
                    const campaignData = JSON.parse(event.target.result);
                    shared.campaign = Campaign.fromSaved(campaignData);
                    changeState(STATE_TACTICAL_MAP);
                    window.campaign = shared.campaign;
                } catch (error) {
                    console.error("Failed to load campaign:", error);
                }
            });

            reader.readAsText(file);
        });

        input.click();
    }
}, {
    x: 0,
    y: 144,
    width: 256,
    height: 64,
    text: "Download Save",
    color: "#C8C8C8",
    action: () => {
        buttonMaps[STATE_SELECT_AUTOSAVE] = [];

        autosave.saveKeys().then(keys => {
            if (keys.length === 0) {
                buttonMaps[STATE_SELECT_AUTOSAVE].push({
                    x: 0,
                    y: 0,
                    width: 256,
                    height: 64,
                    text: "No Saves Found",
                    color: "#C8C8C8",
                    action: () => {
                        changeState(STATE_HOME);
                    }
                });

                return;
            }

            keys.sort().reverse().forEach((key, i) => {
                buttonMaps[STATE_SELECT_AUTOSAVE].push({
                    x: keys.length > 3 ? (-200 + (i % 2) * 400) : 0,
                    y: keys.length > 3 ? ((i / 2 | 0) * 72) : (i * 72),
                    width: 384,
                    height: 64,
                    text: key,
                    color: "#C8C8C8",
                    action: async () => {
                        const value = await autosave.loadSave(key);
                        if (value) {
                            const blob = new Blob([JSON.stringify(value)], { type: "application/json" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `${key}.json`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);

                            changeState(STATE_HOME);
                        } else {
                            console.error("Failed to download save:", key);
                            changeState(STATE_HOME);
                        }
                    }
                });
            });

            if (buttons.length < buttonMaps[STATE_SELECT_AUTOSAVE].length + 10) {
                for (let i = buttons.length; i < buttonMaps[STATE_SELECT_AUTOSAVE].length + 10; i++) {
                    buttons.push(new UIButton(0, 0, 0, 0));
                }
            }
        });

        shared.autosaveSelectMode = AUTOSAVE_MODE_SAVE;
        changeState(STATE_SELECT_AUTOSAVE);
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
            faction.additionalStartingUnits = conf.additionalStartingUnits;
            faction.heroUnits = conf.heroUnits;

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
        case STATE_MANAGE_SAVES: {
            for (const star of stars) {
                star.draw();
            }

            ctx.shadowColor = secondPlanetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(secondPlanet.canvas, 300, 200);
            ctx.shadowBlur = 0;

            drawText("Manage Saves", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_SELECT_AUTOSAVE: {
            for (const star of stars) {
                star.draw();
            }

            ctx.shadowColor = secondPlanetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(secondPlanet.canvas, 300, 200);
            ctx.shadowBlur = 0;

            drawText(shared.autosaveSelectMode === AUTOSAVE_MODE_LOAD ? "Select Save" : "Download Save", width / 2, height / 2 - 96, 75, "#FFFFFF");
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
            if (i >= buttons.length) {
                buttons.push(new UIButton(0, 0, 0, 0));
            }

            const button = buttons[i];
            const map = buttonMaps[shared.state][i];

            button.centerX = width / 2 + map.x;
            button.centerY = height / 2 + map.y;
            button.width = map.width;
            button.height = map.height;
            button.color = map.color;
            button.nowDrawMe = () => {
                drawText(map.text, 0, 0, 1, "#FFFFFF");
            }
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

    if (shared.state in buttonMaps && buttonMaps[shared.state] != null) {
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

    if (shared.state in buttonMaps && buttonMaps[shared.state] != null) {
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

window.autosave = autosave;