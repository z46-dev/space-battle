import Planet, { NoiseOptions, PlanetColors, PlanetOptions } from "../../Planet/Planet.js";
import * as assetsLib from "./graphicalFuncs.js";

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");
export const planetOptions = new PlanetOptions();

planetOptions.Radius = 1024;
planetOptions.Detail = 1 + Math.random() * 2;
planetOptions.Seed = Math.random();
planetOptions.Clouds.Seed = Math.random();
planetOptions.NoiseFunction = NoiseOptions.staticQuickNoise;
planetOptions.Colors = PlanetColors.expandStandardColors(1 + Math.random() * 8 | 0, PlanetColors.chooseForMe());

export const planet = new Planet(planetOptions);

export class Sprite {
    static generateFrames(image, xFrames, yFrames) {
        const frames = [];
        const width = image.width / xFrames;
        const height = image.height / yFrames;

        for (let y = 0; y < yFrames; y++) {
            for (let x = 0; x < xFrames; x++) {
                frames.push({
                    x: x * width,
                    y: y * height,
                    width,
                    height,
                });
            }
        }

        return frames;
    }

    static configs = {
        explosion1: [4, 4],
        explosion2: [8, 4],
        explosion3: [4, 4],
        explosion4: [8, 6],
        explosion5: [6, 6],
        explosion6: [7, 7],
        explosion7: [3, 3],
        explosion8: [8, 8],
        explosion9: [6, 6],
        explosion10: [6, 6],
        blueExplosion1: [5, 5],
        blueExplosion2: [4, 4, .125],
        blueExplosion3: [16, 8, .35],
        blueExplosion4: [5, 5, .2],
        blueExplosion5: [4, 4, .2],
        fireSprite: [3, 3]
    };

    constructor(name, loop = true) {
        this.image = assetsLib.assets.get(name);
        this.frames = Sprite.generateFrames(this.image, ...Sprite.configs[name]);
        this.currentFrame = 0;
        this.loop = loop;
        this.speed = Sprite.configs[name][2] ?? .25;
    }

    draw(ctx, x, y, width, height) {
        if (this.currentFrame >= this.frames.length - 1) {
            if (this.loop) {
                this.currentFrame = 0;
            } else {
                return;
            }
        }

        const frame = this.frames[this.currentFrame | 0];

        ctx.drawImage(
            this.image,
            frame.x,
            frame.y,
            frame.width,
            frame.height,
            x,
            y,
            width,
            height
        );

        this.currentFrame += this.speed;
    }
}