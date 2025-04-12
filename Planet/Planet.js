import perlinNoise from "./oldNoise.js";
import quickNoise from "./noise.js";

const quickNoiseTable = [60, 220, 85, 88, 2, 19, 72, 188, 105, 34, 134, 80, 136, 224, 212, 94, 40, 117, 108, 143, 247, 223, 21, 48, 86, 187, 173, 206, 22, 128, 211, 146, 37, 13, 147, 25, 209, 1, 93, 35, 225, 171, 166, 186, 125, 163, 245, 78, 167, 140, 66, 213, 83, 91, 150, 3, 47, 81, 161, 159, 234, 177, 182, 46, 8, 17, 55, 6, 129, 152, 5, 144, 27, 124, 102, 158, 228, 33, 195, 20, 178, 99, 96, 179, 174, 43, 254, 190, 151, 112, 242, 149, 141, 26, 110, 240, 192, 229, 185, 251, 249, 137, 69, 214, 79, 118, 30, 153, 175, 63, 236, 172, 197, 216, 250, 103, 65, 87, 238, 133, 7, 28, 203, 31, 89, 200, 119, 24, 0, 227, 70, 64, 29, 132, 122, 90, 74, 135, 121, 148, 154, 71, 45, 15, 123, 176, 181, 138, 252, 205, 180, 11, 50, 54, 215, 16, 196, 73, 210, 164, 217, 9, 189, 67, 14, 155, 194, 156, 111, 92, 183, 62, 61, 139, 51, 59, 193, 253, 207, 218, 198, 162, 10, 202, 219, 39, 168, 208, 23, 127, 101, 191, 255, 76, 82, 84, 38, 130, 131, 36, 4, 57, 107, 145, 126, 109, 12, 104, 95, 42, 142, 68, 52, 120, 32, 169, 41, 222, 116, 113, 97, 75, 56, 115, 44, 49, 98, 53, 165, 221, 58, 114, 106, 77, 184, 100, 226, 201, 199, 230, 248, 170, 239, 231, 246, 243, 160, 232, 233, 235, 244, 241, 237, 204, 18, 157];

function lerp(a, b, t) {
    return (b - a) * t + a;
}

export class Color {
    static cache = new Map();
    static regex = /\w\w/g;

    static mix(primary, secondary, amount) {
        const key = `${primary}${secondary}${amount}`;

        if (Color.cache.has(key)) {
            return Color.cache.get(key);
        }

        const primaryHex = primary.match(Color.regex);
        const secondaryHex = secondary.match(Color.regex);

        const red = Math.round(lerp(parseInt(primaryHex[0], 16), parseInt(secondaryHex[0], 16), amount)).toString(16).padStart(2, "0");
        const green = Math.round(lerp(parseInt(primaryHex[1], 16), parseInt(secondaryHex[1], 16), amount)).toString(16).padStart(2, "0");
        const blue = Math.round(lerp(parseInt(primaryHex[2], 16), parseInt(secondaryHex[2], 16), amount)).toString(16).padStart(2, "0");

        const hex = `#${red}${green}${blue}`;
        Color.cache.set(key, hex);

        return hex;
    }

    static palette = {
        black: "#000000",
        water: "#1eaefb",
        sand: "#fff5c1",
        grass: "#76ef7c",
        forest: "#16b58d",
        snow: "#ffffff",
        ice: "#b3e1ff",
        mountain: "#b3b3b3",
        redSand: "#ff7f7f"
    };
}

export class PlanetColors {
    static expandStandardColors(numSteps, standardColors) {
        const expandedColors = [];

        for (let i = 0; i < standardColors.length - 1; i++) {
            const [minNoiseValue1, maxNoiseValue1, color1] = standardColors[i];
            const [$, maxNoiseValue2, color2] = standardColors[i + 1];
            const adjustedMin1 = minNoiseValue1;
            const adjustedMax2 = maxNoiseValue1;
            const stepSize = (adjustedMax2 - adjustedMin1) / numSteps;

            for (let j = 0; j < numSteps; j++) {
                const newMinNoiseValue = adjustedMin1 + j * stepSize;
                const newMaxNoiseValue = adjustedMin1 + (j + 1) * stepSize;
                const lerpAmount = (newMinNoiseValue - minNoiseValue1) / (maxNoiseValue2 - minNoiseValue1);
                const interpolatedColor = Color.mix(color1, color2, lerpAmount);
                expandedColors.push([newMinNoiseValue, newMaxNoiseValue, interpolatedColor]);
            }
        }

        if (expandedColors[expandedColors.length - 1][1] !== 1) {
            const [$, maxNoiseValue, color] = expandedColors[expandedColors.length - 1];
            expandedColors.push([maxNoiseValue, 1, color]);
        }

        return expandedColors;
    }

