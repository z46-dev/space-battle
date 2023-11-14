const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;

    canvas.lineJoin = canvas.lineCap = "round";
}

window.addEventListener("resize", resize);
resize();

function lerp(a, b, t) {
    return a + (b - a) * t;
}

class Color {
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

    static random() {
        return `#${Math.random().toString(16).slice(2, 8)}`;
    }
}

function circle(x, y, radius, color, shader = (x, y) => [0, 0, 0]) {
    const c = new OffscreenCanvas(radius, radius);
    const c2 = c.getContext("2d");

    c2.fillStyle = color;
    c2.beginPath();
    c2.arc(radius / 2 | 0, radius / 2 | 0, radius / 2 | 0, 0, Math.PI * 2);
    c2.fill();

    const imageData = c2.getImageData(0, 0, radius, radius);

    for (let index = 0; index < imageData.data.length; index += 4) {
        if (imageData.data[index + 3] === 0) {
            continue;
        }

        const x = Math.round((index / 4) % radius);
        const y = Math.round((index / 4) / radius);

        const [red, green, blue] = shader(x, y);

        imageData.data[index] = red;
        imageData.data[index + 1] = green;
        imageData.data[index + 2] = blue;
    }

    c2.putImageData(imageData, 0, 0);

    ctx.drawImage(c, x - radius / 2, y - radius / 2);
}

class Scene {
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

    static standardColors = [
        [-1, -.75, Color.mix(Scene.palette.water, Scene.palette.black, .5)],
        [-.75, -.5, Color.mix(Scene.palette.water, Scene.palette.black, .25)],
        [-.5, -.25, Scene.palette.water],
        [-.25, 0, Color.mix(Scene.palette.sand, Scene.palette.black, .25)],
        [0, .25, Scene.palette.sand],
        [.25, .5, Color.mix(Scene.palette.grass, Scene.palette.black, .25)],
        [.5, .75, Scene.palette.grass],
        [.75, 1, Color.mix(Scene.palette.forest, Scene.palette.black, .25)],
        [1, 1, Scene.palette.forest]
    ];

    static desertColors = [
        [-1, -.75, Color.mix(Scene.palette.redSand, Scene.palette.black, .5)],
        [-.75, -.5, Color.mix(Scene.palette.redSand, Scene.palette.black, .25)],
        [-.5, -.25, Scene.palette.redSand],
        [-.25, 0, Color.mix(Scene.palette.sand, Scene.palette.black, .5)],
        [0, .25, Color.mix(Scene.palette.sand, Scene.palette.black, .25)],
        [.25, .5, Scene.palette.sand],
        [.5, .75, Color.mix(Scene.palette.sand, Scene.palette.mountain, .334)],
        [.75, 1, Color.mix(Scene.palette.sand, Scene.palette.mountain, .667)],
        [1, 1, Scene.palette.mountain]
    ];

