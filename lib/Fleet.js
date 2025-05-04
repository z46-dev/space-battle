import { EVENTS, on } from "../client/lib/state.js";
import { shipTypes } from "../server/lib/constants.js";
import heroes from "../server/lib/heroes.js";
import ships from "../server/lib/ships.js";
import { ctx } from "../shared/canvas.js";
import { Color, assets, drawText, loadAsset } from "../shared/render.js";
import shared, { STATE_TACTICAL_MAP } from "../shared/shared.js";
import factions, { Faction } from "./Factions.js";
import UIElement from "./UIElement.js";

export class FleetShip {
    /**
     * @param {string} key The ship key
     * @param {string} heroKey The hero key
     */
    constructor(key, heroKey = null) {
        this.shipKey = key;
        this.heroKey = heroKey;
    }
}

export class FleetItem {
    /**
     * @param {Fleet} fleet
     * @param {string} name
     * @param {number} count
     */
    constructor(fleet, name, count) {
        this.fleet = fleet;
        this.name = name;
        this.count = count;
    }
}

class TransitNode {
    /**
     * @param {import("./Planet.js").default} planet
     * @param {number} distance
     */
    constructor(planet, distance) {
        this.planet = planet;
        this.distance = distance;
    }
}

export default class Fleet {
    static ICON_SIZE = 100;
    static ICON_SPACING = 7.5;
    static ICONS_PER_ROW = 5;

    // All non-fighter/bomber ships
    static ships = Object.keys(ships).filter(key => ships[key].classification >= shipTypes.Corvette && !key.includes("SHIPYARD"));
    static random(pop, faction = "", base = []) {
        const possible = Fleet.ships.filter(key => faction === "" || key.endsWith("_" + faction));
        const avgPop = possible.reduce((total, key) => total + ships[key].population, 0) / possible.length;

        const fleet = new Fleet();
        base.forEach(ship => {
            fleet.add(ship);
            pop -= ships[ship].population;
        });

        let fails = 0;
        while (pop > 0 && fails < 256) {
            let ship = undefined,
                i = 0;

            miniLoop: while (i < possible.length * 5) {
                possible.sort((b, a) => {
                    if (Math.random() > .04) {
                        return .5 - Math.random();
                    }

                    const A = ships[a];
                    const B = ships[b];

                    return B.population - A.population;
                });

                const unit = ships[possible[0]];

                if (unit == null) {
                    console.log("NULL SHIP", possible[0]);
                }

                if (
                    unit.population <= pop &&
                    (unit.population <= avgPop * 1.1 || Math.random() > .9)
                ) {
                    ship = possible[0];
                    break miniLoop;
                }

                i++;
            }

            if (ship !== undefined) {
                fleet.add(ship);
                pop -= ships[ship].population;
            } else {
                fails++;
            }
        }

        return fleet;
    }

    constructor() {
        // Name -> Count
        this.ships = new Map();

        // Hero Key -> Ship Key
        this.heroUnits = new Map();

        // Prevent clicking off of the planet when touching this
        this.element = new UIElement(false);
        this.element.canBeDropedInto = true;
        this.element.object = this;

        // Drag a fleet to another planet
        this.draggable = new UIElement(true, true, true);
        this.draggable.object = this;

        /**
         * @type {import("./Planet.js").default | null}
         */
        this.planet = null;

        this.inTransit = false;
        this.transitProgress = 0;

        /**
         * @type {TransitNode[]}
         */
        this.transitPath = [];

        /**
         * @type {Faction | null}
         */
        this.faction = null;

        /** @type {UIElement[]} */
        this.shipElements = [];

        /** @type {UIElement[]} */
        this.heroElements = [];
    }

    /**
     * @param {import("./Planet.js").default[]} destinationPath 
     */
    transitTo(destinationPath) {
        if (destinationPath == null || destinationPath.length === 0 || this.planet === null || this.planet === destinationPath[destinationPath.length - 1]) {
            return;
        }

        this.inTransit = true;
        this.transitPath = [];

        let last = this.planet;

        for (let i = 1; i < destinationPath.length; i++) {
            this.transitPath.push(new TransitNode(destinationPath[i], Math.sqrt((destinationPath[i].x - last.x) ** 2 + (destinationPath[i].y - last.y) ** 2)));
            last = destinationPath[i];
        }
    }

