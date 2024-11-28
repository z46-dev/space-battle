import { canvas, ctx } from "../shared/canvas.js";
import { Color, drawText } from "../shared/render.js";
import Shipyard from "./Shipyard.js";
import { Faction } from "./Factions.js";
import Fleet from "./Fleet.js";
import UIElement from "./UIElement.js";
import shared, { STATE_TACTICAL_MAP } from "../shared/shared.js";
import { EVENTS, on } from "../../client/lib/state.js";

const loaded = await (await fetch("./assets/planets.json")).json();

const worker = new Worker("./lib/ComputeWorker.js", {
    type: "module"
});

const cache = {};
let cacheID = 0;

worker.onmessage = function ({ data }) {
    switch (data[0]) {
        case 0:
            if (data[1] in cache) {
                cache[data[1]](data[2]);
            }
            break;
    }
}

export function getPlanet(design, color) {
    const id = cacheID++;
    worker.postMessage([0, design ?? false, color, id]);

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

        /**
         * @type {Fleet[]}
         */
        this.fleets = [];

        /**
         * @type {ImageBitmap | null}
         */
        this.realPlanet = null;
        getPlanet(planetConfig[id].design, this.color).then(bm => {
            this.realPlanet = bm;
        });

        /**
         * @type {UIElement}
         */
        this.element = null;
    }

    /**
     * Sets control of the planet to a faction. If null, defaults
     * @param {Faction | null} faction
     * @param {boolean} createFleet
     */
    setControl(faction, createFleet = false) {
        this.income = planetConfig[this.id].income;
        this.controllingFaction = faction;

        if (faction?.capitalPlanet?.name === this.name) {
            this.income = faction.capitalPlanet.baseIncome;
            this.isCapital = faction.capitalPlanet;
        }

        if (createFleet) {
            this.fleets.push(Fleet.random(this.isCapital ? this.isCapital.fleetPopulation : (30 + (this.income / 10 | 0)), faction.key));
            this.fleets[this.fleets.length - 1].setFaction(faction);
        }
    }

    render(scale, playerFaction) {
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

        if (this.fleets.length > 0) {
            const totalRadians = this.fleets.length * Math.PI / 6;
            for (let i = 0; i < this.fleets.length; i++) {
                this.fleets[i].planet = this;
                if (this.fleets[i].inTransit) {
                    this.fleets[i].draggable.isDragging = false;
                    if (this.fleets[i].transitPath.length > 0) {
                        if (this.fleets[i].transitProgress >= this.fleets[i].transitPath[0].distance) {
                            // Move the fleet to the next planet
                            const nextPlanet = this.fleets[i].transitPath.shift().planet;

                            if (this.fleets[i].transitPath.length === 0) {
                                this.fleets[i].inTransit = false;
                            }

                            this.fleets[i].planet = nextPlanet;
                            nextPlanet.fleets.push(this.fleets[i]);
                            this.fleets[i].transitProgress = 0;

                            if (nextPlanet.controllingFaction?.id !== this.fleets[i].faction?.id) {
                                const myFleet = this.fleets[i];
                                const enemyFleet = nextPlanet.fleets[0];

                                if (!enemyFleet) {
                                    nextPlanet.setControl(myFleet.faction, false);

                                    myFleet.transitPath = [];
                                    myFleet.inTransit = false;
                                    myFleet.transitProgress = 0;
                                } else {
                                    if (
                                        myFleet.faction.id !== playerFaction.id &&
                                        enemyFleet.faction.id !== playerFaction.id
                                    ) {
                                        let winner = myFleet.population === enemyFleet.population ? Math.random() > .5 : myFleet.population > enemyFleet.population;

                                        console.log(`AI Battle between ${myFleet.faction.name} and ${enemyFleet.faction.name} won by ${winner ? myFleet.faction.name : enemyFleet.faction.name}`);

                                        if (winner) {
                                            nextPlanet.fleets = nextPlanet.fleets.filter(fleet => fleet !== enemyFleet);
                                            nextPlanet.setControl(myFleet.faction, false);
                                        } else {
                                            nextPlanet.fleets = nextPlanet.fleets.filter(fleet => fleet !== myFleet);
                                            this.fleets = this.fleets.filter(fleet => fleet !== myFleet);
                                        }

                                        return;
                                    }

                                    let first = myFleet.faction.id === playerFaction.id ? myFleet : enemyFleet,
                                        second = myFleet.faction.id === playerFaction.id ? enemyFleet : myFleet;

                                    shared.beginBattle(first.__ships, second.__ships);

                                    on(EVENTS.BATTLE_END, data => {
                                        shared.state = STATE_TACTICAL_MAP;

                                        console.log(data);

                                        const me = data[0];
                                        const enemy = data[1];

                                        first.ships.clear();
                                        second.ships.clear();

                                        for (const ship of me.survived) {
                                            first.add(ship);
                                        }

                                        for (const ship of enemy.survived) {
                                            second.add(ship);
                                        }

                                        if (myFleet.population <= 0) {
                                            nextPlanet.fleets = nextPlanet.fleets.filter(fleet => fleet !== myFleet);
                                        } else if (enemyFleet.population <= 0) {
                                            nextPlanet.fleets = nextPlanet.fleets.filter(fleet => fleet !== enemyFleet);
                                            nextPlanet.setControl(myFleet.faction, false);
                                        }
                                    }, true);
                                }
                            }

                            this.fleets = this.fleets.filter(fleet => fleet !== this.fleets[i]);
                            return;
                        }

                        const angle = Math.atan2(this.fleets[i].transitPath[0].planet.y - this.y, this.fleets[i].transitPath[0].planet.x - this.x);
                        const distance = this.fleets[i].transitProgress;

                        this.fleets[i].draggable.x = Math.cos(angle) * distance + this.x;
                        this.fleets[i].draggable.y = Math.sin(angle) * distance + this.y;

                        this.fleets[i].transitProgress += 4;
                    }
                }

                const angle = totalRadians / this.fleets.length * i - Math.PI / 2;

                if (!this.fleets[i].draggable.isDragging && !this.fleets[i].inTransit) {
                    this.fleets[i].draggable.x = Math.cos(angle) * 225 + this.x;
                    this.fleets[i].draggable.y = Math.sin(angle) * 225 + this.y;
                }

                this.fleets[i].draggable.radius = 50 + 10 * this.fleets[i].draggable.isDragging;
                this.fleets[i].draggable.scaleAtRender = 1 / scale;
                this.fleets[i].draggable.callback = () => alert("Fleet " + this.fleets[i].faction.name);

                ctx.fillStyle = this.fleets[i].faction?.color ?? "#000000";
                ctx.strokeStyle = Color.mix(ctx.fillStyle, "#000000", .2);
                ctx.lineWidth = 5;

                ctx.beginPath();
                ctx.arc(this.fleets[i].draggable.x, this.fleets[i].draggable.y, this.fleets[i].draggable.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                drawText(this.fleets[i].population, this.fleets[i].draggable.x, this.fleets[i].draggable.y, this.fleets[i].draggable.radius * .9, "#FFFFFF");
            }
        }
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