    static standardColors = [
        [-1, -.75, Color.mix(Color.palette.water, Color.palette.black, .5)],
        [-.75, -.5, Color.mix(Color.palette.water, Color.palette.black, .25)],
        [-.5, -.25, Color.palette.water],
        [-.25, 0, Color.mix(Color.palette.sand, Color.palette.black, .25)],
        [0, .25, Color.palette.sand],
        [.25, .5, Color.mix(Color.palette.grass, Color.palette.black, .25)],
        [.5, .75, Color.palette.grass],
        [.75, 1, Color.mix(Color.palette.forest, Color.palette.black, .25)],
        [1, 1, Color.palette.forest]
    ];

    static desertColors = [
        [-1, -.75, Color.mix(Color.palette.redSand, Color.palette.black, .5)],
        [-.75, -.5, Color.mix(Color.palette.redSand, Color.palette.black, .25)],
        [-.5, -.25, Color.palette.redSand],
        [-.25, 0, Color.mix(Color.palette.sand, Color.palette.black, .5)],
        [0, .25, Color.mix(Color.palette.sand, Color.palette.black, .25)],
        [.25, .5, Color.palette.sand],
        [.5, .75, Color.mix(Color.palette.sand, Color.palette.mountain, .334)],
        [.75, 1, Color.mix(Color.palette.sand, Color.palette.mountain, .667)],
        [1, 1, Color.palette.mountain]
    ];

    static snowColors = [
        [-1, -.75, Color.mix(Color.palette.grass, Color.palette.black, .5)],
        [-.75, -.5, Color.mix(Color.palette.grass, Color.palette.black, .25)],
        [-.5, -.25, Color.palette.forest],
        [-.25, 0, Color.mix(Color.palette.ice, Color.palette.black, .25)],
        [0, .25, Color.palette.ice],
        [.25, .5, Color.mix(Color.palette.mountain, Color.palette.black, .25)],
        [.5, .75, Color.palette.mountain],
        [.75, 1, Color.mix(Color.palette.snow, Color.palette.black, .25)],
        [1, 1, Color.palette.snow]
    ];

    static yellowStarColors = [
        [-1, -.75, "#AAAA00"],
        [-.75, -.5, "#BBBB00"],
        [-.5, -.25, "#CCCC00"],
        [-.25, 0, "#DDDD00"],
        [0, .25, "#EEEE00"],
        [.25, .5, "#FFFF00"],
        [.5, .75, "#FFFFFF"],
        [.75, 1, "#FFFFFF"],
        [1, 1, "#FFFFFF"]
    ];

    static blueStarColors = [
        [-1, -.75, "#165785"],
        [-.75, -.5, "#1C638C"],
        [-.5, -.25, "#2C8ED1"],
        [-.25, 0, "#23A8FF"],
        [0, .25, "#0882FF"],
        [.25, .5, "#03CFFC"],
        [.5, .75, "#057FF3"],
        [.75, 1, "#0BFFFC"],
        [1, 1, "#84FFFF"]
    ];

    static redStarColors = [
        [-1, -.75, "#AA0000"],
        [-.75, -.5, "#BB0000"],
        [-.5, -.25, "#CC0000"],
        [-.25, 0, "#DD0000"],
        [0, .25, "#EE0000"],
        [.25, .5, "#FF0000"],
        [.5, .75, "#FF0000"],
        [.75, 1, "#FF0000"],
        [1, 1, "#FF0000"]
    ];

    static externalBluePlanet = [
        [-1, -.3, "#275a95"],
        [-.3, 0, "#184682"],
        [0, .1, "#a9d5f4"],
        [.1, .6, "#81b2e5"],
        [.6, 1, "#383c66"]
    ];

    static externalRedPlanet = [
        [-1, -.3, "#5f3311"],
        [-.3, 0, "#2e1a0b"],
        [0, .1, "#040404"],
        [.1, .6, "#7c5431"],
        [.6, 1, "#3c2c1c"]
    ];

