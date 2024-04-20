import { shipTypes } from "../../server/lib/constants.js";
import ships from "../../server/lib/ships.js";
import { ctx } from "../shared/canvas.js";
import { Color, assets, drawText, loadAsset } from "../shared/render.js";
import UIElement from "./UIElement.js";

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
        base.forEach(fleet.add);

        let fails = 0;
        while (pop > 0 && fails < 256) {
            let ship = undefined,
                i = 0;

            miniLoop: while (i < possible.length * 5) {
                possible.sort((b, a) => {
                    if (Math.random() > .5) {
                        return .5 - Math.random();
                    }

                    const A = ships[a];
                    const B = ships[b];

                    return A.population - B.population;
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

        // Prevent clicking off of the planet when touching this
        this.element = new UIElement(false);
    }

    add(name) {
        this.ships.set(name, (this.ships.get(name) ?? 0) + 1);
    }

    get population() {
        return this.ships.reduce((total, key) => total + ships[key].population, 0);
    }

    getHeight() {
        return Math.ceil((new Set(this.ships)).size / Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SPACING;
    }

    draw() {
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
            ctx.fillStyle = "#555555";
            ctx.beginPath();
            ctx.arc((i % Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SIZE / 2 + Fleet.ICON_SPACING, Math.floor(i / Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SIZE / 2 + Fleet.ICON_SPACING, Fleet.ICON_SIZE / 2, 0, Math.PI * 2);
            ctx.fill();

            if (!assets.has(ship)) {
                loadAsset("../../assets/ships/" + ships[ship].asset, ship);
            } else {
                ctx.save();
                ctx.translate((i % Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SPACING + Fleet.ICON_SIZE / 2, Math.floor(i / Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SPACING + Fleet.ICON_SIZE / 2);
                ctx.rotate(Math.PI / 4);
                ctx.scale(.8, .8);
                ctx.drawImage(assets.get(ship), -Fleet.ICON_SIZE / 2, -Fleet.ICON_SIZE / 2, Fleet.ICON_SIZE, Fleet.ICON_SIZE);
                ctx.restore();
            }

            drawText("x" + count, (i % Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SIZE / 2 + Fleet.ICON_SPACING, Math.floor(i / Fleet.ICONS_PER_ROW) * (Fleet.ICON_SIZE + Fleet.ICON_SPACING) + Fleet.ICON_SIZE / 2 + Fleet.ICON_SPACING, Fleet.ICON_SIZE / 3, "#FFFFFF");

            i ++;
        });

        return height;
    }
}