    static snowColors = [
        [-1, -.75, Color.mix(Scene.palette.grass, Scene.palette.black, .5)],
        [-.75, -.5, Color.mix(Scene.palette.grass, Scene.palette.black, .25)],
        [-.5, -.25, Scene.palette.forest],
        [-.25, 0, Color.mix(Scene.palette.ice, Scene.palette.black, .25)],
        [0, .25, Scene.palette.ice],
        [.25, .5, Color.mix(Scene.palette.mountain, Scene.palette.black, .25)],
        [.5, .75, Scene.palette.mountain],
        [.75, 1, Color.mix(Scene.palette.snow, Scene.palette.black, .25)],
        [1, 1, Scene.palette.snow]
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

    static Planet = class Planet {
        constructor(radius, color, lighting = { x: 0, y: 0 }) {
            this.radius = radius + .5 | 0;
            this.color = color;
            this.lighting = lighting;
            this.canvas = new OffscreenCanvas(radius, radius);
            this.ctx = this.canvas.getContext("2d");

            this.cloudCanvas = new OffscreenCanvas(radius, radius);
            this.cloudCtx = this.cloudCanvas.getContext("2d");

            this.seed = Math.random() * Date.now();
            this.cloudSeed = Math.random() * Date.now();

            if (Math.random() > .667) {
                this.noise = quickNoise.create((new Array(256)).fill(0).map((_, i) => i).sort(() => Math.random() - .5));
            } else if (Math.random() > .5){
                this.noise = noise.simplex3;
            } else {
                this.noise = noise.perlin3;
            }

            if (Math.random() > .667) {
                this.cloudNoise = quickNoise.create((new Array(256)).fill(0).map((_, i) => i).sort(() => Math.random() - .5));
            } else if (Math.random() > .5){
                this.cloudNoise = noise.simplex3;
            } else {
                this.cloudNoise = noise.perlin3;
            }

            this.divisor = this.radius * (.25 + Math.random() * .334);
            this.drawCircles();

            this.mainPalette = this.palette;
            this.mainStarPalette = this.starPalette;
        }

        drawCircles() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(this.radius / 2, this.radius / 2, this.radius / 2, 0, Math.PI * 2);
            this.ctx.fill();

            this.cloudCtx.fillStyle = "#ffffff";
            this.cloudCtx.beginPath();
            this.cloudCtx.arc(this.radius / 2, this.radius / 2, this.radius / 2, 0, Math.PI * 2);
            this.cloudCtx.fill();
        }

        get palette() {
            const choices = [Scene.standardColors, Scene.desertColors, Scene.snowColors];
            return choices[Math.random() * choices.length | 0];
        }

        get starPalette() {
            const choices = [Scene.yellowStarColors, Scene.blueStarColors, Scene.redStarColors];
            return choices[Math.random() * choices.length | 0];
        }

        shade(xx, yy) {
            const imageData = this.ctx.getImageData(0, 0, this.radius, this.radius);
            const divisor = this.divisor;
            const chosenPalette = this.mainPalette;

            const lightingDistance = Math.min(this.radius / 3, Math.sqrt(Math.pow(this.lighting.x - xx, 2) + Math.pow(this.lighting.y - yy, 2)));
            const lightingAngle = Math.atan2(this.lighting.y - yy, this.lighting.x - xx);
            const lightingX = Math.cos(lightingAngle) * lightingDistance + this.radius / 2;
            const lightingY = Math.sin(lightingAngle) * lightingDistance + this.radius / 2;

            for (let index = 0; index < imageData.data.length; index += 4) {
                if (imageData.data[index + 3] === 0) {
                    continue;
                }

                const x = Math.round((index / 4) % this.radius);
                const y = Math.round((index / 4) / this.radius);

                const distance = Math.sqrt(Math.pow(lightingX - x, 2) + Math.pow(lightingY - y, 2));
                const amount = Math.max(0, distance / this.radius);

                const noise = this.noise(x / divisor, y / divisor, this.seed);
                let color;

                for (const [min, max, c] of chosenPalette) {
                    if (noise >= min && noise <= max) {
                        color = Color.mix(c, this.color, 1 / 3);
                        break;
                    }
                }

                color = Color.mix(color, "#000000", amount);

                const red = parseInt(color.slice(1, 3), 16);
                const green = parseInt(color.slice(3, 5), 16);
                const blue = parseInt(color.slice(5, 7), 16);

                imageData.data[index] = red;
                imageData.data[index + 1] = green;
                imageData.data[index + 2] = blue;
            }

            this.ctx.putImageData(imageData, 0, 0);
        }

        shadeAsSun() {
            const imageData = this.ctx.getImageData(0, 0, this.radius, this.radius);
            const divisor = this.divisor;
            const chosenPalette = this.mainStarPalette;

            for (let index = 0; index < imageData.data.length; index += 4) {
                if (imageData.data[index + 3] === 0) {
                    continue;
                }

                const x = Math.round((index / 4) % this.radius);
                const y = Math.round((index / 4) / this.radius);

                const noise = this.noise(x / divisor, y / divisor, this.seed);
                
                let color;

                for (const [min, max, c] of chosenPalette) {
                    if (noise >= min && noise <= max) {
                        color = c;
                        break;
                    }
                }

                const red = parseInt(color.slice(1, 3), 16);
                const green = parseInt(color.slice(3, 5), 16);
                const blue = parseInt(color.slice(5, 7), 16);

                imageData.data[index] = red;
                imageData.data[index + 1] = green;
                imageData.data[index + 2] = blue;
            }

            this.ctx.putImageData(imageData, 0, 0);
        }

        shadeClouds(xx, yy) {
            const imageData = this.cloudCtx.getImageData(0, 0, this.radius, this.radius);
            const divisor = this.divisor;

            const lightingDistance = Math.min(this.radius / 3, Math.sqrt(Math.pow(this.lighting.x - xx, 2) + Math.pow(this.lighting.y - yy, 2)));
            const lightingAngle = Math.atan2(this.lighting.y - yy, this.lighting.x - xx);
            const lightingX = Math.cos(lightingAngle) * lightingDistance + this.radius / 2;
            const lightingY = Math.sin(lightingAngle) * lightingDistance + this.radius / 2;

            for (let index = 0; index < imageData.data.length; index += 4) {
                if (imageData.data[index + 3] === 0) {
                    continue;
                }

                const x = Math.round((index / 4) % this.radius);
                const y = Math.round((index / 4) / this.radius);

                const distance = Math.sqrt(Math.pow(lightingX - x, 2) + Math.pow(lightingY - y, 2));
                const amount = Math.max(0, distance / this.radius);

                const noise = this.cloudNoise(x / divisor, y / divisor, this.cloudSeed);
                
                let col = "#555555";
                if (noise < 0) {
                } else if (noise < .25) {
                    col = "#AAAAAA";
                } else if (noise < .5) {
                    col = "#BBBBBB";
                } else if (noise < .75) {
                    col = "#CCCCCC";
                } else if (noise < .875) {
                    col = "#DDDDDD";
                } else if (noise < .95) {
                    col = "#EEEEEE";
                } else if (noise < .99) {
                    col = "#FFFFFF";
                }

                const color = Color.mix(col, "#000000", amount);

                const red = parseInt(color.slice(1, 3), 16);
                const green = parseInt(color.slice(3, 5), 16);
                const blue = parseInt(color.slice(5, 7), 16);

                imageData.data[index] = red;
                imageData.data[index + 1] = green;
                imageData.data[index + 2] = blue;
                imageData.data[index + 3] = 200 + (noise - .5) * 2 * 55;
            }

            this.cloudCtx.putImageData(imageData, 0, 0);
        }

        draw(x, y, star = false, i = 0) {
            if (star) {
                this.shadeAsSun();
                if (i === 0) {
                    this.drawBlueBorder(x, y, true);
                }
                ctx.drawImage(this.canvas, x - this.radius / 2, y - this.radius / 2);
                return;
            }

            this.shade(x, y);
            this.shadeClouds(x, y);
            if (i === 0) {
                this.drawBlueBorder(x, y);
            }
            ctx.drawImage(this.canvas, x - this.radius / 2, y - this.radius / 2);
            ctx.drawImage(this.cloudCanvas, x - this.radius / 2, y - this.radius / 2);
            this.cloudSeed += .01;
        }

        drawBlueBorder(x, y, isSun = false) {
            // Gradient
            const size = this.radius / (isSun ? 1.5 : 1.85);
            const gradient = ctx.createRadialGradient(x, y, this.radius / 3, x, y, size * 5);
            gradient.addColorStop(0, "#00000000");
            gradient.addColorStop(1, "#000000ff");


            // Clear
            ctx.save();
            ctx.fillStyle = gradient;
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}


ctx.fillRect(0, 0, canvas.width, canvas.height);

const lighting = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: (128 + Math.random() * 256) * 2
};

const planets = [];

const positions = [lighting];

for (let i = 0; i < 3; i++) {
    // Position sample to avoid overlap (x, y, size) 
    let size = 150 + Math.random() * 250,
        x = size + Math.random() * (canvas.width - size * 2),
        y = size + Math.random() * (canvas.height - size * 2);

    let overlapping = false;
    for (let j = 0; j < positions.length; j++) {
        let p = positions[j];
        let distance = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2));
        if (distance < (size + p.size) / 2) {
            overlapping = true;
            break;
        }
    }

    if (overlapping) {
        i--;
        continue;
    }

    positions.push({ x, y, size: size * 2 });

    const planet = new Scene.Planet(size, Color.random(), lighting);
    planets.push({
        planet,
        x,
        y
    });
}

// Draw lighting
const sun = new Scene.Planet(lighting.size / 2, "#ffffff", lighting);
sun.draw(lighting.x, lighting.y, true);

let fails = 0;
main: while (fails < 512) {
    let x = Math.random() * canvas.width,
        y = Math.random() * canvas.height,
        size = Math.random() * .5 + .25;

    for (let j = 0; j < positions.length; j++) {
        let p = positions[j];
        let distance = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2));
        if (distance < (size + p.size) / 4) {
            fails++;
            continue main;
        }
    }

    positions.push({ x, y, size: size * 64 });
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
}

// let i = 0;
// setInterval(() => {
//     planets.forEach(planet => {
//         planet.planet.draw(planet.x, planet.y, false, i);
//     });

//     i++;
// }, 50);

    planets.forEach(planet => {
        planet.planet.draw(planet.x, planet.y, false, 0);
    });