    static externalDarkPlanet = [
        [-1, -.3, "#1c1026"],
        [-.3, 0, "#c6bbb9"],
        [0, .1, "#4c1e3c"],
        [.1, .6, "#21242b"],
        [.6, 1, "#7a748c"]
    ];

    static externalSandPlanet = [
        [-1, -.1, "#916643"],
        [-.1, .1, "#a27342"],
        [.1, .4, "#73706f"],
        [.4, .7, "#3b4449"],
        [.7, 1, "#1c2832"]
    ];

    static externalLavaPlanet = [
        [-1, -.1, "#f47c54"],
        [-.1, .1, "#cb4e42"],
        [.1, .4, "#916643"],
        [.4, .7, Color.palette.mountain],
        [.7, 1, "#5c646c"]
    ];

    static externalForestPlanet = [
        [-1, -.1, "#3C6912"],
        [-.1, .1, "#845c42"],
        [.1, .4, "#728c52"],
        [.4, .7, "#babc71"],
        [.7, 1, "#c9bd96"]
    ];

    static externalLushPlanet = [
        [-1, -.1, "#146459"],
        [-.1, .1, "#40958E"],
        [.1, .4, "#859F93"],
        [.4, .7, "#5DABB0"],
        [.7, 1, "#B5C8CF"]
    ];

    static externalBrightPlanet = [
        [-1, -.1, "#3d324a"],
        [-.1, .2, "#754248"],
        [.2, .5, "#423745"],
        [.5, .95, "#301804"],
        [.95, 1, "#b06b56"]
    ];

    static laxStandard = [
        [-1, -.75, Color.mix(Color.palette.water, Color.palette.black, .5)],
        [-.75, -.5, Color.mix(Color.palette.water, Color.palette.black, .25)],
        [-.5, .1, Color.palette.water],
        [.1, .2, Color.mix(Color.palette.sand, Color.palette.black, .25)],
        [.2, .25, Color.palette.sand],
        [.25, .4, Color.mix(Color.palette.grass, Color.palette.black, .25)],
        [.4, .55, Color.palette.grass],
        [.55, .8, Color.mix(Color.palette.forest, Color.palette.black, .25)],
        [.8, 1, Color.palette.ice]
    ];

    static pinkFlourish = [
        [-1, -.8, Color.mix(Color.palette.water, Color.palette.black, .5)],
        [-.8, -.6, Color.mix(Color.palette.water, Color.palette.black, .25)],
        [-.6, -.4, Color.palette.water],
        [-.4, 0, Color.palette.grass],
        [0, .25, Color.mix(Color.palette.grass, "#EE94FF", .25)],
        [.75, 1, "#EE94FF"]
    ];

    static chooseForMe() {
        const list = Object.keys(PlanetColors).filter(key => key !== "chooseForMe");
        return PlanetColors[list[Math.floor(Math.random() * list.length)]];
    }
}

const quickNoiseTable2 = quickNoise.create(new Array(256).fill(0).map(($, i) => i).sort(() => .5 - Math.random()));
const staticQuickNoiseFunc = quickNoise.create(quickNoiseTable);

// Made like this for Function.name
export class NoiseOptions {
    static quickNoise = function quickNoise() {
        return quickNoiseTable2(...arguments);
    }
    static staticQuickNoise = function staticQuickNoise() {
        return staticQuickNoiseFunc(...arguments);
    }
    static perlin2 = function perlin2() {
        return perlinNoise.perlin2(...arguments);
    }
    static perlin3 = function perlin3() {
        return perlinNoise.perlin3(...arguments);
    }
    static simplex2 = function simplex2() {
        return perlinNoise.simplex2(...arguments);
    }
    static simplex3 = function simplex3() {
        return perlinNoise.simplex3(...arguments);
    }
}

export class PlanetOptions {
    Radius = 256;
    Detail = 1;
    Seed = 0;
    NoiseFunction = NoiseOptions.simplex3;

    Colors = PlanetColors.standardColors;

    Clouds = {
        Seed: 1,
        Detail: 1,
        NoiseFunction: NoiseOptions.simplex3
    };

    Lighting = {
        angle: 0,
        distance: 0
    };

