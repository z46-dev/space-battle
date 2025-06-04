import { ctx } from "../shared/canvas.js";
import { Color, drawText } from "../shared/render.js";
import Shipyard from "./Shipyard.js";
import { Faction } from "./Factions.js";
import Fleet from "./Fleet.js";
import UIElement from "./UIElement.js";
import shared from "../shared/shared.js";
import shipConfigs from "../server/lib/ships.js";
import { PlanetConfig } from "../configs/planets.js";

function romanNumeral(n) {
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romanNumerals[n - 1] || n.toString();
}

const workers = [];
const cache = {};
let cacheID = 0;

export function getPlanet(design, color) {
    const id = cacheID++;
    workers[cacheID % workers.length].postMessage([0, design ?? false, color, id]);

    return new Promise(resolve => {
        cache[id] = imageBitmap => {
            delete cache[id];
            resolve(imageBitmap);
        };
    });
}

for (let i = 0; i < 3; i++) {
    const worker = new Worker("./lib/ComputeWorker.js", {
        type: "module"
    });

    worker.onmessage = function ({ data }) {
        switch (data[0]) {
            case 0:
                if (data[1] in cache) {
                    cache[data[1]](data[2]);
                }
                break;
        }
    }

    workers.push(worker);
}

export const PLANET_RENDER_SCALE = 1;

export class BuildQueueItem {
    static TYPE_SHIPYARD = 0;
    static TYPE_STATION = 1;
    static TYPE_SHIP = 2;

    constructor(type, key, time) {
        this.type = type;
        this.key = key;
        this.time = time;
        this.complete = 0;
    }
}

export class PlanetBuilds {
    static MAX_STATION_SLOTS = 2;

    constructor(shipyardOptions, stationOptions) {
        /** @type {BuildQueueItem[]} */
        this.queue = [];

        this.shipyard = null;
        this.shipyardLevel = 0;
        this.maxShipyardLevel = 0;

        this.stationSlots = new Array(PlanetBuilds.MAX_STATION_SLOTS).fill(null).map(() => null);

        /** @type {string[]} */
        this.shipyardOptions = shipyardOptions;

        /** @type {string[]} */
        this.stationOptions = stationOptions;

        /** @type {{id:number,ships:string[]}[]} */
        this.shipyardBuildables = [];
    }

    /**
     * Builds a shipyard on the planet.
     * @param {string} option The shipyard option to build.
     * @param {number} currentMoney The current money of the faction.
     * @returns {number} The cost to subtract from the faction's money.
     */
    buildShipyard(option, currentMoney) {
        if (!this.shipyardOptions.includes(option)) {
            return 0;
        }

        if (this.shipyard != null) {
            return 0;
        }

        if (currentMoney < shipConfigs[option].cost) {
            return 0;
        }

        if (this.queue.filter(i => i.type === BuildQueueItem.TYPE_SHIPYARD).length > 0) {
            return 0;
        }

        if (shipConfigs[option].shipyardLevel == null || shipConfigs[option].shipyardLevel > this.maxShipyardLevel) {
            return 0;
        }

        this.queue.push(new BuildQueueItem(BuildQueueItem.TYPE_SHIPYARD, option, shipConfigs[option].cost / 3 | 0));
        return shipConfigs[option].cost;
    }

    /**
     * @returns {number}
     */
    sellShipyard() {
        if (this.shipyard == null) {
            return 0;
        }

        const income = shipConfigs[this.shipyard].cost / 2;
        this.shipyard = null;
        this.shipyardLevel = 0;

        return income;
    }

    /**
     * Builds a station on the planet.
     * @param {string} option The station option to build.
     * @param {number} currentMoney The current money of the faction.
     * @returns {number} The cost to subtract from the faction's money.
     */
    buildStation(option, currentMoney) {
        if (!this.stationOptions.includes(option)) {
            return 0;
        }

        if (currentMoney < shipConfigs[option].cost) {
            return 0;
        }

        if (this.stationSlots.filter(s => s == null).length - this.queue.filter(i => i.type === BuildQueueItem.TYPE_STATION).length > 0) {
            this.queue.push(new BuildQueueItem(BuildQueueItem.TYPE_STATION, option, shipConfigs[option].cost / 4 | 0));
            return shipConfigs[option].cost;
        }

        return 0;
    }

    /**
     * Sells a station on the planet.
     * @param {number} index The index of the station to sell.
     * @returns {number} The income from selling the station.
     */
    sellStation(index) {
        if (index < 0 || index >= PlanetBuilds.MAX_STATION_SLOTS || this.stationSlots[index] == null) {
            return 0;
        }

        const income = shipConfigs[this.stationSlots[index]].cost / 2;
        this.stationSlots[index] = null;

        return income + .5 | 0;
    }

