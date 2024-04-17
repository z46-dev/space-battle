import Planet, { Color, NoiseOptions, PlanetColors, PlanetOptions } from "./Planet.js";

const options = new PlanetOptions();
options.Radius = 256;
options.Seed = Math.random();
options.Colors = PlanetColors.expandStandardColors(3, PlanetColors.chooseForMe());

console.log(options.Colors);

options.Detail = 1;
options.NoiseFunction = NoiseOptions.staticQuickNoise;

function generate() {
    document.body.querySelectorAll("img").forEach(child => child.remove());

    const planet = new Planet(options);
    planet.generate();
    planet.canvas.convertToBlob({
        type: "image/png"
    }).then(blob => {
        const url = URL.createObjectURL(blob);

        const image = document.createElement("img");
        image.src = url;

        image.onload = () => {
            document.body.appendChild(image);
        }
    });
}

generate();
window.generate = generate;

document.getElementById("planetRadius").oninput = function() {
    let value = +document.getElementById("planetRadius").value;
    value = Math.min(Math.max(1, value + .5 | 0), 4096);

    options.Radius = value;
    generate();
}

document.getElementById("planetDetail").oninput = function() {
    let value = +document.getElementById("planetDetail").value;
    value = Math.min(Math.max(.01, value), 512);

    options.Detail = value;
    generate();
}

document.getElementById("planetSeed").value = options.Seed;
document.getElementById("planetSeed").oninput = function() {
    let value = +document.getElementById("planetSeed").value;

    options.Seed = value;
    generate();
}

const noiseFuncDropdown = document.getElementById("noiseFunction");

for (const key in NoiseOptions) {
    const option = document.createElement("option");
    option.textContent = key;
    option.value = key;

    if (key === options.NoiseFunction.name) {
        option.selected = true;
    }

    noiseFuncDropdown.appendChild(option);
}

noiseFuncDropdown.onchange = function() {
    options.NoiseFunction = NoiseOptions[noiseFuncDropdown.value];
    generate();
}

const colorTypeDropdown = document.getElementById("colorType");

for (const key in PlanetColors) {
    const option = document.createElement("option");
    option.textContent = key;
    option.value = key;
    colorTypeDropdown.appendChild(option);
}

colorTypeDropdown.onchange = function() {
    options.Colors = PlanetColors[colorTypeDropdown.value];
    generate();
}

window.getOptions = () => {
    const obj = JSON.parse(JSON.stringify(options));
    obj.NoiseFunction = options.NoiseFunction.name;
    obj.Clouds.NoiseFunction = options.Clouds.NoiseFunction.name;

    return JSON.stringify(obj);
}