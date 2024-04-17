import { canvas, ctx, uiScale } from "../shared/canvas.js";
import { drawText } from "../shared/render.js";
import { lerp } from "../shared/shared.js";
import Planet, { planetConfig } from "./Planet.js";

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
    constructor() {
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

        window.addEventListener("wheel", event => {
            this.camera.realZoom += event.deltaY / 1000;
            this.camera.realZoom = Math.max(this.camera.realZoom, .05);
            this.camera.realZoom = Math.min(this.camera.realZoom, 2.75);
        });

        window.addEventListener("mousemove", event => {
            this.mouseX = event.clientX * window.devicePixelRatio;
            this.mouseY = event.clientY * window.devicePixelRatio;
        
            this.mouseDirX = event.movementX;
            this.mouseDirY = event.movementY;
        });

        window.addEventListener("mousedown", event => {
            if (event.button === 2) {
                this.rightMouseDown = true;
            } else {
                const scale = uiScale() * this.camera.zoom;    
                const x = (this.mouseX - canvas.width / 2) / scale + this.camera.x;
                const y = (this.mouseY - canvas.height / 2) / scale + this.camera.y;
        
                let selected;
        
                this.planets.forEach(planet => {
                    if (Math.sqrt(Math.pow(planet.x - x, 2) + Math.pow(planet.y - y, 2)) <= 135) {
                        selected = planet;
                    }
                });
        
                this.selectedPlanet = selected ?? null;
            }
        });

        window.addEventListener("mouseup", event => {
            if (event.button === 2) {
                this.rightMouseDown = false;
            }
        });
    }

    init() {
        planetConfig.forEach(($, i) => {
            this.planets.set(i, new Planet(i));
        });
    }

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

        this.planets.forEach(planet => planet.render());
        this.planets.forEach(planet => planet.text());

        ctx.restore();
    }
}