    setFaction(faction) {
        this.faction = faction;
    }

    add(name) {
        this.ships.set(name, (this.ships.get(name) ?? 0) + 1);

        if (this.ships.size !== this.shipElements.length) {
            this.shipElements = [];

            for (let i = 0; i < this.ships.size; i++) {
                this.shipElements.push(new UIElement(true, true, false));
            }
        }
    }

    addHero(hero, ship) {
        if (this.heroUnits.has(hero)) {
            return;
        }

        this.heroUnits.set(hero, ship);

        if (this.heroUnits.size !== this.heroElements.length) {
            this.heroElements = [];

            for (let i = 0; i < this.heroUnits.size; i++) {
                this.heroElements.push(new UIElement(true, true, false));
            }
        }
    }

    remove(name) {
        if (!this.ships.has(name)) {
            return;
        }

        this.ships.set(name, this.ships.get(name) - 1);

        if (this.ships.get(name) <= 0) {
            this.ships.delete(name);
        }
    }

    removeHero(hero) {
        if (!this.heroUnits.has(hero)) {
            return;
        }

        this.heroUnits.delete(hero);

        this.heroElements = [];
        for (let i = 0; i < this.heroUnits.size; i++) {
            this.heroElements.push(new UIElement(true, true, false));
        }
    }

    get population() {
        let total = 0;

        this.ships.forEach((count, key) => {
            total += ships[key].population * count;
        });

        this.heroUnits.forEach(key => {
            const ship = ships[key];

            if (ship == null) {
                return;
            }

            total += ship.population;
        });

        return total;
    }

