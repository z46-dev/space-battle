import Planet, { NoiseOptions, PlanetColors, PlanetOptions } from "./Planet/Planet.js";
import UIButton from "./shared/Button.js";
import { canvas, ctx, uiScale } from "./shared/canvas.js";
import { assets, drawText, loadAsset } from "./shared/render.js";

import shared, { AUTOSAVE_MODE_LOAD, AUTOSAVE_MODE_SAVE, STATE_BATTLE, STATE_BATTLE_RESULTS, STATE_HOME, STATE_INIT_CAMPAIGN, STATE_INIT_SURVIVAL, STATE_LOAD_CAMPAIGN as STATE_MANAGE_SAVES, STATE_PRE_BATTLE, STATE_SELECT_AUTOSAVE, STATE_SELECT_TIMEFRAME, STATE_TACTICAL_MAP } from "./shared/shared.js";

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
import { playableCampaigns, splinteredEmpire } from "./configs/campaigns.js";
import { playSong, SONG_TYPE_HOME, SONG_TYPE_MAP, stopSong } from "./shared/audio.js";
import allFactions from "./configs/factions.js";
import { FactionConfig } from "./configs/baseFactions.js";
import createPattern from "./shared/background.js";

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

    switch (newState) {
        case STATE_TACTICAL_MAP:
            stopSong();
            playSong(SONG_TYPE_MAP);
            break;
        case STATE_BATTLE:
            stopSong();
            playSong(SONG_TYPE_BATTLE);
            break;
        case STATE_INIT_CAMPAIGN: {
            let x = 0;

            for (const faction of shared.campaignConfig.factions) {
                buttonMaps[STATE_INIT_CAMPAIGN].push({
                    x: -((128 + 32) + 16) + (x % 3) * ((128 + 32) + 16),
                    y: (48 + 8) * Math.floor(x / 3),
                    width: 128 + 32,
                    height: 48,
                    text: faction.name,
                    color: faction.color,
                    action: () => {
                        shared.campaign = Campaign.from(shared.campaignConfig, faction.name);
                        window.campaign = shared.campaign;

                        changeState(STATE_TACTICAL_MAP);

                        const capital = shared.campaign.playerFaction.capitalPlanet;
                        if (capital) {
                            const planet = shared.campaign.getPlanet(capital.name);
                            if (planet) {
                                shared.campaign.camera.realX = planet.x;
                                shared.campaign.camera.realY = planet.y;
                                shared.campaign.camera.zoom = 2;
                            }
                        }
                    }
                });

                x++;
            }
        } break;
        case STATE_INIT_SURVIVAL: {
            let x = 0;

            for (const fKey in allFactions) {
                const faction = allFactions[fKey];
                buttonMaps[STATE_INIT_SURVIVAL].push({
                    x: -((128 + 32) + 16) + (x % 3) * ((128 + 32) + 16),
                    y: (48 + 8) * Math.floor(x / 3),
                    width: 128 + 32,
                    height: 48,
                    text: faction.name,
                    color: faction.color,
                    action: () => {
                        shared.initSurvival(faction);
                    }
                });

                x++;
            }
        } break;
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
    text: "Survival Mode",
    color: "#C8C8C8",
    action: () => {
        changeState(STATE_INIT_SURVIVAL);
    }
}, {
    x: 0,
    y: 216,
    width: 256,
    height: 64,
    text: "Sandbox Mode",
    color: "#C8C8C8",
    action: () => {
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
        y: 288,
        width: 256,
        height: 64,
        text: "Testing",
        color: "#C8C8C8",
        action: () => {
            const pop = 600;
            const f1 = allFactions.empire;
            const f2 = allFactions.sithEmpire;

            shared.newBeginBattle({
                name: f1.name,
                fleet: Fleet.randomFromFactionConfig(pop, f1).__ships.map(e => ({
                    ship: e,
                    hero: null
                })),
                color: f1.color
            }, {
                name: f2.name,
                fleet: Fleet.randomFromFactionConfig(pop, f2).__ships.map(e => ({
                    ship: e,
                    hero: null
                })),
                color: f2.color
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

buttonMaps[STATE_SELECT_TIMEFRAME] = playableCampaigns.map((campaign, i) => ({
    x: 0,
    y: i * 72,
    width: 256,
    height: 64,
    text: campaign.name,
    color: "#C8C8C8",
    action: () => {
        factions.length = 0;
        shared.campaignType = i;
        shared.campaignConfig = campaign;
        changeState(STATE_INIT_CAMPAIGN);
    }
}));

buttonMaps[STATE_INIT_CAMPAIGN] = [];
buttonMaps[STATE_INIT_SURVIVAL] = [];

buttonMaps[STATE_PRE_BATTLE] = [{
    x: 0,
    y: 0,
    width: 256,
    height: 64,
    text: "Start Battle",
    color: "#C8C8C8",
    action: () => shared.preBattle.cb()
}];

buttonMaps[STATE_BATTLE_RESULTS] = [{
    x: 0,
    y: 0,
    width: 256,
    height: 64,
    text: "Continue",
    color: "#C8C8C8",
    action: () => shared.state = STATE_TACTICAL_MAP
}];

const buttons = new Array(Math.max(...campaignConfig.map(e => e.factions.length), ...buttonMaps.filter(e => e.length).map(map => map.length))).fill(0).map(() => new UIButton(0, 0, 0, 0));

const background = createPattern(ctx, 2048);

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

    ctx.save();
    ctx.fillStyle = background;
    ctx.scale(.5, .5);
    ctx.fillRect(0, 0, width * 4, height * 4);
    ctx.restore();

    switch (shared.state) {
        case STATE_HOME: {
            ctx.shadowColor = planetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(planet.canvas, -300, -200);
            ctx.shadowBlur = 0;

            drawText("Conquest", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_MANAGE_SAVES: {
            ctx.shadowColor = secondPlanetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(secondPlanet.canvas, 300, 200);
            ctx.shadowBlur = 0;

            drawText("Manage Saves", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_SELECT_AUTOSAVE: {
            ctx.shadowColor = secondPlanetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(secondPlanet.canvas, 300, 200);
            ctx.shadowBlur = 0;

            drawText(shared.autosaveSelectMode === AUTOSAVE_MODE_LOAD ? "Select Save" : "Download Save", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_INIT_CAMPAIGN: {
            ctx.shadowColor = planetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(planet.canvas, -300, -200);
            ctx.shadowBlur = 0;

            drawText("Create New Campaign", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_SELECT_TIMEFRAME: {
            ctx.shadowColor = planetOptions.Colors[4][2];
            ctx.shadowBlur = 25;
            ctx.drawImage(planet.canvas, -300, -200);
            ctx.shadowBlur = 0;

            drawText("Select Timeframe", width / 2, height / 2 - 96, 75, "#FFFFFF");
        } break;
        case STATE_INIT_SURVIVAL: {
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
        case STATE_PRE_BATTLE: {
            drawText(`${shared.preBattle.playerAttacking ? "Invasion" : "Defense"} of ${shared.preBattle.planet.name}`, width / 2, 96, 50, "#FFFFFF");

            if (shared.preBattle.planet.realPlanet) {
                ctx.drawImage(shared.preBattle.planet.realPlanet, width - 256, -128, 384, 384);
            }

            ctx.beginPath();
            ctx.moveTo(width / 2, 192);
            ctx.lineTo(width / 2, height - 128);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();
            ctx.closePath();

            const GRID_COLUMNS = 5;
            const GRID_CELL_SIZE = 72;
            const GRID_SPACING = 24;
            const GRID_WIDTH = GRID_COLUMNS * (GRID_CELL_SIZE + GRID_SPACING) - GRID_SPACING;

            for (let i = 0; i < shared.preBattle.factionsInvolved.length; i++) {
                let centerX = width / 2,
                    offX = width / 4;

                centerX += (i == 0 ? -offX : offX) * (shared.preBattle.playerAttacking ? 1 : -1);

                const faction = shared.preBattle.factionsInvolved[i];
                drawText(faction.name, centerX, 192, 32, faction.color);

                ctx.beginPath();
                ctx.moveTo(centerX - width / 8, 192 + 32);
                ctx.lineTo(centerX + width / 8, 192 + 32);
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#FFFFFF";
                ctx.stroke();
                ctx.closePath();

                let cellX = 0, cellY = 0;

                for (let i = 0; i < faction.allForces.length; i++) {
                    const ship = faction.allForces[i];
                    const shipData = ships[ship.ship];
                    const heroData = ship.hero ? heroes[ship.hero] : null;

                    cellX = (i % GRID_COLUMNS) * (GRID_CELL_SIZE + GRID_SPACING);
                    cellY = Math.floor(i / GRID_COLUMNS) * (GRID_CELL_SIZE + GRID_SPACING);
                    cellX += centerX - GRID_WIDTH / 2 + GRID_CELL_SIZE / 2;
                    cellY += 192 + 96;
                    ctx.save();
                    ctx.translate(cellX, cellY);

                    if (!assets.has(ship.ship)) {
                        loadAsset("/assets/ships/" + shipData.asset, ship.ship);
                    } else if (assets.get(ship.ship).ready) {
                        ctx.rotate(-Math.PI / 6);
                        ctx.drawImage(assets.get(ship.ship), -GRID_CELL_SIZE / 2, -GRID_CELL_SIZE / 2, GRID_CELL_SIZE, GRID_CELL_SIZE);
                        ctx.rotate(Math.PI / 6);
                    }

                    if (heroData) {
                        if (!assets.has(ship.hero)) {
                            loadAsset("/assets/portraits/" + heroData.image, ship.hero);
                        } else if (assets.get(ship.hero).ready) {
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(GRID_CELL_SIZE / 4, GRID_CELL_SIZE / 4, GRID_CELL_SIZE / 4, 0, Math.PI * 2);
                            ctx.clip();
                            ctx.closePath();
                            ctx.drawImage(assets.get(ship.hero), 0, 0, GRID_CELL_SIZE / 2, GRID_CELL_SIZE / 2);
                            ctx.restore();
                            ctx.beginPath();
                            ctx.arc(GRID_CELL_SIZE / 4, GRID_CELL_SIZE / 4, GRID_CELL_SIZE / 4, 0, Math.PI * 2);
                            ctx.strokeStyle = "#EEEEAA";
                            ctx.lineWidth = 3;
                            ctx.stroke();
                        }
                    }

                    if (ship.count > 1) {
                        drawText("x" + ship.count.toString(), GRID_CELL_SIZE / 2.5, -GRID_CELL_SIZE / 3, 16, "#FFFFFF");
                    }

                    ctx.restore();
                }
            }

            buttonMaps[STATE_PRE_BATTLE][0].y = height / 2 - 64;
        } break;
        case STATE_BATTLE_RESULTS: {
            drawText(`${shared.battleResults.won ? "We are victorious!" : "We have been defeated"}`, width / 2, 96, 50, "#FFFFFF");

            if (shared.battleResults.planet.realPlanet) {
                ctx.drawImage(shared.battleResults.planet.realPlanet, width - 256, -128, 384, 384);
            }

            ctx.beginPath();
            ctx.moveTo(width / 2, 192);
            ctx.lineTo(width / 2, height - 128);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();
            ctx.closePath();

            const GRID_COLUMNS = 5;
            const GRID_CELL_SIZE = 72;
            const GRID_SPACING = 24;
            const GRID_WIDTH = GRID_COLUMNS * (GRID_CELL_SIZE + GRID_SPACING) - GRID_SPACING;

            for (let i = 0; i < shared.battleResults.entries.length; i++) {
                const entry = shared.battleResults.entries[i];
                let centerX = width / 2,
                    offX = width / 4;
                centerX += i == 0 ? -offX : offX;

                const faction = entry.faction;
                drawText(["Your Losses", "Enemy Losses"][i], centerX, 192, 32, faction.color);
                ctx.beginPath();
                ctx.moveTo(centerX - width / 8, 192 + 32);
                ctx.lineTo(centerX + width / 8, 192 + 32);
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#FFFFFF";
                ctx.stroke();
                ctx.closePath();

                let cellX = 0, cellY = 0;

                for (let j = 0; j < entry.losses.length; j++) {
                    // loss { ship: string, count: number, hero: string|null }
                    const loss = entry.losses[j];
                    const shipData = ships[loss.ship];
                    const heroData = loss.hero ? heroes[loss.hero] : null;
                    cellX = (j % GRID_COLUMNS) * (GRID_CELL_SIZE + GRID_SPACING);
                    cellY = Math.floor(j / GRID_COLUMNS) * (GRID_CELL_SIZE + GRID_SPACING);
                    cellX += centerX - GRID_WIDTH / 2 + GRID_CELL_SIZE / 2;
                    cellY += 192 + 96;
                    ctx.save();
                    ctx.translate(cellX, cellY);
                    if (!assets.has(loss.ship)) {
                        loadAsset("/assets/ships/" + shipData.asset, loss.ship);
                    } else if (assets.get(loss.ship).ready) {
                        ctx.rotate(-Math.PI / 6);
                        ctx.drawImage(assets.get(loss.ship), -GRID_CELL_SIZE / 2, -GRID_CELL_SIZE / 2, GRID_CELL_SIZE, GRID_CELL_SIZE);
                        ctx.rotate(Math.PI / 6);
                    }

                    if (heroData) {
                        if (!assets.has(loss.hero)) {
                            loadAsset("/assets/portraits/" + heroData.image, loss.hero);
                        } else if (assets.get(loss.hero).ready) {
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(GRID_CELL_SIZE / 4, GRID_CELL_SIZE / 4, GRID_CELL_SIZE / 4, 0, Math.PI * 2);
                            ctx.clip();
                            ctx.closePath();
                            ctx.drawImage(assets.get(loss.hero), 0, 0, GRID_CELL_SIZE / 2, GRID_CELL_SIZE / 2);
                            ctx.restore();
                            ctx.beginPath();
                            ctx.arc(GRID_CELL_SIZE / 4, GRID_CELL_SIZE / 4, GRID_CELL_SIZE / 4, 0, Math.PI * 2);
                            ctx.strokeStyle = "#EEEEAA";
                            ctx.lineWidth = 3;
                            ctx.stroke();
                        }
                    }
                    if (loss.count > 1) {
                        drawText("x" + loss.count.toString(), GRID_CELL_SIZE / 2.5, -GRID_CELL_SIZE / 3, 16, "#FFFFFF");
                    }
                    ctx.restore();
                }
            }

            buttonMaps[STATE_BATTLE_RESULTS][0].y = height / 2 - 64;
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
window.allFactions = allFactions;
window.FactionConfig = FactionConfig;

playSong(SONG_TYPE_HOME);