    static fromSave(data) {
        const parts = data.replaceAll("\"", "").split(";");
        if (parts.length < 6) {
            alert("Invalid data.");
            return;
        }

        const options = new PlanetOptions();
        options.Radius = +parts[0];
        options.Seed = +parts[1];
        options.Detail = +parts[2];
        options.Colors = PlanetColors.expandStandardColors(parts[4], PlanetColors[parts[3]]);
        options.NoiseFunction = NoiseOptions[parts[5]];

        if (parts[6] != null) {
            options.Clouds.Seed = +parts[6];
        } else {
            options.Clouds.Seed = Math.random();
        }

        if (parts[7] != null) {
            options.Clouds.Detail = +parts[7];
        } else {
            options.Clouds.Detail = .2 + Math.random();
        }

        if (parts[8] != null) {
            options.Clouds.NoiseFunction = NoiseOptions[parts[8]];
        } else {
            options.Clouds.NoiseFunction = NoiseOptions[Object.keys(NoiseOptions)[Math.random() * Object.keys(NoiseOptions).length | 0]];
        }

        return options;
    }
}

export default class Planet {
    constructor(options = new PlanetOptions()) {
        this.options = options;

        this.canvas = new OffscreenCanvas(this.options.Radius * 2, this.options.Radius * 2);
        this.ctx = this.canvas.getContext("2d", {
            desynchronized: false
        });

        this.planetCanvas = new OffscreenCanvas(this.options.Radius * 2, this.options.Radius * 2);
        this.planetCtx = this.planetCanvas.getContext("2d", {
            desynchronized: false
        });

        this.cloudCanvas = new OffscreenCanvas(this.options.Radius * 2, this.options.Radius * 2);
        this.cloudCtx = this.cloudCanvas.getContext("2d", {
            desynchronized: false
        });
    }

    generatePlanet() {
        const detail = this.options.Radius * 1 / this.options.Detail;
        const ctx = this.planetCtx;

        ctx.beginPath();
        ctx.arc(this.options.Radius, this.options.Radius, this.options.Radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        const imageData = ctx.getImageData(0, 0, this.planetCanvas.width, this.planetCanvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] === 0) {
                continue;
            }

            const x = Math.round((i / 4) % (this.options.Radius * 2));
            const y = Math.round((i / 4) / (this.options.Radius * 2));

            // IMPLEMENT LIGHTING

            const noise = this.options.NoiseFunction(x / detail, y / detail, this.options.Seed);

            for (const [min, max, color] of this.options.Colors) {
                if (noise > min && noise <= max) {
                    imageData.data[i] = parseInt(color.slice(1, 3), 16);
                    imageData.data[i + 1] = parseInt(color.slice(3, 5), 16);
                    imageData.data[i + 2] = parseInt(color.slice(5, 7), 16);
                    break;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    generateClouds() {
        const detail = this.options.Radius * 1 / this.options.Clouds.Detail;
        const ctx = this.cloudCtx;

        ctx.beginPath();
        ctx.arc(this.options.Radius, this.options.Radius, this.options.Radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        const imageData = ctx.getImageData(0, 0, this.cloudCanvas.width, this.cloudCanvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] === 0) {
                continue;
            }

            const x = Math.round((i / 4) % (this.options.Radius * 2));
            const y = Math.round((i / 4) / (this.options.Radius * 2));

            // IMPLEMENT LIGHTING

            const noise = this.options.Clouds.NoiseFunction(x / detail, y / detail, this.options.Clouds.Seed);

            let color = "#555555";
            if (noise < 0) {
            } else if (noise < .25) {
                color = "#AAAAAA";
            } else if (noise < .5) {
                color = "#BBBBBB";
            } else if (noise < .75) {
                color = "#CCCCCC";
            } else if (noise < .875) {
                color = "#DDDDDD";
            } else if (noise < .95) {
                color = "#EEEEEE";
            } else if (noise < .99) {
                color = "#FFFFFF";
            }

            imageData.data[i] = parseInt(color.slice(1, 3), 16);
            imageData.data[i + 1] = parseInt(color.slice(3, 5), 16);
            imageData.data[i + 2] = parseInt(color.slice(5, 7), 16);
            imageData.data[i + 3] = 100 + (noise - .5) * 2 * 55;
        }

        ctx.putImageData(imageData, 0, 0);
    }

    generate() {
        this.generatePlanet();

        if (this.options.Clouds) {
            this.generateClouds();
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.planetCanvas, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.cloudCanvas, 0, 0, this.canvas.width, this.canvas.height);
    }
}