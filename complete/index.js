import { canvas, ctx, uiScale } from "./shared/canvas.js";
import { drawText } from "./shared/render.js";

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

function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = uiScale();
    const width = canvas.width / scale;
    const height = canvas.height / scale;

    ctx.save();
    ctx.scale(scale, scale);

    drawText("Hello, World!", width / 2, height / 2, 50, "#00BEFF");

    ctx.restore();
}

draw();