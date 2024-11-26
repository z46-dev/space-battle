import { canvas, ctx, uiScale } from "../shared/canvas.js";
import { drawText } from "../shared/render.js";
import shared, { STATE_TACTICAL_MAP, lerp } from "../shared/shared.js";
import factions, { Faction } from "./Factions.js";
import Planet, { planetConfig } from "./Planet.js";
import UIElement from "./UIElement.js";

export class Camera {
    realX = 0;
    realY = 0;
    realZoom = 1;

    x = 0;
    y = 0;
    zoom = 3;

    interpolate() {
        this.x = lerp(this.x, this.realX, .1);
        this.y = lerp(this.y, this.realY, .1);
        this.zoom = lerp(this.zoom, this.realZoom, .1);
    }
}

export default class Campaign {
    constructor(playerFaction) {
        this.width = 4096;
        this.height = 4096;

        /**
         * @type {Map<number, Planet>}
         */
        this.planets = new Map();
        this.camera = new Camera();
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDirX = 0;
        this.mouseDirY = 0;
        this.rightMouseDown = false;

        /**
         * @type {Planet}
         */
        this.selectedPlanet = null;

        /**
         * @type {Faction}
         */
        this.playerFaction = playerFaction;

        /**
         * @type {UIElement[]}
         */
        this.UIElements = [];

        window.addEventListener("wheel", event => {
            if (shared.state !== STATE_TACTICAL_MAP) {
                return;
            }

            this.camera.realZoom += event.deltaY / 1000;
            this.camera.realZoom = Math.max(this.camera.realZoom, .05);
            this.camera.realZoom = Math.min(this.camera.realZoom, 2.75);
        });

        window.addEventListener("mousemove", event => {
            if (shared.state !== STATE_TACTICAL_MAP) {
                return;
            }

            this.mouseX = event.clientX * window.devicePixelRatio;
            this.mouseY = event.clientY * window.devicePixelRatio;

            this.mouseDirX = event.movementX;
            this.mouseDirY = event.movementY;
        });

        window.addEventListener("mousedown", event => {
            if (shared.state !== STATE_TACTICAL_MAP) {
                return;
            }

            this.mouseX = event.clientX * window.devicePixelRatio;
            this.mouseY = event.clientY * window.devicePixelRatio;

            if (event.button === 2) {
                this.rightMouseDown = true;
            } else {
                for (let i = this.UIElements.length - 1; i >= 0; i--) {
                    if (this.UIElements[i].contains(this.mouseX, this.mouseY)) {
                        this.UIElements[i].callback();
                        return;
                    }
                }

                this.selectedPlanet = null;
            }
        });

        window.addEventListener("mouseup", event => {
            if (shared.state !== STATE_TACTICAL_MAP) {
                return;
            }

            if (event.button === 2) {
                this.rightMouseDown = false;
            }
        });

        this.lastTick = -3e4;
    }

    init() {
        planetConfig.forEach(($, i) => {
            const planet = new Planet(i);
            planet.element = new UIElement(true);
            planet.element.callback = () => {
                this.selectedPlanet = planet;
            }

            this.planets.set(i, planet);
        });

        factions.forEach(faction => {
            if (faction.campaignTypes.indexOf(shared.campaignType) === -1) {
                return;
            }

            faction.defaultStartingPlanets.forEach(planetName => {
                this.getPlanet(planetName).setControl(faction, true);
            });
        });
    }

    /**
     * @returns {Planet}
     */
    getPlanet(name) {
        let planet = null;

        this.planets.forEach(p => {
            if (p.name === name) {
                planet = p;
            }
        });

        return planet;
    }

    draw() {
        this.UIElements.length = 0;
        if (this.rightMouseDown) {
            this.camera.realX -= this.mouseDirX / this.camera.realZoom;
            this.camera.realY -= this.mouseDirY / this.camera.realZoom;
        }

        this.camera.interpolate();
        const scale = uiScale() * this.camera.zoom;
        ctx.save();
        ctx.fillStyle = "#1B1B25";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.translate(-this.camera.x * scale, -this.camera.y * scale);
        ctx.scale(scale, scale);

        const routesDone = {};

        this.planets.forEach(planet => {
            routesDone[planet.name] = true;

            planet.connectingPlanets.forEach(otherPlanet => {
                if (routesDone[otherPlanet] === true) {
                    return;
                }

                planet.connectTo(this.getPlanet(otherPlanet));
            });
        });

        this.planets.forEach(planet => {
            planet.element.x = planet.x * scale - this.camera.x * scale + canvas.width / 2;
            planet.element.y = planet.y * scale - this.camera.y * scale + canvas.height / 2;
            planet.element.radius = 90 * scale;

            this.UIElements.push(planet.element);
            planet.render();
        });

        this.planets.forEach(planet => planet.text());

        ctx.restore();

        if (performance.now() - this.lastTick > 3e4) {
            this.lastTick = performance.now();
            this.dailyTick();
        }

        this.drawUI();
    }

    drawUI() {
        const scale = uiScale();
        ctx.save();
        ctx.scale(scale, scale);

        ctx.textAlign = "left";

        if (this.playerFaction !== undefined) {
            drawText(this.playerFaction.name.toUpperCase(), 10, 20, 30, this.playerFaction.color);
            drawText(`Money: ${this.playerFaction.money} | Income: ${this.playerFaction.income}`, 10, 50, 20, "#FFFFFF");
        }

        if (this.selectedPlanet !== null) {
            drawText(this.selectedPlanet.name.toUpperCase(), 30, 80, 20, this.selectedPlanet.color);
            drawText(`Faction: ${this.selectedPlanet.controllingFaction.name}`, 30, 100, 20, this.selectedPlanet.controllingFaction.color);

            let yVal = 120;
            for (let i = 0; i < this.selectedPlanet.fleets.length; i++) {
                ctx.save();
                ctx.translate(30, yVal);
                yVal += this.selectedPlanet.fleets[i].draw();
                ctx.restore();

                this.selectedPlanet.fleets[i].element.x = 30;
                this.selectedPlanet.fleets[i].element.y = yVal;
                this.selectedPlanet.fleets[i].element.scaleAtRender = scale;
                this.UIElements.push(this.selectedPlanet.fleets[i].element);
            }
        }

        ctx.textAlign = "center";

        ctx.restore();
    }

    dailyTick() {
        factions.forEach(faction => {
            if (faction.campaignTypes.indexOf(shared.campaignType) === -1) {
                return;
            }

            faction.income = 0;
            this.planets.forEach(planet => {
                console.log(planet);
                if (planet.controllingFaction.id !== faction.id) {
                    return;
                }

                faction.money += planet.income;
                faction.income += planet.income;
            });
        });

        this.planets.forEach(planet => {
            if (planet.shipyard) {
                planet.shipyard.tick();
            }
        });
    }
}