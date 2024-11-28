import { default as shipConfig } from "../../server/lib/ships.js";
import noise from "../../Planet/oldNoise.js";

export const assets = new Map();
export const silhouettes = new Map();
export const shieldFrameBases = {};
export const shieldFrames = {};

export function loadAsset(path, name) {
    const image = new Image();
    image.src = path;

    image.ready = false;

    image.onload = () => {
        image.ready = true;
    };

    assets.set(name, image);
}

export function generateSilhouette(image, name, r, g, b) {
    const canvas = new OffscreenCanvas(128, 128);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0, 128, 128);

    const imageData = ctx.getImageData(0, 0, 128, 128);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const a = imageData.data[i + 3];

        if (a > 0) {
            imageData.data[i] = r;
            imageData.data[i + 1] = g;
            imageData.data[i + 2] = b;
            imageData.data[i + 3] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    silhouettes.set(name, canvas.transferToImageBitmap());
}

export function generateShieldFrame(image, name, phase) {
    const size = 256;
    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const a = imageData.data[i + 3];

        if (a > 0) {
            const x = (i / 4) % size;
            const y = (i / 4 / size) | 0;
            const angleRot = Math.PI * 2 * phase / 16;
            const dist = 1;

            const xx = x + Math.sin(angleRot) * dist * (i % 3 ? -2 : 1);
            const yy = y + Math.cos(angleRot) * dist * (i % 2 ? 2 : -1);

            const noiseSeed = Math.max(.2, noise.simplex3(xx / (20 * (.75 + .5 * Math.sin(x))), yy / 15, .5) + 1.5);

            imageData.data[i] = 25 * (noiseSeed * .5);
            imageData.data[i + 1] = 100 * noiseSeed;
            imageData.data[i + 2] = 255;
            imageData.data[i + 3] = 80;

            imageData.data[i] = Math.min(255, Math.max(0, imageData.data[i]));
            imageData.data[i + 1] = Math.min(255, Math.max(0, imageData.data[i + 1]));
            imageData.data[i + 2] = Math.min(255, Math.max(0, imageData.data[i + 2]));
            imageData.data[i + 3] = Math.min(255, Math.max(0, imageData.data[i + 3]));
        }
    }

    ctx.putImageData(imageData, 0, 0);

    if (shieldFrames[name] === undefined) {
        shieldFrames[name] = [];
    }

    shieldFrames[name][phase] = canvas.transferToImageBitmap();
}

export function getShieldFrame(image, name, phase) {
    if (shieldFrames[name] === undefined || shieldFrames[name][phase] === undefined) {
        generateShieldFrame(shieldFrameBases[name] ?? image, name, phase);
        shieldFrameBases[name] ??= shieldFrames[name][phase];
    }

    return shieldFrames[name][phase];
}

export function turnImageIntoShards(image) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    const shards = [];

    const baseAngle = Math.random() * Math.PI * 2;
    const shardCount = 4 + Math.random() * 7 | 0;

    const x = Math.random() * image.width;
    const y = Math.random() * image.height;

    for (let i = 0; i < shardCount; i++) {
        const startAngle = baseAngle + i / shardCount * Math.PI * 2;
        const endAngle = baseAngle + (i + 1) / shardCount * Math.PI * 2;

        // Clip and paste to a new canvas
        const shardCanvas = new OffscreenCanvas(image.width, image.height);
        const shardCtx = shardCanvas.getContext("2d");

        shardCtx.beginPath();
        shardCtx.moveTo(x, y);
        shardCtx.arc(x, y, image.width, startAngle, endAngle);
        shardCtx.closePath();
        shardCtx.clip();

        shardCtx.drawImage(canvas, 0, 0);

        shards.push(shardCanvas);
    }

    return shards;
}

for (const key in shipConfig) {
    loadAsset(`/assets/ships/${shipConfig[key].asset}`, shipConfig[key].asset);
}

for (let i = 1; i <= 10; i++) {
    loadAsset(`/assets/explosions/explosion${i}.png`, `explosion${i}`);
}

for (let i = 1; i <= 5; i++) {
    loadAsset(`/assets/explosions/blueExplosion${i}.png`, `blueExplosion${i}`);
}

loadAsset("/assets/explosions/fire.png", "fireSprite");