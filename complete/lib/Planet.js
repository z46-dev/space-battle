import { ctx } from "../shared/canvas.js";
import { Color, drawText } from "../shared/render.js";

const loaded = await (await fetch("./assets/planets.json")).json();

export const PLANET_RENDER_SCALE = 2;

export const planetConfig = loaded.planets;
export const planetConnections = loaded.connections;

export default class Planet {
    constructor(id) {
        this.id = id;
        this.name = planetConfig[id].name;
        this.color = planetConfig[id].color;
        this.income = 0;

        this.x = planetConfig[id].x * PLANET_RENDER_SCALE;
        this.y = planetConfig[id].y * PLANET_RENDER_SCALE;

        this.connectingPlanets = [];

        planetConnections.forEach(connection => {
            if (connection.includes(this.name)) {
                this.connectingPlanets.push(connection[0] === this.name ? connection[1] : connection[0]);
            }
        });

        this.controllingFaction = null;

        this.fleets = [];
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

        ctx.beginPath();
        ctx.arc(0, 0, 90, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

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