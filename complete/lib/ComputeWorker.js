import Planet, { NoiseOptions, PlanetColors, PlanetOptions } from "../../Planet/Planet.js";

class Color {
    /**
     * @type {Map<string, string>}
     */
    static #cache = new Map();
    
    static #lerp(from, to, strength) {
        return (to - from) * strength + from;
    }

    static mix(primary, secondary, amount) {
        const key = `m${primary}${secondary}${amount}`;

        if (this.#cache.has(key)) {
            return this.#cache.get(key);
        }

        const pr = parseInt(primary.slice(1), 16);
        const se = parseInt(secondary.slice(1), 16);

        const re = 
            1 << 24 |
            (this.#lerp((pr >> 16) & 255, (se >> 16) & 255, amount) | 0) << 16 |
            (this.#lerp((pr >> 8) & 255, (se >> 8) & 255, amount) | 0) << 8 |
            (this.#lerp(pr & 255, se & 255, amount) | 0);

        const hex = "#" + re.toString(16).slice(1);

        this.#cache.set(key, hex);

        return hex;
    }

    static distance(primary, secondary) {
        const key = `d${primary}${secondary}`;

        if (this.#cache.has(key)) {
            return this.#cache.get(key);
        }

        const pr = parseInt(primary.slice(1), 16);
        const se = parseInt(secondary.slice(1), 16);

        const r = (pr >> 16) & 255 - (se >> 16) & 255;
        const g = (pr >> 8) & 255 - (se >> 8) & 255;
        const b = pr & 255 - se & 255;

        const dist = Math.sqrt(r * r + g * g + b * b);

        this.#cache.set(key, dist);

        return dist;
    }
}

function loadPlanet(sourceColor) {
    const planetOptions = new PlanetOptions();
    planetOptions.Radius = 128;
    planetOptions.Detail = .1 + Math.random() * .9;
    planetOptions.Seed = Math.random();
    planetOptions.Clouds.Seed = Math.random();
    planetOptions.NoiseFunction = [NoiseOptions.perlin2, NoiseOptions.perlin3, NoiseOptions.quickNoise, NoiseOptions.simplex2, NoiseOptions.simplex3][Math.floor(Math.random() * 5)];
    planetOptions.Clouds.NoiseFunction = [NoiseOptions.perlin2, NoiseOptions.perlin3, NoiseOptions.quickNoise, NoiseOptions.simplex2, NoiseOptions.simplex3][Math.floor(Math.random() * 5)];

    let minColDist = Infinity,
        cols = PlanetColors.chooseForMe();

    for (const key in PlanetColors) {
        const dist = Math.min(...PlanetColors[key].map(c => Color.distance(c[2], sourceColor)));
        if (dist < minColDist) {
            minColDist = dist;
            cols = PlanetColors[key];
        }
    }

    planetOptions.Colors = cols;

    const planet = new Planet(planetOptions);
    planet.generate();

    return createImageBitmap(planet.canvas);
}

self.onmessage = function({ data }) {
    switch (data[0]) {
        case 0: // Generate planet
            loadPlanet(data[1]).then(imageBitmap => {
                self.postMessage([0, data[2], imageBitmap], [imageBitmap]);
            });
            break;
    }
}