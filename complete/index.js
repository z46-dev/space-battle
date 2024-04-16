import Planet, { NoiseOptions, PlanetOptions } from "../Planet/Planet.js";
import UIButton from "./shared/Button.js";
import { canvas, ctx, uiScale } from "./shared/canvas.js";
import { drawText } from "./shared/render.js";
import shared, { STATE_HOME, STATE_INIT_CAMPAIGN } from "./shared/shared.js";

import factions from "./lib/Factions.js";
import curtains, { curtainState, drawCurtains } from "./lib/curtains.js";

window.factions = factions;

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
        internal1: for (let j = 0; j < 32; j ++) {
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
        changeState(STATE_INIT_CAMPAIGN);
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
    text: "Skirmish Mode",
    color: "#C8C8C8",
    action: () => {
        console.log("Skirmish Mode");
    }
}];

buttonMaps[STATE_INIT_CAMPAIGN] = [];

for (let i = 0; i < factions.length - 1; i ++) {
    const faction = factions[i + 1]; // Skip Neutral Systems

    buttonMaps[STATE_INIT_CAMPAIGN].push({
        x: -((128 + 32) + 16) + (i % 3) * ((128 + 32) + 16),
        y: (48 + 8) * Math.floor(i / 3),
        width: 128 + 32,
        height: 48,
        text: faction.name,
        color: faction.color,
        action: () => {
            console.log("New Campaign as " + faction.name);
        }
    });
}

const buttons = new Array(Math.max(...buttonMaps.map(map => map.length))).fill(0).map(() => new UIButton(0, 0, 0, 0));

function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    }

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

    ctx.restore();

    if (curtainState.active) {
        drawCurtains();
    }
}

window.addEventListener("mousemove", event => {
    const scale = uiScale();
    const x = event.offsetX / scale * window.devicePixelRatio;
    const y = event.offsetY / scale * window.devicePixelRatio;

    for (let i = 0; i < buttonMaps[shared.state].length; i++) {
        const button = buttons[i];
        button.mouseIsOver = button.contains(x, y);
    }
});

window.addEventListener("click", event => {
    if (!shared.buttonsEnabled) {
        return;
    }

    const scale = uiScale();
    const x = event.offsetX / scale * window.devicePixelRatio;
    const y = event.offsetY / scale * window.devicePixelRatio;

    for (let i = 0; i < buttonMaps[shared.state].length; i++) {
        const button = buttons[i];

        if (button.contains(x, y)) {
            button.clickEvent();
        }
    }
});

curtains().then(() => shared.buttonsEnabled = true);
curtainState.value = 1;
draw();