    /**
     * Builds a ship on the planet.
     * @param {string} option The ship option to build.
     * @param {number} currentMoney The current money of the faction.
     * @returns {number} The cost to subtract from the faction's money.
     */
    buildShip(option, currentMoney) {
        if (!this.shipyardBuildables.filter(s => s.id <= this.maxShipyardLevel).some(s => s.ships.includes(option))) {
            return 0;
        }

        if (this.shipyard == null) {
            return 0;
        }

        if (currentMoney < shipConfigs[option].cost) {
            return 0;
        }

        this.queue.push(new BuildQueueItem(BuildQueueItem.TYPE_SHIP, option, shipConfigs[option].cost / 1.5 | 0));
        return shipConfigs[option].cost;
    }

    /**
     * Cancels a build in the queue.
     * @param {number} index The index of the build to cancel.
     * @returns {number} The income from canceling the build.
     */
    cancelBuild(index) {
        if (index < 0 || index >= this.queue.length) {
            return 0;
        }

        const item = this.queue[index];
        this.queue.splice(index, 1);

        return shipConfigs[item.key].cost;
    }

    /**
     * @returns {string[]} A list of ships ready 
     */
    update() {
        const readyShips = [];

        while (this.queue.length > 0 && ++this.queue[0].complete >= this.queue[0].time) {
            const item = this.queue.shift();

            switch (item.type) {
                case BuildQueueItem.TYPE_SHIPYARD:
                    this.shipyard = item.key;
                    this.shipyardLevel = shipConfigs[item.key].shipyardLevel ?? (() => {
                        console.error("Shipyard " + item.key + " does not have a shipyard level defined.");
                        return 0;
                    })();
                    break;
                case BuildQueueItem.TYPE_STATION:
                    const emptySlot = this.stationSlots.findIndex(s => s == null);
                    if (emptySlot !== -1) {
                        this.stationSlots[emptySlot] = item.key;
                    }

                    break;
                case BuildQueueItem.TYPE_SHIP:
                    readyShips.push(item.key);
                    break;
            }
        }

        return readyShips;
    }

    get buildables() {
        const output = [];

        if (this.shipyard == null || this.queue.some(i => i.type === BuildQueueItem.TYPE_SHIPYARD)) {
            output.push(...this.shipyardOptions.filter(s => shipConfigs[s].shipyardLevel <= this.maxShipyardLevel));
        }

        if ((this.stationSlots.filter(s => s != null).length + this.queue.filter(i => i.type === BuildQueueItem.TYPE_STATION).length) < PlanetBuilds.MAX_STATION_SLOTS) {
            output.push(...this.stationOptions.filter(o => !this.stationSlots.includes(o)));
        }

        if (this.shipyard != null) {
            output.push(...this.shipyardBuildables.filter(sb => sb.id <= this.shipyardLevel).map(b => b.ships).flat());
        }

        return output;
    }

    get queueTime() {
        return this.queue.reduce((total, item) => total + (item.time - item.complete), 0);
    }

    save() {
        return {
            queue: this.queue.map(item => ({
                type: item.type,
                key: item.key,
                time: item.time,
                complete: item.complete
            })),
            shipyard: this.shipyard,
            shipyardLevel: this.shipyardLevel,
            maxShipyardLevel: this.maxShipyardLevel,
            stationSlots: this.stationSlots.slice(),
            shipyardOptions: this.shipyardOptions.slice(),
            stationOptions: this.stationOptions.slice(),
            shipyardBuildables: this.shipyardBuildables.map(b => ({ id: b.id, ships: b.ships.slice() }))
        };
    }

    static fromSave(save) {
        const builds = new PlanetBuilds(save.shipyardOptions, save.stationOptions);
        builds.queue = save.queue.map(item => new BuildQueueItem(item.type, item.key, item.time));
        builds.shipyard = save.shipyard;
        builds.shipyardLevel = save.shipyardLevel;
        builds.maxShipyardLevel = save.maxShipyardLevel;
        builds.stationSlots = save.stationSlots.slice();
        builds.shipyardBuildables = save.shipyardBuildables.map(b => ({ id: b.id, ships: b.ships.slice() }));

        return builds;
    }
}

