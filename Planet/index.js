import Planet, { NoiseOptions, PlanetColors, PlanetOptions } from "./Planet.js";

const options = new PlanetOptions();
options.Colors = PlanetColors.snowColors;
options.Detail = .25;
options.NoiseFunction = NoiseOptions.staticQuickNoise;

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

window.planet = planet;