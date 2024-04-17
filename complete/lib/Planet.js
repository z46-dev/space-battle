import { ctx } from "../shared/canvas.js";
import { Color, drawText } from "../shared/render.js";
import Shipyard from "./Shipyard.js";
import { Faction } from "./Factions.js";

const loaded = await (await fetch("./assets/planets.json")).json();

const worker = new Worker("./lib/ComputeWorker.js", {
    type: "module"
});

const cache = {};
let cacheID = 0;

worker.onmessage = function({ data }) {
    switch (data[0]) {
        case 0:
            if (data[1] in cache) {
                cache[data[1]](data[2]);
            }
            break;
    }
}

export function getPlanet(color) {
    const id = cacheID ++;
    worker.postMessage([0, color, id]);

    return new Promise(resolve => {
        cache[id] = imageBitmap => {
            delete cache[id];
            resolve(imageBitmap);
        };
    });
}

export const PLANET_RENDER_SCALE = 2;

export const planetConfig = loaded.planets;
export const planetConnections = loaded.connections;

export default class Planet {
    constructor(id) {
        this.id = id;
        this.name = planetConfig[id].name;
        this.color = planetConfig[id].color;
        this.income = planetConfig[id].income;

        this.x = planetConfig[id].x * PLANET_RENDER_SCALE;
        this.y = planetConfig[id].y * PLANET_RENDER_SCALE;

        this.connectingPlanets = [];

        planetConnections.forEach(connection => {
            if (connection.includes(this.name)) {
                this.connectingPlanets.push(connection[0] === this.name ? connection[1] : connection[0]);
            }
        });

        /**
         * @type {Faction}
         */
        this.controllingFaction = null;
        this.shipyard = new Shipyard(this, planetConfig[id].shipyardLevel);

        this.fleets = [];

        /**
         * @type {ImageBitmap | null}
         */
        this.realPlanet = null;
        getPlanet(this.color).then(bm => {
            console.log(bm);
            this.realPlanet = bm;
        });
    }

    /**
     * Sets control of the planet to a faction. If null, defaults
     * @param {Faction | null} faction 
     */
    setControl(faction) {
        this.income = planetConfig[this.id].income;
        this.controllingFaction = faction;

        if (faction?.capitalPlanet?.name === this.name) {
            this.income = faction.capitalPlanet.baseIncome;
        }
    }

    render() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.controllingFaction?.color ?? "#000000";
        ctx.lineWidth = 15;

        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, 135, 0, Math.PI * 2);

        for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 3 * i + (performance.now() / 2000);

            ctx.moveTo(Math.cos(angle) * 135, Math.sin(angle) * 135);
            ctx.lineTo(Math.cos(angle) * 100, Math.sin(angle) * 100);
        }

        ctx.closePath();
        ctx.stroke();

        if (this.realPlanet) {
            ctx.drawImage(this.realPlanet, -90, -90, 180, 180);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, 90, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }

    text() {
        ctx.save();
        ctx.translate(this.x, this.y);

        drawText(this.name.toUpperCase(), 100, 90 * .75, 90 * .55, this.color, Color.mix(this.color, "#000000", .5), "left");
        drawText((this.income < 0 ? "" : "+") + this.income + " | Shipyard Lvl: " + this.shipyard?.level, 100, 110, 90 * .4, "#FFFFFF", Color.mix("#FFFFFF", "#000000", .5), "left");

        ctx.restore();
    }

    connectTo(other) {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(other.x, other.y);
        ctx.closePath();
        ctx.stroke();
    }
}