export default class Planet {
    /** @param {PlanetConfig} cfg */
    constructor(id, campaign, cfg) {
        this.id = id;

        /**
         * @type {import("./Campaign.js").default}
         */
        this.campaign = campaign;

        this.name = cfg.name;
        this.color = cfg.color;
        this.income = cfg.income;

        this.x = cfg.x * PLANET_RENDER_SCALE;
        this.y = -cfg.y * PLANET_RENDER_SCALE;

        this.connectingPlanets = [];

        if (cfg.connections != null) {
            for (const connection of cfg.connections) {
                this.connectingPlanets.push(connection);
            }
        } else {
            shared.campaignConfig.connections.forEach(connection => {
                if (connection.includes(this.name)) {
                    this.connectingPlanets.push(connection[0] === this.name ? connection[1] : connection[0]);
                }
            });
        }

        /**
         * @type {Faction}
         */
        this.controllingFaction = null;

        /** @type {Shipyard} */
        this.shipyard = null;

        /** @type {PlanetBuilds} */
        this.builds = null;

        /**
         * @type {Fleet[]}
         */
        this.fleets = [];

        /**
         * @type {ImageBitmap | null}
         */
        this.realPlanet = null;
        getPlanet(cfg.design, this.color).then(bm => {
            this.realPlanet = bm;
        });

        this.planetConfig = cfg;

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
    setControl(faction, createFleet = false, fleetPopulationScale = 1) {
        this.income = this.planetConfig.income;
        this.controllingFaction = faction;

        if (faction?.capitalPlanet?.name === this.name) {
            this.income = faction.capitalPlanet.baseIncome;
            this.isCapital = faction.capitalPlanet;
        } else {
            this.isCapital = null;
        }

        this.builds = new PlanetBuilds(faction?.shipyardOptions ?? [], faction?.stationOptions ?? []);
        this.builds.maxShipyardLevel = this.planetConfig.shipyardLevel;
        this.builds.shipyardBuildables = faction?.shipyardConfigs ?? [];

        if (createFleet) {
            this.fleets.push(Fleet.randomFromFactionConfig(this.isCapital ? this.isCapital.fleetPopulation : (fleetPopulationScale * (10 + (this.income / 20 | 0))), faction));
            this.fleets[this.fleets.length - 1].setFaction(faction);
            this.fleets[this.fleets.length - 1].planet = this;

            if (faction.key !== "") {
                this.builds.shipyard = this.builds.shipyardOptions.filter(s => shipConfigs[s].shipyardLevel <= this.builds.maxShipyardLevel).reverse()[0] ?? null;
                if (this.builds.shipyard != null) {
                    this.builds.shipyardLevel = shipConfigs[this.builds.shipyard].shipyardLevel ?? 0;
                }
            }

            if (this.isCapital) {
                this.builds.stationSlots[0] = this.builds.stationOptions[this.builds.stationOptions.length - 1];
            }
        }

        // if (this.planetConfig.shipyardLevel > 0) {
        //     this.shipyard = new Shipyard(this, this.planetConfig.shipyardLevel);

        //     this.controllingFaction.shipyardConfigs.forEach(conf => {
        //         if (conf.id <= this.planetConfig.shipyardLevel) {
        //             for (const ship of conf.ships) {
        //                 this.shipyard.buildables.set(ship, shipConfigs[ship].cost);
        //             }
        //         }
        //     });
        // } else {
        //     this.shipyard = null;
        // }
    }

    get controllingFactionStrength() {
        return this.fleets.reduce((a, fleet) => {
            if (fleet.faction !== this.controllingFaction) {
                return a;
            }

            return a + fleet.population;
        }, 0) + (this.shipyard ? shipConfigs[this.shipyard].population : 0) + this.builds.stationSlots.reduce((a, station) => {
            if (station == null) {
                return a;
            }

            return a + shipConfigs[station].population;
        }, 0);
    }

    compute() {
        if (this.fleets.length > 0) {
            for (const fleet of this.fleets) {
                fleet.updateInTransit();
            }
        }

        if (this.shipyard != null) {
            this.shipyard.tick();
        }

        if (this.builds != null) {
            for (const ship of this.builds.update()) {
                const eligibleFleets = this.fleets.filter(f => {
                    if (f.faction !== this.controllingFaction) {
                        return false;
                    }

                    if (f.population + shipConfigs[ship].population > 300) {
                        return false;
                    }

                    return true;
                });

                if (eligibleFleets.length > 0) {
                    eligibleFleets[0].add(ship);
                } else {
                    const fleet = new Fleet();
                    fleet.faction = this.controllingFaction;
                    fleet.planet = this;
                    fleet.add(ship);
                    this.fleets.push(fleet);
                }
            }
        }
    }

    drawFleets(scale) {
        if (this.fleets.length > 0) {
            const totalRadians = this.fleets.length * Math.PI / 6;
            for (let i = 0; i < this.fleets.length; i++) {
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
        drawText(`${this.income < 0 ? "" : "+"}${this.income} | Shipyard: ${this.builds.shipyardLevel}/${this.builds.maxShipyardLevel}`, 100, 110, 90 * .4, "#FFFFFF", Color.mix("#FFFFFF", "#000000", .5), "left");
        drawText(`Defense: ${this.builds.stationSlots.map(s => s ? romanNumeral(this.builds.stationOptions.indexOf(s) + 1) : "X").join(", ")}`, 100, 150, 90 * .4, "#FFFFFF", Color.mix("#FFFFFF", "#000000", .5), "left");
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

    save() {
        return {
            id: this.id,
            name: this.name,
            income: this.income,
            controllingFactionID: this.controllingFaction?.id,
            fleets: this.fleets.map(fleet => fleet.save()),
            shipyard: this.shipyard?.save(),
            builds: this.builds?.save()
        };
    }
}