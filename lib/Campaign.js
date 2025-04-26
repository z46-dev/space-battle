import { canvas, ctx, uiScale } from "../shared/canvas.js";
import { assets, drawText, loadAsset } from "../shared/render.js";
import shared, { STATE_TACTICAL_MAP, lerp } from "../shared/shared.js";
import factions, { CapitalInfo, Faction } from "./Factions.js";
import Fleet from "./Fleet.js";
import Planet from "./Planet.js";
import UIElement from "./UIElement.js";
import shipConfigs from "../server/lib/ships.js";
import FactionAI from "./FactionAI.js";
import { loadCampaign } from "../shared/loader.js";
import * as autosave from "../shared/autosave.js";

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

        /**
         * @type {UIElement | null}
         */
        this.draggingElement = null;

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

            if (this.draggingElement !== null) {
                this.draggingElement.x = this.mouseX * this.draggingElement.scaleAtRender;
                this.draggingElement.y = this.mouseY * this.draggingElement.scaleAtRender;

                if (this.draggingElement.isGameObject) {
                    const scale = uiScale() * this.camera.zoom;
                    this.draggingElement.x += this.camera.x * scale * this.draggingElement.scaleAtRender - canvas.width / 2 * this.draggingElement.scaleAtRender;
                    this.draggingElement.y += this.camera.y * scale * this.draggingElement.scaleAtRender - canvas.height / 2 * this.draggingElement.scaleAtRender;
                }
            }
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
                const scale = uiScale() * this.camera.zoom;

                for (let i = this.UIElements.length - 1; i >= 0; i--) {
                    if (this.UIElements[i].contains(this.mouseX, this.mouseY, this.camera.x, this.camera.y, canvas.width, canvas.height, scale)) {
                        if (this.UIElements[i].draggable) {
                            this.draggingElement = this.UIElements[i];
                            this.draggingElement.isDragging = true;
                            return;
                        }

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
            } else if (this.draggingElement !== null) {
                const scale = uiScale() * this.camera.zoom;
                for (let i = this.UIElements.length - 1; i >= 0; i--) {
                    if (this.UIElements[i].canBeDropedInto && this.UIElements[i].contains(this.mouseX, this.mouseY, this.camera.x, this.camera.y, canvas.width, canvas.height, scale)) {
                        this.draggingElement.onDrop(this.UIElements[i]);
                        this.draggingElement.isDragging = false;
                        this.draggingElement = null;
                        return;
                    }
                }

                this.draggingElement.isDragging = false;
                this.draggingElement.onDrop(null);
                this.draggingElement = null;
            }
        });

        this.lastTick = -3e4;
        this.tickID = 0;

        /** @type {UIElement[]} */
        this.shipyardButtonsElements = [];

        this.nextAutosave = setTimeout(() => this.autosaveTick(), 1000 * 60 * 5);
    }

    init() {
        shared.campaignConfig.planets.forEach(pConf => {
            const planet = new Planet(pConf.id, this);
            planet.element = new UIElement(true);
            planet.element.canBeDropedInto = planet;
            planet.element.callback = () => {
                this.selectedPlanet = planet;
            }

            this.planets.set(pConf.id, planet);
        });

        factions.forEach(faction => {
            faction.defaultStartingPlanets.forEach(planetName => {
                this.getPlanet(planetName).setControl(faction, true);
            });

            if (faction !== this.playerFaction && faction.key !== "") {
                faction.ai = new FactionAI(faction, this);
            }
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
            planet.render(scale);

            if (planet.shipyard !== null) {
                planet.shipyard.tick();
            }
        });

        this.planets.forEach(planet => planet.text());

        ctx.restore();

        if (performance.now() - this.lastTick > 3e4) {
            this.lastTick = performance.now();
            this.dailyTick();
        }

        this.drawUI();

        if (++this.tickID % 450 === 0) {
            const timer = `AI Tick (${factions.length - 1} factions)`;
            console.time(timer);
            factions.forEach(faction => {
                if (faction.id === this.playerFaction.id) {
                    return;
                }

                faction.ai?.think();
            });

            console.timeEnd(timer);
        }

        if (this.tickID % 300 === 0) {
            console.time("Check fleets");
            this.checkFleets();
            console.timeEnd("Check fleets");
        }
    }

    checkFleets() {
        // Make sure a fleet is only in one planet at a time
        /** @type {Map<Fleet, Planet[]>} */
        const fleets = new Map();
        
        this.planets.forEach(planet => {
            planet.fleets.forEach(fleet => {
                if (!fleets.has(fleet)) {
                    fleets.set(fleet, []);
                }

                fleets.get(fleet).push(planet);
            });
        });

        fleets.forEach((planets, fleet) => {
            if (planets.length > 1) {
                for (let i = 1; i < planets.length; i++) {
                    planets[i].removeFleet(fleet);
                }

                console.warn("Fleet is in multiple planets", fleet, planets);
            }

            fleet.planet = planets[0];
            if (!fleet.planet.fleets.includes(fleet)) {
                fleet.planet.fleets.push(fleet);
            }
        });
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
                this.selectedPlanet.fleets[i].element.x = 30;
                this.selectedPlanet.fleets[i].element.y = yVal;
                this.selectedPlanet.fleets[i].element.scaleAtRender = 1 / scale;
                this.UIElements.push(this.selectedPlanet.fleets[i].element);

                ctx.save();
                ctx.translate(30, yVal);
                yVal += this.selectedPlanet.fleets[i].draw(scale, this.selectedPlanet.fleets.length > 1);
                ctx.restore();
            }

            if (this.selectedPlanet.shipyard != null) {
                ctx.save();

                const width = canvas.width / scale;

                ctx.translate(0, canvas.height / scale - 175);

                ctx.fillStyle = "#252525";
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#505050";

                ctx.beginPath();
                ctx.moveTo(400, 0);
                ctx.lineTo(width - 400, 0);
                ctx.lineTo(width - 300, 210);
                ctx.lineTo(300, 210);
                ctx.closePath();

                ctx.fill();
                ctx.stroke();

                // Translate to it
                ctx.translate(400, 0);

                let i = 0;
                this.selectedPlanet.shipyard.buildables.forEach((cost, name) => {
                    if (i + 1 > this.shipyardButtonsElements.length) {
                        this.shipyardButtonsElements.push(new UIElement(true));
                    }

                    // Circle badges with image of ship (name) and cost at bottom of them
                    const x = 50 + 60 * (i % 15);
                    const y = 40 + 70 * Math.floor(i / 15);

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.fillStyle = "#1B1B25";

                    ctx.beginPath();
                    ctx.arc(0, 0, 30, 0, Math.PI * 2);
                    ctx.fill();

                    if (!assets.has(name)) {
                        loadAsset("/assets/ships/" + shipConfigs[name].asset, name);
                    } else {
                        ctx.save();
                        ctx.rotate(Math.PI / 4);
                        ctx.scale(.8, .8);
                        ctx.drawImage(assets.get(name), -20, -20, 40, 40);
                        ctx.restore();
                    }

                    ctx.textAlign = "center";
                    drawText(cost, 0, 25, 10, "#FFFFFF");

                    ctx.restore();

                    this.shipyardButtonsElements[i].x = x + 400;
                    this.shipyardButtonsElements[i].y = y + canvas.height / scale - 175;
                    this.shipyardButtonsElements[i].radius = 30;
                    this.shipyardButtonsElements[i].scaleAtRender = 1 / scale;
                    this.shipyardButtonsElements[i].callback = () => this.selectedPlanet.shipyard.build(name);

                    this.UIElements.push(this.shipyardButtonsElements[i]);

                    i++;
                });

                for (let i = 0; i < this.selectedPlanet.shipyard.queue.length; i ++) {
                    const obj = this.selectedPlanet.shipyard.queue[i]; // { name, complete, time } (ratio is complete / time)

                    let x = 50 + 60 * i,
                        y = -40;

                    ctx.translate(x, y);

                    ctx.fillStyle = "#111111";
                    ctx.beginPath();
                    ctx.arc(0, 0, 30, 0, Math.PI * 2);
                    ctx.fill();

                    if (!assets.has(obj.name)) {
                        loadAsset("/assets/ships/" + shipConfigs[obj.name].asset, obj.name);
                    } else {
                        ctx.save();
                        ctx.rotate(Math.PI / 4);
                        ctx.scale(.8, .8);
                        ctx.drawImage(assets.get(obj.name), -20, -20, 40, 40);
                        ctx.restore();
                    }

                    ctx.fillStyle = "rgba(255, 255, 255, .2)";
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.arc(0, 0, 30, 0, Math.PI * 2 * obj.complete / obj.time);
                    ctx.lineTo(0, 0);
                    ctx.fill();

                    ctx.translate(-x, -y);
                }

                ctx.restore();
            }
        }

        this.planets.forEach(planet => {
            if (planet.controllingFaction?.id !== this.playerFaction.id) {
                return;
            }

            for (let i = 0; i < planet.fleets.length; i++) {
                if (planet.fleets[i].faction.id !== this.playerFaction.id) {
                    continue;
                }

                planet.fleets[i].draggable.onDrop = drop => {
                    if (drop === null) {
                        return;
                    }

                    const targetPlanet = drop.canBeDropedInto;
                    const fleet = planet.fleets[i];
                    if (!(targetPlanet instanceof Planet) || !(fleet instanceof Fleet)) {
                        console.error("Invalid drop");
                        return;
                    }

                    if (planet === targetPlanet) {
                        console.error("Can't drop fleet on the same planet");
                        return;
                    }

                    const route = this.findRoute(planet, targetPlanet);

                    if (route === null) {
                        console.error("No route found");
                        return;
                    }

                    fleet.transitTo(route);
                }

                this.UIElements.push(planet.fleets[i].draggable);
            }
        });

        ctx.textAlign = "center";

        ctx.restore();
    }

    dailyTick() {
        factions.forEach(faction => {
            faction.income = 0;
            this.planets.forEach(planet => {
                if (planet.controllingFaction.id !== faction.id) {
                    return;
                }

                faction.money += planet.income;
                faction.income += planet.income;
            });

            if (faction.id === this.playerFaction.id) {
                return;
            }
        });

        this.planets.forEach(planet => {
            if (planet.shipyard) {
                planet.shipyard.tick();
            }
        });
    }

    /**
     * Finds the shortest (maybe safe) route to another planet.
     * Safe means that every planet we go through (up until the destination) is controlled by the same faction.
     * 
     * @param {Planet} from The planet to start from
     * @param {Planet} other The planet to find a route to
     */
    findRoute(from, other) {
        const visited = new Set();
        const queue = [[from]];

        while (queue.length > 0) {
            const path = queue.shift();
            const current = path[path.length - 1];

            if (current === other) {
                return path;
            }

            visited.add(current);
            current.connectingPlanets.forEach(planetName => {
                const planet = this.getPlanet(planetName);
                if (visited.has(planet)) {
                    return;
                }

                if (planet.controllingFaction !== from.controllingFaction && planet !== other) {
                    return;
                }

                queue.push([...path, planet]);
            });
        }

        return null;
    }

    save() {
        const save = {
            camera: {
                x: this.camera.realX,
                y: this.camera.realY,
                zoom: this.camera.realZoom
            },
            campaignType: shared.campaignType,
            date: Date.now(),
            planets: [],
            factions: [],
            playerFactionID: this.playerFaction.id
        };

        this.planets.forEach(planet => save.planets.push(planet.save()));
        factions.forEach(faction => save.factions.push(faction.save()));
        
        return save;
    }

    downloadSave() {
        const save = JSON.stringify(this.save());
        const blob = new Blob([save], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "campaign.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }

    async autosaveTick() {
        clearTimeout(this.nextAutosave);

        const currentKey = (new Date).toLocaleString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

        const keys = await autosave.saveKeys();

        if (keys.length >= 10) {
            await autosave.deleteSave(keys.sort()[0]);
        }

        await autosave.insertSave(currentKey, this.save());
        console.log("Autosaved", currentKey);

        this.nextAutosave = setTimeout(() => this.autosaveTick(), 1000 * 60 * 5);
    }

    /**
     * @param {Object} saved
     * @returns {Campaign}
     */
    static fromSaved(saved) {
        shared.campaignType = saved.campaignType;
        shared.campaignConfig = loadCampaign(saved.campaignType);

        factions.length = 0;

        shared.campaignConfig.campaign.factions.forEach(conf => {
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

        const campaign = new Campaign(factions.find(f => f.id === saved.playerFactionID));
        campaign.init();

        campaign.camera.realX = saved.camera.x;
        campaign.camera.realY = saved.camera.y;
        campaign.camera.realZoom = saved.camera.zoom;

        saved.planets.forEach(planet => {
            const p = campaign.getPlanet(planet.name);
            p.id = planet.id;
            p.income = planet.income;

            p.setControl(factions.find(f => f.id === planet.controllingFactionID), false);
            p.fleets = planet.fleets.map(f => Fleet.fromSaved(f, p));

            if (planet.shipyard != null && p.shipyard != null) {
                p.shipyard.queue = planet.shipyard.queue;
            }
        });

        saved.factions.forEach(faction => {
            const f = factions.find(f2 => f2.id === faction.id);
            f.money = faction.money;
            f.income = faction.income;
        });

        return campaign;
    }
}