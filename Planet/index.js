import Planet, { Color, NoiseOptions, PlanetColors, PlanetOptions } from "./Planet.js";

const options = new PlanetOptions();
options.Radius = 256;
options.Seed = Math.random();
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

document.getElementById("planetRadius").oninput = function () {
    let value = +document.getElementById("planetRadius").value;
    value = Math.min(Math.max(1, value + .5 | 0), 4096);

    options.Radius = value;
    generate();
}

document.getElementById("planetDetail").oninput = function () {
    let value = +document.getElementById("planetDetail").value;
    value = Math.min(Math.max(.01, value), 512);

    options.Detail = value;
    generate();
}

document.getElementById("planetSeed").value = options.Seed;
document.getElementById("planetSeed").oninput = function () {
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

noiseFuncDropdown.onchange = function () {
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

colorTypeDropdown.onchange = function () {
    options.Colors = PlanetColors.expandStandardColors(+document.getElementById("colorDepth").value, PlanetColors[colorTypeDropdown.value]);
    console.log(options.Colors);
    generate();
}

document.getElementById("colorDepth").oninput = function () {
    let value = +document.getElementById("colorDepth").value;
    value = Math.min(Math.max(1, value + .5 | 0), 64);

    options.Colors = PlanetColors.expandStandardColors(value, PlanetColors[colorTypeDropdown.value]);
    console.log(options.Colors);
    generate();
}

{
    const key = Object.keys(PlanetColors)[Math.random() * Object.keys(PlanetColors).length | 0];
    options.Colors = PlanetColors.expandStandardColors(+document.getElementById("colorDepth").value, PlanetColors[key]);
    console.log(options.Colors);

    colorTypeDropdown.value = key;
}

generate();
window.generate = generate;

window.getOptions = () => {
    const data = [
        options.Radius + .5 | 0,
        options.Seed.toFixed(5),
        options.Detail.toFixed(2),
        colorTypeDropdown.value,
        +document.getElementById("colorDepth").value + .5 | 0,
        noiseFuncDropdown.value
    ];

    return data.join(";");
}

document.getElementById("export").onclick = function() {
    const data = window.getOptions();
    
    confirm("The data is \"" + data + "\". Copy it to your clipboard?") && navigator.clipboard.writeText(data);
}

document.getElementById("import").onclick = function() {
    const data = prompt("Enter the data to import:");
    if (!data) return;

    const parts = data.replaceAll("\"", "").split(";");
    if (parts.length !== 6) {
        alert("Invalid data.");
        return;
    }

    options.Radius = +parts[0];
    options.Seed = +parts[1];
    options.Detail = +parts[2];
    colorTypeDropdown.value = parts[3];
    document.getElementById("colorDepth").value = +parts[4];
    noiseFuncDropdown.value = parts[5];

    options.Colors = PlanetColors.expandStandardColors(+document.getElementById("colorDepth").value, PlanetColors[colorTypeDropdown.value]);
    options.NoiseFunction = NoiseOptions[noiseFuncDropdown.value];

    generate();
}