    getHeight() {
        const num = this.ships.size + this.heroUnits.size;
        return Math.ceil(num / Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SPACING;
    }

    draw(scale, isMultiple) {
        const height = this.getHeight();
        ctx.fillStyle = "#AAAAAA";
        ctx.strokeStyle = Color.darken("#AAAAAA", .2);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(0, 0, Fleet.ICONS_PER_ROW * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SPACING, height);
        ctx.fill();
        ctx.stroke();

        this.element.width = Fleet.ICONS_PER_ROW * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SPACING;
        this.element.height = height;


        let i = 0;
        this.ships.forEach((count, ship) => {
            let x, y;

            if (isMultiple && this.shipElements[i].isDragging) {
                x = this.shipElements[i].x - this.element.x;
                y = this.shipElements[i].y - this.element.y;
            } else {
                x = (i % Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SIZE / 2 + Fleet.ICON_SPACING;
                y = Math.floor(i / Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SIZE / 2 + Fleet.ICON_SPACING;
            }

            ctx.fillStyle = "#555555";
            ctx.beginPath();
            ctx.arc(x, y, Fleet.ICON_SIZE / 2, 0, Math.PI * 2);
            ctx.fill();

            if (!assets.has(ship)) {
                loadAsset("/assets/ships/" + ships[ship].asset, ship);
            } else {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(Math.PI / 4);
                ctx.scale(.8, .8);
                ctx.drawImage(assets.get(ship), -Fleet.ICON_SIZE / 2, -Fleet.ICON_SIZE / 2, Fleet.ICON_SIZE, Fleet.ICON_SIZE);
                ctx.restore();
            }

            if (isMultiple) {
                this.shipElements[i].x = x + this.element.x;
                this.shipElements[i].y = y + this.element.y;
                this.shipElements[i].radius = Fleet.ICON_SIZE / 2;
                this.shipElements[i].object = new FleetItem(this, ship, count);
                this.shipElements[i].scaleAtRender = 1 / scale;
                this.planet.campaign.UIElements.push(this.shipElements[i]);

                const elem = this.shipElements[i];
                elem.onDrop = drop => this.dropItemIntoOtherFleet(elem.object, drop);
            }

            drawText("x" + count, x, y + Fleet.ICON_SPACING, Fleet.ICON_SIZE / 3, "#FFFFFF");

            i++;
        });

        this.heroUnits.forEach((ship, hero) => {
            let x, y;

            if (isMultiple && this.heroElements[i].isDragging) {
                x = this.heroElements[i].x - this.element.x;
                y = this.heroElements[i].y - this.element.y;
            } else {
                x = (i % Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SIZE / 2 + Fleet.ICON_SPACING;
                y = Math.floor(i / Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SIZE / 2 + Fleet.ICON_SPACING;
            }

            ctx.fillStyle = "#555555";
            ctx.beginPath();
            ctx.arc(x, y, Fleet.ICON_SIZE / 2, 0, Math.PI * 2);
            ctx.fill();

            if (!assets.has(hero)) {
                loadAsset("/assets/portraits/" + heroes[hero].image, hero);
            } else if (!assets.has(ship)) {
                loadAsset("/assets/ships/" + ships[ship].asset, ship);
            } else {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(Math.PI / 4);
                ctx.scale(.8, .8);
                ctx.drawImage(assets.get(hero), -Fleet.ICON_SIZE / 2, -Fleet.ICON_SIZE / 2, Fleet.ICON_SIZE, Fleet.ICON_SIZE);
                ctx.restore();
            }

            if (isMultiple) {
                this.heroElements[i].x = x + this.element.x;
                this.heroElements[i].y = y + this.element.y;
                this.heroElements[i].radius = Fleet.ICON_SIZE / 2;
                this.heroElements[i].object = new FleetItem(this, hero, ship);
                this.heroElements[i].scaleAtRender = 1 / scale;
                this.planet.campaign.UIElements.push(this.heroElements[i]);

                const elem = this.heroElements[i];
                elem.onDrop = drop => this.dropItemIntoOtherFleet(elem.object, drop);
            }

            drawText("x" + shipTypes[ship].population, x, y + Fleet.ICON_SPACING, Fleet.ICON_SIZE / 3, "#FFFFFF");

            i++;
        });

        return height;
    }

    updateInTransit() {
        if (!this.inTransit) {
            return;
        }

        this.draggable.isDragging = false;

        if (this.transitPath.length === 0) {
            this.inTransit = false;
            return;
        }

        const angleToPlanet = Math.atan2(this.transitPath[0].planet.y - this.planet.y, this.transitPath[0].planet.x - this.planet.x);

        this.draggable.x = this.planet.x + Math.cos(angleToPlanet) * this.transitProgress;
        this.draggable.y = this.planet.y + Math.sin(angleToPlanet) * this.transitProgress;

        if (this.transitProgress < this.transitPath[0].distance) {
            this.transitProgress += 8;
            return;
        }

        const node = this.transitPath.shift();

        this.transitProgress = 0;

        const newPlanet = node.planet;
        this.planet.fleets = this.planet.fleets.filter(fleet => fleet !== this);
        this.planet = newPlanet;
        newPlanet.fleets.push(this);

        if (this.transitPath.length > 0) {
            if (this.transitPath[0].planet.controllingFaction === this.faction) {
                return;
            }
        }

        this.inTransit = false;

        if (newPlanet.controllingFaction !== this.faction) {
            this.initializeInvasion();
        }
    }

    initializeInvasion() {
        const planet = this.planet;
        const enemyFleets = planet.fleets.filter(fleet => !fleet.inTransit && fleet.faction !== this.faction);

        if (enemyFleets.length === 0) {
            planet.setControl(this.faction);
            return;
        }

        const playerFaction = planet.campaign.playerFaction;

        if (this.faction !== playerFaction && planet.controllingFaction !== playerFaction) {
            const enemyPopulation = enemyFleets.reduce((total, fleet) => total + fleet.population, 0);
            const winner = this.population === enemyPopulation ? Math.random() > .5 : this.population > enemyPopulation;

            if (winner) {
                planet.fleets = planet.fleets.filter(fleet => fleet.faction === this.faction);
                planet.setControl(this.faction);
            } else {
                planet.fleets = planet.fleets.filter(fleet => fleet.faction !== this.faction);
            }

            console.log(`[AI] Invasion of ${planet.name} by ${this.faction.name} vs ${enemyFleets.map(fleet => fleet.faction.name).join(", ")}: ${winner ? this.faction.name : enemyFleets.map(fleet => fleet.faction.name).join(", ")} wins`);
            return;
        }

        // If the player faction is involved, determine if they are attacking or defending and initiate the battle
        shared.beginBattle(this.__ships, enemyFleets.map(fleet => fleet.__ships).flat(), this.faction !== playerFaction, this.planet.planetConfig, this.faction.color, enemyFleets[0].faction.color, planet.name);

        on(EVENTS.BATTLE_END, data => {
            // Remove all other fleets from the planet
            enemyFleets.forEach(fleet => {
                if (fleet.planet == null) {
                    return;
                }

                fleet.planet.fleets = fleet.planet.fleets.filter(f => f !== fleet);
                fleet.planet = null;
            });

            if (this.planet != null) {
                this.planet.fleets = this.planet.fleets.filter(f => f !== this);
                this.planet = null;
            }

            shared.state = STATE_TACTICAL_MAP;

            const me = data[+(this.faction !== playerFaction)];
            const enemy = data[+(this.faction === playerFaction)];

            planet.fleets = [];

            const meFleet = new Fleet();
            const enemyFleet = new Fleet();
            meFleet.setFaction(this.faction);
            enemyFleet.setFaction(enemyFleets[0].faction);

            for (const ship of me.survived) {
                meFleet.add(ship);
            }

            for (const ship of enemy.survived) {
                enemyFleet.add(ship);
            }

            if (meFleet.population > 0) {
                planet.fleets.push(meFleet);
                
                if (this.faction !== planet.controllingFaction) {
                    planet.setControl(meFleet.faction);
                }

                meFleet.planet = planet;
            }

            if (enemyFleet.population > 0) {
                planet.fleets.push(enemyFleet);

                if (enemyFleet.faction !== playerFaction) {
                    planet.setControl(enemyFleet.faction);
                }

                enemyFleet.planet = planet;
            }

            planet.campaign.autosaveTick();
        }, true);
    }

    get __ships() {
        const output = [];

        this.ships.forEach((count, ship) => {
            for (let i = 0; i < count; i++) {
                output.push(ship);
            }
        });

        return output;
    }

    /** @param {FleetItem} item */
    dropItemIntoOtherFleet(item, drop) {
        if (drop === null) {
            return;
        }

        if (!(drop.object instanceof Fleet)) {
            return;
        }

        /** @type {Fleet} */
        const otherFleet = drop.object;

        if (otherFleet === item.fleet) {
            return;
        }

        if (otherFleet.population + ships[item.name].population > 300) {
            return;
        }

        item.fleet.remove(item.name);

        if (item.fleet.population === 0) {
            item.fleet.planet.fleets = item.fleet.planet.fleets.filter(f => f !== item.fleet);
        }

        otherFleet.add(item.name);
    }

    save() {
        return {
            ships: Array.from(this.ships.entries()).map(([name, count]) => ({ name, count })),
            planetID:  this.planet.id,
            factionID: this.faction.id,
            transit: this.inTransit ? {
                path: this.transitPath.map(n => ({ name: n.planet.name, distance: n.distance })),
                progress: this.transitProgress
            } : null
        };
    }

    /**
     * @param {Object} saved
     * @param {import("./Planet.js").default} planet 
     * @returns {Fleet}
     */
    static fromSaved(saved, planet) {
        const fleet = new Fleet();
        fleet.planet = planet;
        fleet.faction = factions.find(faction => faction.id === saved.factionID) ?? null;

        saved.ships.forEach(({ name, count }) => {
            for (let i = 0; i < count; i++) {
                fleet.add(name);
            }
        });

        if (saved.transit) {
            fleet.inTransit = true;
            fleet.transitProgress = saved.transit.progress;

            saved.transit.path.forEach(node => {
                const planet = fleet.planet.campaign.getPlanet(node.name);
                fleet.transitPath.push(new TransitNode(planet, node.distance));
            });
        }

        return fleet;
    }
}