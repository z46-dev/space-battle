import { shipTypeNames, shipTypes, weaponClassifications, weaponDrawProperties, weaponProperties } from "../server/lib/constants.js";
import { default as shipConfig } from "../server/lib/ships.js";
import heroes from "../server/lib/heroes.js";
import { TENDER_FREQUENCY_SECONDS, TENDER_HEAL_PULSE_AMOUNT } from "../server/lib/weapons.js";

import * as assetsLib from "./lib/graphicalFuncs.js";
import { canvas, ctx, planetOptions, planet, Sprite, regeneratePlanet } from "./lib/canvas.js";
// import { world, camera, mouseDirectionX, mouseDirectionY, shipOver, hardpointOver, rmb, mouseX, mouseY } from "./lib/state.js";
import { ships, projectiles, explosions, squadrons } from "./lib/state.js";
import * as state from "./lib/state.js";
import { uiScale, lerp, lerpAngle } from "./lib/util.js";
import { FactionConfig } from "../configs/baseFactions.js";
import createPattern from "../shared/background.js";

function hextoRGB(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}

const teamColors = ["#0000FF", "#FF0000"];
const teamColorRGBs = teamColors.map(color => hextoRGB(color));
let planetName = "Wild Space";

state.initWorld();

function drawBar(cx, cy, width, height, pct, color) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = "#111111";
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(-width / 2, -height / 2, width * pct, height);
    ctx.restore();
}

const mixColors = (() => {
    const cache = new Map();
    return (primary, secondary, x) => {
        const key = `${primary}_${secondary}_${x}`;
        if (cache.has(key)) {
            return cache.get(key);
        }

        const parse = hex => hex.match(/\w\w/g).map(e => parseInt(e, 16));
        const [r1, g1, b1] = parse(primary);
        const [r2, g2, b2] = parse(secondary);

        const result = `#${Math.round(r1 + (r2 - r1) * x).toString(16).padStart(2, "0")}${Math.round(g1 + (g2 - g1) * x).toString(16).padStart(2, "0")}${Math.round(b1 + (b2 - b1) * x).toString(16).padStart(2, "0")}`;
        cache.set(key, result);
        return result;
    };
})();

function generateWeaponSprite(props) {
    const canvas = new OffscreenCanvas(128, 128);
    const ctx = canvas.getContext("2d");

    const size = 16;

    const spacing = size;// * props.strength;

    ctx.save();

    ctx.lineCap = ctx.lineJoin = "round";

    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (props.isCircle) {
        ctx.fillStyle = props.color;
    } else {
        ctx.strokeStyle = props.color;
        ctx.lineWidth = size / 2; //* props.strength / 2;
    }

    if (props.shadows) {
        ctx.shadowBlur = size + 5;
        ctx.shadowColor = mixColors(props.color, "#FFFFFF", .5);
    }

    ctx.beginPath();

    if (props.isCircle) {
        ctx.arc(0, 0, size * props.strength / 2, 0, Math.PI * 2);
    } else {
        for (let i = 0; i < props.count; i++) {
            const x = -spacing * props.count / 2 + spacing * i;

            ctx.moveTo(x, -size/* * props.strength*/ * 2);
            ctx.lineTo(x, size/* * props.strength*/ * 2);
        }
    }

    ctx.closePath();

    if (props.isCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }

    if (!props.isCircle) {
        ctx.strokeStyle = mixColors(props.color, "#FFFFFF", .5);
        ctx.lineWidth = size * props.strength * .25;

        ctx.beginPath();

        for (let i = 0; i < props.count; i++) {
            const x = -spacing * props.count / 2 + spacing * i;

            ctx.moveTo(x, -size/* * props.strength*/ * 2.5);
            ctx.lineTo(x, size/* * props.strength*/ * 2.5);
        }

        ctx.closePath();

        ctx.stroke();
    }

    return canvas.transferToImageBitmap();
}

weaponDrawProperties.forEach(props => {
    if (props.key === "SubjugatorIonBlast") {
        return;
    }

    props.sprite = generateWeaponSprite(props);
});

// let closeByStars = [];

// setInterval(() => {
//     const scale = uiScale() * state.camera.zoom;
//     const AABB = state.world.starGrid.getAABB({
//         x: state.camera.x,
//         y: state.camera.y,
//         size: canvas.width / scale,
//         width: 1,
//         height: 1
//     });

//     closeByStars = state.world.starGrid.retrieve({
//         _AABB: AABB,
//         id: state.world.starCounter
//     });
// }, 1000);

function drawText(text, x, y, size, fill = "#FFFFFF", align = "left") {
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.font = `bold ${size}px sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillStyle = fill;
    ctx.fillText(text, x, y);
    ctx.restore();
}

function drawWrappedText(text, x, y, size, maxWidth = 200, fill = "#FFFFFF", align = "left") {
    const words = text.split(" ");
    let line = "",
        height = 0;

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.font = `bold ${size}px sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillStyle = fill;

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const measurement = measureText(testLine, size);

        if (measurement.width > maxWidth && i > 0) {
            ctx.fillText(line, x, y);
            line = words[i] + " ";
            y += measurement.height * 1.2;
            height += measurement.height * 1.2;
        } else {
            line = testLine;
        }
    }

    ctx.fillText(line, x, y);
    height += measureText(line, size).height * 1.1;

    ctx.restore();

    return height;
}

const textMeasureCache = new Map();
function measureText(text, size) {
    const key = `${size}|${text}`;
    if (textMeasureCache.has(key)) {
        return textMeasureCache.get(key);
    }

    ctx.save();
    ctx.font = `bold ${size}px sans-serif`;
    const width = ctx.measureText(text).width;
    const height = ctx.measureText("M").width;
    ctx.restore();

    const result = { width, height };
    textMeasureCache.set(key, result);
    return result;
}

function drawCommander(commander) {
    const hero = heroes[commander.name];

    const img = assetsLib.assets.get(hero.image);

    if (!img || !img.ready) {
        assetsLib.loadAsset(`/assets/portraits/${hero.image}`, hero.image);
        return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, .5, 0, 6.3);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, -.5, -.5, 1, 1);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(0, 0, .5, 0, 6.3);
    ctx.closePath();
    ctx.lineWidth = .05;
    ctx.strokeStyle = "#EEEEAA";
    ctx.stroke();

    if (commander.health !== false) {
        drawBar(0, .6, .9, .075, commander.health, "#00FFC8");
    }
}

function drawCommanders(uScale, additionalY) {
    const size = 75;
    const x = canvas.width / uScale - size - 10;
    let y = canvas.height / uScale - size - 20 - additionalY;
    ctx.globalAlpha = 1;

    for (const commander of state.world.commanders) {
        ctx.save();
        ctx.translate(x + size / 2, y + size / 2);
        ctx.scale(size, size);

        drawCommander(commander);

        ctx.restore();

        y -= size + 15;
    }
}

let fps = 0,
    mspt = 0,
    frames = 0,
    totalMS = 0;

const drawOptions = {
    stars: true,
    asteroids: true,
    ships: true,
    deathClones: true,
    projectiles: true,
    hardpoints: true,
    squadrons: true,
    explosions: true
};

window.drawOpts = drawOptions;

const background = createPattern(ctx, 8192, false);

export default function draw() {
    const start = performance.now();
    state.camera.realX = Math.max(-state.world.width, Math.min(state.camera.realX, state.world.width));
    state.camera.realY = Math.max(-state.world.height, Math.min(state.camera.realY, state.world.height));

    state.camera.x = lerp(state.camera.x, state.camera.realX, .2);
    state.camera.y = lerp(state.camera.y, state.camera.realY, .2);
    state.camera.zoom = lerp(state.camera.zoom, state.camera.realZoom, .2);

    state.worker.postMessage(state.inputs.rmb ? [0, -state.inputs.mouseDirectionX / state.camera.zoom, -state.inputs.mouseDirectionY / state.camera.zoom, state.camera.cZoom] : [0, 0, 0, state.camera.cZoom]);

    const scale = uiScale() * state.camera.zoom;

    state.inputs.hardpointOver = null;
    state.inputs.shipOver = null;

    ctx.fillStyle = "#1B1B25";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-state.camera.x, -state.camera.y);

    ctx.save();
    ctx.fillStyle = background;

    ctx.fillRect(-state.world.width * 2, -state.world.height * 2, state.world.width * 4, state.world.height * 4);
    ctx.restore();

    const realMouseX = (state.inputs.mouseX - canvas.width / 2) / scale + state.camera.x;
    const realMouseY = (state.inputs.mouseY - canvas.height / 2) / scale + state.camera.y;

    // if (drawOptions.stars) {
    //     ctx.fillStyle = "#DEDEDE";
    //     ctx.shadowColor = "#FFFFFF";
    //     closeByStars.forEach(star => {
    //         const XYHash = (star.x + star.y) * (.5 + Math.sin(start / 1000) * .5);
    //         const size = 15 + (.5 + Math.sin(XYHash / (star.x + star.y))) * 10;

    //         if (size * scale > 3) {
    //             ctx.shadowBlur = size * 3;
    //         }

    //         ctx.beginPath();
    //         ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
    //         ctx.fill();
    //     });
    // }

    const planetSize = planetOptions.Radius * (4 + planetOptions.SizeScalar * 6);
    const planetDist = state.world.width - 250;
    ctx.shadowBlur = planetOptions.Radius * 2;
    ctx.shadowColor = planetOptions.Colors[3][2];
    ctx.drawImage(planet.canvas, -planetDist, -planetDist, planetSize, planetSize);

    ctx.shadowBlur = 0;

    if (drawOptions.asteroids) {
        state.world.asteroids.forEach(asteroid => {
            const size = asteroid.size;

            ctx.save();
            ctx.translate(asteroid.x, asteroid.y);
            ctx.rotate(asteroid.angle + start / (size * size / 1.5) * (asteroid.id % 2 ? -1 : 1));
            ctx.scale(size, size);

            const assetName = asteroid.type + ".png";

            if (assetsLib.assets.has(assetName)) {
                const asset = assetsLib.assets.get(assetName);
                if (asset.ready) {
                    ctx.drawImage(asset, -1, -1, 2, 2);
                } else {
                    assetsLib.loadAsset(`/assets/asteroids/${assetName}`, assetName);
                }
            } else {
                assetsLib.loadAsset(`/assets/asteroids/${assetName}`, assetName);
            }

            ctx.restore();
        });
    }

    // Draw world width/height
    ctx.strokeStyle = "#C8C8C8";
    ctx.lineWidth = 5 / scale;
    ctx.strokeRect(-state.world.width, -state.world.height, state.world.width * 2, state.world.height * 2);

    const drawObjects = [];

    if (drawOptions.deathClones) {
        state.world.deathClones.forEach((clone, index) => {
            drawObjects.push({
                type: 1,
                key: index,
                object: clone
            });
        });
    }

    if (drawOptions.ships) {
        ships.forEach((ship, index) => {
            drawObjects.push({
                type: 0,
                key: index,
                object: ship
            });
        });
    }

    drawObjects.sort((a, b) => b.object.size - a.object.size);
    drawObjects.forEach(({ type, key, object }) => {
        switch (type) {
            case 1: {
                const clone = object;
                const index = key;
                ctx.save();

                ctx.translate(clone.x, clone.y);
                ctx.rotate(clone.angle);
                ctx.drawImage(clone.image, -clone.size / 2, -clone.size / 2, clone.size, clone.size);

                clone.x += Math.cos(clone.angle) * .5;
                clone.y += Math.sin(clone.angle) * .5;
                clone.angle += clone.angleSpeed;
                clone.size *= .99995;
                clone.timer--;

                if ((clone.timer | 0) % 125 === 0 && Math.random() > .75) {
                    explosions.add({
                        x: clone.x + Math.random() * clone.size - clone.size / 2,
                        y: clone.y + Math.random() * clone.size - clone.size / 2,
                        size: clone.size * (Math.random() * .5 + .25),
                        angle: Math.random() * Math.PI * 2,
                        sprite: new Sprite("explosion" + (1 + Math.random() * 10 | 0), false)
                    });
                }

                if (clone.timer <= 0) {
                    state.world.deathClones.splice(index, 1);
                }

                ctx.restore();
            } break;
            case 0: {
                const ship = object;
                ship.x = lerp(ship.x, ship.realX, .2);
                ship.y = lerp(ship.y, ship.realY, .2);
                ship.angle = lerpAngle(ship.angle, ship.realAngle, .2);
                ship.health = lerp(ship.health, ship.realHealth, .2);
                ship.shield = lerp(ship.shield, ship.realShield, .2);

                if (
                    (ship.isPartOfSquadron && ship.size * scale < 5) ||
                    ship.size * scale < 2.5 ||
                    !assetsLib.assets.has(ship.asset)
                ) {
                    return;
                }

                const asset = assetsLib.assets.get(ship.asset);

                ctx.save();
                ctx.translate(ship.x, ship.y);
                ctx.rotate(ship.angle);
                ctx.drawImage(asset, -ship.size / 2, -ship.size / 2, ship.size, ship.size);

                if (ship.shieldAbility) {
                    ctx.drawImage(assetsLib.getShieldFrame(asset, ship.key, ((start / 50 | 0) % 16) | 0), -ship.size / 2, -ship.size / 2, ship.size, ship.size);
                }

                // Draw hardpoints
                if (drawOptions.hardpoints && shipConfig[ship.key].classification >= shipTypes.Corvette) {
                    const mouseOverShip = Math.abs(realMouseX - ship.x) < ship.size / 2 && Math.abs(realMouseY - ship.y) < ship.size / 2;

                    if (mouseOverShip) {
                        state.inputs.shipOver = ship;

                        if (shipConfig[ship.key].tenderAbility && !state.world.snapshotMode) {
                            ctx.beginPath();
                            ctx.arc(0, 0, ship.size * 5.5, 0, Math.PI * 2);
                            ctx.closePath();
                            ctx.strokeStyle = "#AAEEAA";
                            ctx.lineWidth = 8;
                            ctx.stroke();
                        }
                    }

                    if (ship.size >= 500) {
                        ship.hardpoints.forEach((hardpoint, index) => {
                            if (hardpoint.health <= 0) {
                                if (ship.hardpointSprites[index] === undefined) {
                                    ship.hardpointSprites[index] = [{
                                        x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                        y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                        sprite: new Sprite("fireSprite", false),
                                        hasDoneHalfway: false,
                                        spawnsOnDeath: true,
                                        size: .9 + Math.random()
                                    }];
                                }

                                for (let i = 0; i < ship.hardpointSprites[index].length; i++) {
                                    const sprite = ship.hardpointSprites[index][i];

                                    if (sprite.sprite.currentFrame >= sprite.sprite.frames.length - 1) {
                                        ship.hardpointSprites[index].splice(i, 1);
                                        i--;

                                        if (sprite.spawnsOnDeath) {
                                            ship.hardpointSprites[index].push({
                                                x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                                y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                                sprite: new Sprite("fireSprite", false),
                                                hasDoneQ2: false,
                                                hasDoneQ3: false,
                                                spawnsOnDeath: true,
                                                size: .9 + Math.random()
                                            });

                                            if (Math.random() > .8) {
                                                setTimeout(() => {
                                                    explosions.add({
                                                        x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                                        y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                                        size: 1,
                                                        angle: Math.random() * Math.PI * 2,
                                                        sprite: new Sprite("blueExplosion" + (1 + Math.random() * 5 | 0), false)
                                                    });
                                                }, 500);
                                            }
                                        }
                                        continue;
                                    }

                                    if (sprite.sprite.currentFrame >= sprite.sprite.frames.length / 3 && !sprite.hasDoneQ2) {
                                        sprite.hasDoneQ2 = true;
                                        ship.hardpointSprites[index].push({
                                            x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                            y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                            sprite: new Sprite("explosion" + (7 + Math.random() * 4 | 0), false),
                                            hasDoneQ2: true,
                                            hasDoneQ3: true,
                                            spawnsOnDeath: false,
                                            size: .9 + Math.random()
                                        });
                                    }

                                    if (sprite.sprite.currentFrame >= sprite.sprite.frames.length * 2 / 3 && !sprite.hasDoneQ3) {
                                        sprite.hasDoneQ3 = true;
                                        ship.hardpointSprites[index].push({
                                            x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                            y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                            sprite: new Sprite("fireSprite", false),
                                            hasDoneQ2: true,
                                            hasDoneQ3: true,
                                            spawnsOnDeath: false,
                                            size: .9 + Math.random()
                                        });
                                    }

                                    ctx.save();

                                    ctx.rotate(-ship.angle);
                                    ctx.translate(-ship.x, -ship.y);
                                    ctx.translate(sprite.x, sprite.y);
                                    ctx.scale(15 * sprite.size, 15 * sprite.size);

                                    sprite.sprite.draw(ctx, -1, -1, 2, 2);

                                    ctx.restore();
                                }
                                return;
                            }

                            if (!state.world.snapshotMode) {
                                // Green - Yellow - Red based on hp
                                ctx.fillStyle = hardpoint.health > .667 ? "#00FF00" : hardpoint.health > .333 ? "#FFFF00" : "#FF0000";

                                if (mouseOverShip && Math.abs(realMouseX - (ship.x + ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle))) < 8 && Math.abs(realMouseY - (ship.y + ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle))) < 24) {
                                    ctx.strokeStyle = ctx.fillStyle;
                                    ctx.lineWidth = 4;

                                    ctx.beginPath();
                                    ctx.arc(ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction), ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction), 18, 0, Math.PI * 2);
                                    ctx.stroke();

                                    state.inputs.hardpointOver = {
                                        health: hardpoint.health,
                                        data: shipConfig[ship.key].hardpoints[index]
                                    };
                                }

                                ctx.beginPath();
                                ctx.arc(ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction), ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction), 4, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        });
                    }
                }

                if ((!ship.isPartOfSquadron || ship.size * scale >= 20) && !state.world.snapshotMode) {
                    ctx.rotate(-ship.angle);
                    const barWidth = Math.max(50, ship.size);

                    drawBar(0, -barWidth / 2 - 20, barWidth, 10, ship.health, "#00FFC8");

                    if (ship.shield !== -1) {
                        drawBar(0, -barWidth / 2 - 40, barWidth, 10, ship.shield, "#00C8FF");
                    }

                    if (ship.commanderName) {
                        ctx.save();
                        ctx.translate(-barWidth / 2 - 50, -barWidth / 2 - (ship.shield !== -1 ? 30 : 20));
                        ctx.scale(80, 80);
                        drawCommander({
                            name: ship.commanderName,
                            health: false
                        });
                        ctx.restore();
                    }
                }

                ctx.restore();
            } break;
        }
    });

    // Draw projectiles
    if (drawOptions.projectiles) {
        ctx.save();

        state.world.superlaserObjects.forEach(superlaser => {
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 25 + Math.sin(start / 300 + superlaser.id * 3 + 3) * 5;

            ctx.shadowColor = superlaser.color;
            ctx.shadowBlur = 50 + Math.sin(start / 150 + superlaser.id) * 25;

            ctx.beginPath();
            ctx.moveTo(superlaser.x1, superlaser.y1);
            ctx.lineTo(superlaser.x2, superlaser.y2);
            ctx.stroke();
            ctx.closePath();
        });

        ctx.restore();

        projectiles.forEach(projectile => {
            projectile.x = lerp(projectile.x, projectile.realX, .2);
            projectile.y = lerp(projectile.y, projectile.realY, .2);

            const props = weaponDrawProperties[projectile.type];

            if (projectile.size * props.strength * 6 * scale < 2) {
                return;
            }

            ctx.save();
            ctx.translate(projectile.x, projectile.y);
            ctx.rotate(projectile.angle - Math.PI / 2);
            ctx.scale(6 * props.strength, 6 * props.strength);

            if (props.key === "SubjugatorIonBlast") {
                const q = start;
                ctx.save();

                ctx.shadowBlur = 10;
                ctx.shadowColor = "#FFFFFF";

                ctx.globalAlpha = .3;

                // Define the hue range for purple-pink-white
                const minHue = 270;
                const maxHue = 330;

                // Calculate the hue value within the range
                const hue = (q / 10 % (maxHue - minHue)) + minHue;
                ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

                ctx.scale(projectile.size, projectile.size);

                ctx.beginPath();

                for (let i = 0; i < 24; i++) {
                    const angle = Math.PI * 2 / 24 * i + q / 1000 + start / 2300;
                    const dist = Math.sin(angle * 4 + q / 1230 + i) * .5 + .5 * Math.sin((q + Math.tan(i)) / 1000);

                    ctx.lineTo(Math.cos(angle) * dist, Math.sin(angle) * dist * 1.15);
                }

                ctx.closePath();
                ctx.fill();

                ctx.beginPath();
                ctx.arc(0, 0, .2 + (Math.sin(q) * .25 + .25), 0, Math.PI * 2);
                ctx.fillStyle = "#FFFFFF";
                ctx.fill();

                ctx.restore();
            } else {
                ctx.drawImage(props.sprite, -projectile.size, -projectile.size, projectile.size * 2, projectile.size * 2);
            }

            ctx.restore();
        });
    }

    // Draw squadrons
    if (drawOptions.squadrons) {
        squadrons.forEach(squadron => {
            squadron.x = lerp(squadron.x, squadron.realX, .2);
            squadron.y = lerp(squadron.y, squadron.realY, .2);
            squadron.health = lerp(squadron.health, squadron.realHealth, .2);

            if (scale > .6 || state.world.snapshotMode) {
                return;
            }

            ctx.save();
            ctx.translate(squadron.x, squadron.y);

            // ctx.fillStyle = squadron.team === 0 ? "#FF0000" : "#0000FF";
            ctx.fillStyle = teamColors[squadron.team];
            ctx.strokeStyle = mixColors(ctx.fillStyle, "#000000", .5);
            ctx.beginPath();
            ctx.roundRect(-40, -40, 80, 80, 17.5);

            ctx.globalAlpha = .125;
            ctx.fill();

            ctx.globalAlpha = 1;
            ctx.lineWidth = 5;
            ctx.stroke();

            ctx.globalAlpha = .5;
            ctx.drawImage(assetsLib.assets.get(squadron.asset), -30, -30, 60, 60);

            ctx.globalAlpha = 1;
            drawBar(0, 55, 80, 10, squadron.health, "#00FFC8");

            ctx.restore();

            const mouseOverSquadron = Math.abs(realMouseX - squadron.x) < 30 && Math.abs(realMouseY - squadron.y) < 30;

            if (mouseOverSquadron) {
                state.inputs.shipOver = squadron;
            }
        });
    }

    // Draw explosions
    if (drawOptions.explosions) {
        explosions.forEach(explosion => {
            if (explosion.sprite.currentFrame >= explosion.sprite.frames.length - 1) {
                explosions.delete(explosion);
                return;
            }

            ctx.save();
            ctx.translate(explosion.x, explosion.y);
            ctx.rotate(explosion.angle);
            explosion.sprite.draw(ctx, -explosion.size, -explosion.size, explosion.size * 2, explosion.size * 2);
            ctx.restore();
        });
    }

    ctx.restore();

    if (!state.world.snapshotMode && state.world.reinforcementDrag.enabled) {
        // Draw the ship asset at the mouse position, rotated as well

        ctx.save();
        ctx.translate(state.world.reinforcementDrag.x, state.world.reinforcementDrag.y);
        ctx.rotate(state.world.reinforcementDrag.rotation);

        const reinforcement = state.world.availableReinforcements[state.world.reinforcementDrag.key];

        const size = shipConfig[reinforcement.ship].size * scale;

        ctx.drawImage(assetsLib.assets.get(shipConfig[reinforcement.ship].asset), -size / 2, -size / 2, size, size);

        ctx.restore();
    }


    // UI
    state.clearClickables();

    const uScale = uiScale();

    ctx.save();
    ctx.scale(uScale, uScale);

    if (!state.world.snapshotMode) { // Minimap
        ctx.save();
        ctx.globalAlpha = .5;
        ctx.translate(10, canvas.height / uScale - 10 - 230);
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, 230, 230);

        ctx.globalAlpha = 1;

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;

        // Clip
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, 230, 230);
        ctx.clip();
        ctx.closePath();

        state.world.minimapData.forEach(data => {
            // The center of the map is (0, 0)
            // Top left corner is (-w, -h)
            // Bottom right corner is (w, h)

            const x = data.x * 115 + 115;
            const y = data.y * 115 + 115;
            const size = data.size * 115;

            // ctx.fillStyle = data.team === 0 ? "#FF0000" : "#0000FF";
            ctx.fillStyle = teamColors[data.team];

            if (data.type === 0) {
                if (!assetsLib.assets.has(data.asset)) {
                    assetsLib.loadAsset(`/assets/ships/${data.asset}`, data.asset);
                    return;
                }

                if (!assetsLib.assets.get(data.asset).ready) {
                    return;
                }

                const silhouetteKey = `${data.asset}${data.team}`;
                if (!assetsLib.silhouettes.has(silhouetteKey)) {
                    assetsLib.silhouettes.set(silhouetteKey, false);
                    assetsLib.generateSilhouette(assetsLib.assets.get(data.asset), silhouetteKey, ...teamColorRGBs[data.team]);
                }

                const silhouette = assetsLib.silhouettes.get(silhouetteKey);

                if (silhouette === false) {
                    return;
                }

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(data.angle);
                ctx.drawImage(silhouette, -size / 2, -size / 2, size, size);
                ctx.restore();
            }

            if (data.type === 1) {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        });

        // Draw a viewbox
        ctx.save();
        ctx.translate(115, 115);
        ctx.scale(1 / state.camera.zoom * 115, 1 / state.camera.zoom * 115);
        ctx.translate(-state.camera.x, -state.camera.y);

        ctx.fillStyle = "#000000";
        ctx.globalAlpha = .25;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = .1 * state.camera.zoom;

        const width = Math.sqrt(canvas.width) / state.camera.zoom;
        const height = Math.sqrt(canvas.height) / state.camera.zoom;

        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.strokeRect(-width / 2, -height / 2, width, height);

        ctx.restore();
        ctx.restore();

        ctx.strokeStyle = "#AAAAAA";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 230, 230);

        ctx.restore();

        // Draw planet name above the minimap
        drawText(planetName, 15, canvas.height / uScale - 10 - 230 - 20, 28, "#C8C8C8", "left");
    }

    if (state.inputs.hardpointOver !== null) { // Hardpoint tooltip
        const str = state.inputs.hardpointOver.data.weapon.name + " - " + Math.round(state.inputs.hardpointOver.data.weapon.damage) + "dmg";
        const measurement = measureText(str, 18);
        const width = measurement.width + 15;

        ctx.fillStyle = "#AAAAAA";
        ctx.fillRect(state.inputs.mouseX / uScale + 10, state.inputs.mouseY / uScale - 10, width, 50);
        ctx.fillStyle = state.inputs.hardpointOver.health > .667 ? "#00FF00" : state.inputs.hardpointOver.health > .333 ? "#FFFF00" : "#FF0000";
        ctx.fillRect(state.inputs.mouseX / uScale + 15, state.inputs.mouseY / uScale - 5, (width - 10) * state.inputs.hardpointOver.health, 15);
        drawText(str, state.inputs.mouseX / uScale + 15, state.inputs.mouseY / uScale + 25, 18);
    }

    if (!state.world.snapshotMode && state.inputs.shipOver !== null && shipConfig[state.inputs.shipOver.key]) { // Ship tooltip
        ctx.save();
        const cfg = shipConfig[state.inputs.shipOver.key];
        const str = cfg.name + " - " + shipTypeNames[cfg.classification];
        const titleMeasure = measureText(str, 28);
        let bigWidth = titleMeasure.width,
            bigHeight = titleMeasure.height;

        const weapons = {};
        let maxHp = 0;

        cfg.hardpoints.forEach(hardpoint => {
            const text = hardpoint.weapon.name + " - " + (hardpoint.weapon.range / 1000).toFixed(1) + "km";
            if (weapons[text] === undefined) {
                weapons[text] = 0;
            }

            weapons[text]++;

            maxHp += hardpoint.weapon.health;
        });

        const hangars = {};

        if (cfg.hangars) {
            cfg.hangars.forEach(hangar => {
                const text = shipConfig[hangar.squadronKey].name + " x" + hangar.squadronSize;
                const obj = hangars[text] ?? {
                    maxSquadrons: 0,
                    reserveSize: 0
                };

                obj.maxSquadrons += hangar.maxSquadrons;
                obj.reserveSize += hangar.reserveSize;

                hangars[text] = obj;
            });

            bigHeight += 20;
        }

        let listHeight = 0;

        Object.keys(weapons).forEach(name => {
            const measurement = measureText(name, 18);
            const measurement2 = measureText("x" + weapons[name], 20);

            bigWidth = Math.max(bigWidth, measurement.width + measurement2.width + 5);
            bigHeight = Math.max(bigHeight, measurement.height, measurement2.height);
            listHeight = measurement.height;
        });

        Object.keys(hangars).forEach(name => {
            const measurement = measureText(name, 18);
            const measurement2 = measureText(" " + hangars[name].maxSquadrons + "/" + hangars[name].reserveSize, 16);

            bigWidth = Math.max(bigWidth, measurement.width + measurement2.width + 5);
            bigHeight = Math.max(bigHeight, measurement.height, measurement2.height);
            listHeight = measurement.height;
        });

        bigHeight += 50;

        if (cfg.tenderAbility) {
            bigHeight += 35;
        }

        if (state.inputs.shipOver.commanderName) {
            const m1 = measureText(heroes[state.inputs.shipOver.commanderName].name, 20);
            const m2 = measureText(heroes[state.inputs.shipOver.commanderName].tooltip, 16);

            bigWidth = Math.max(bigWidth, m1.width + 5);
            bigHeight += m1.height + 5;
            bigHeight += (m2.height + 10) * m2.width / (bigWidth - 10);
            bigHeight += 10;
        }

        ctx.fillStyle = "#AAAAAA";
        ctx.translate(canvas.width / uScale - bigWidth - 30, 0);
        ctx.fillRect(10, 10, bigWidth + 20, bigHeight + 30 + (listHeight + 5) * (Object.keys(weapons).length + Object.keys(hangars).length));

        drawText(str, 20, 35, 28);

        let y = titleMeasure.height + 40;

        // Health and shield values
        drawText("Health: " + maxHp, 20, y, 20);
        y += 25;
        drawText("Shield: " + cfg.shield + "/" + cfg.shieldRegen + "r", 20, y, 20);
        y += 25;

        for (const name in weapons) {
            drawText(name, 20, y, 18);
            drawText("x" + weapons[name], 20 + measureText(name, 18).width + 5, y, 20, "#C8C8C8");
            y += listHeight + 5;
        }

        if (cfg.hangars) {
            y -= 2.5;
            ctx.beginPath();
            ctx.moveTo(10, y);
            ctx.lineTo(bigWidth + 30, y);
            ctx.closePath();
            ctx.strokeStyle = "#AAAAAA";
            ctx.lineWidth = listHeight / 2;
            ctx.stroke();
            y += 20;
        }

        for (const name in hangars) {
            drawText(name, 20, y, 18);
            drawText(" " + hangars[name].maxSquadrons + "/" + hangars[name].reserveSize, 20 + measureText(name, 18).width + 5, y, 16, "#C8C8C8");
            y += listHeight + 5;
        }

        if (state.inputs.shipOver.commanderName) {
            y -= 2.5;
            ctx.beginPath();
            ctx.moveTo(10, y);
            ctx.lineTo(bigWidth + 30, y);
            ctx.closePath();
            ctx.strokeStyle = "#AAAAAA";
            ctx.lineWidth = listHeight / 2;
            ctx.stroke();
            y += 20;

            drawText(heroes[state.inputs.shipOver.commanderName].name, 20, y, 20);
            y += 20;
            y += drawWrappedText(heroes[state.inputs.shipOver.commanderName].tooltip, 20, y, 16, bigWidth - 10);
        }

        if (cfg.tenderAbility) {
            drawText("Tender Frequency: " + (cfg.tenderAbility.frequency * TENDER_FREQUENCY_SECONDS).toFixed(2) + "s", 20, y, 18);
            y += listHeight + 5;
            drawText("Tender Pulse Amount: " + (cfg.tenderAbility.power * TENDER_HEAL_PULSE_AMOUNT).toFixed(2) + "hp", 20, y, 18);
        }

        ctx.restore();
    }

    let y = 10;
    state.world.text.forEach((textMessage, i) => {
        const measurement = measureText(textMessage.displayText, 16);

        drawText(textMessage.displayText, 10, y, 16);

        textMessage.i = Math.min(textMessage.i + 1, textMessage.text.length);

        textMessage.displayText = textMessage.text.slice(0, textMessage.i);

        if (textMessage.displayText.length === textMessage.text.length) {
            textMessage.timer--;
        }

        if (textMessage.timer <= 0) {
            state.world.text.splice(i, 1);
        }

        y += measurement.height + 5;
    });

    if (!state.world.snapshotMode) { // Buttons & buildables/controllables
        ctx.save();

        const width = canvas.width / uScale;
        const yShift = canvas.height / uScale - 175;

        ctx.translate(0, yShift);

        // Box on left side of this trapezoid
        const button = (x, y, txt, cb) => {
            ctx.fillStyle = window.abcd ?? "#252525";
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = "#505050";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();

            drawText(txt, x, y, 30, "#FFFFFF", "center");

            state.clickables.push(state.UIClickable.radial(x, yShift + y, 30, cb));
        };

        let bY = -25;

        if (state.world.buildables != null) {
            button(285, bY, state.world.onBuildMenu ? "🗺️" : "🔧", () => state.world.onBuildMenu = !state.world.onBuildMenu);
            bY += 75;
        }

        button(285, bY, "⚔️", () => state.world.reinforcementsMenuOpen = !state.world.reinforcementsMenuOpen);
        bY += 75;

        button(285, bY, state.world.playBattle ? "⏸" : "►", () => {
            state.toggle();
        });

        ctx.fillStyle = "#252525";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#505050";

        ctx.beginPath();
        ctx.moveTo(400, 0);
        ctx.lineTo(width - 400, 0);
        ctx.lineTo(width - 300, 210);
        ctx.lineTo(300, 210);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        // Draw selected ships
        let i = 0;

        if (state.world.onBuildMenu) {
            drawText("Credits: " + state.world.credits, 400, -15, 15, "#FFFFFF", "left");
            state.world.buildables.forEach(buildableKey => {
                const ship = shipConfig[buildableKey];

                if (!assetsLib.assets.has(ship.asset)) {
                    assetsLib.loadAsset(`/assets/ships/${ship.asset}`, ship.asset);
                    return;
                }

                if (!assetsLib.assets.get(ship.asset).ready) {
                    return;
                }

                ctx.save();
                ctx.translate(467 + 75 * (i % 14), 50 + Math.floor(i / 14) * 75);

                ctx.fillStyle = "#505050";
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();

                ctx.rotate(-Math.PI / 6);
                ctx.drawImage(assetsLib.assets.get(ship.asset), -20, -20, 40, 40);
                ctx.rotate(Math.PI / 6);

                // Cost below
                drawText(ship.cost, 0, 20, 15, "#FFFFFF", "center");

                ctx.restore();
                state.clickables.push(state.UIClickable.radial(467 + 75 * (i % 14), yShift + 50 + Math.floor(i / 14) * 75, 30, () => {
                    // alert("Building " + ship.name + " costs " + ship.cost + " resources. Are you sure?");
                    state.worker.postMessage([1, 3, buildableKey]);
                }));

                i++;
            });
        } else {
            state.controllingShipIDs.forEach(id => {
                const ship = ships.get(id);

                if (!ship) {
                    state.controllingShipIDs.delete(id);
                    return;
                }

                ctx.save();
                ctx.translate(467 + 75 * (i % 14), 50 + Math.floor(i / 14) * 75);
                ctx.scale(30, 30);

                ctx.drawImage(assetsLib.assets.get(ship.asset), -1, -1, 2, 2);

                // health meter
                ctx.save();
                ctx.translate(0, .75);

                if (ship.shield > .01) {
                    drawBar(0, 0, 1, .15, ship.shield, "#00C8FF");
                    ctx.translate(0, .2);
                }

                drawBar(0, 0, 1, .15, ship.health, "#00FFC8");

                ctx.restore();
                ctx.restore();

                i++;
            });
        }

        ctx.restore();
    }

    let reinforcementY = 0;

    if (!state.world.snapshotMode && state.world.reinforcementsMenuOpen) { // Reinforcements menu
        if (state.world.reinforcementDrag.enabled) {
            drawText("Shift-Click to cancel", canvas.width / uScale - 150, canvas.height / uScale - 100, 20, "#FFFFFF", "center");
            drawText("Click to place", canvas.width / uScale - 150, canvas.height / uScale - 80, 20, "#FFFFFF", "center");
            drawText("Shift-Scroll to rotate", canvas.width / uScale - 150, canvas.height / uScale - 60, 20, "#FFFFFF", "center");

            reinforcementY = 175;
        } else {
            // Top right corner menu
            ctx.save();

            const cellSize = 25;
            const cellPadding = 5;
            const rowSize = 4;

            const boxWidth = rowSize * (cellSize + cellPadding) * 2;

            let boxHeight = Math.ceil(state.world.availableReinforcements.length / rowSize) * ((cellSize + cellPadding) * 2);

            reinforcementY = boxHeight + 75;

            ctx.translate(canvas.width / uScale - boxWidth - 10, canvas.height / uScale - 10 - boxHeight);

            drawText(`Reinforcements`, boxWidth / 2, -20, 25, "#C8C8C8", "center");
            drawText(`(Population: ${state.world.activePopulation}/${state.world.maxPopulation})`, boxWidth / 2, -50, 12, "#B5B5B5", "center");

            ctx.fillStyle = "#111111";
            ctx.globalAlpha = .5;
            ctx.fillRect(0, 0, boxWidth, boxHeight);
            ctx.globalAlpha = 1;

            for (let i = 0; i < state.world.availableReinforcements.length; i++) {
                const ship = shipConfig[state.world.availableReinforcements[i].ship];
                const x = 17.5 + (i % 4) * (cellSize + cellPadding) * 2;
                const y = 17.5 + Math.floor(i / 4) * (cellSize + cellPadding) * 2;

                if (!assetsLib.assets.has(ship.asset)) {
                    assetsLib.loadAsset(`/assets/ships/${ship.asset}`, ship.asset);
                    continue;
                }

                if (!assetsLib.assets.get(ship.asset).ready) {
                    continue;
                }

                ctx.save();
                ctx.translate(x, y);
                ctx.scale(cellSize, cellSize);
                ctx.translate(.5, .5);

                if (state.world.availableReinforcements[i].hero) {
                    ctx.scale(2, 2);
                    drawCommander({
                        name: state.world.availableReinforcements[i].hero,
                        health: false
                    });
                } else {
                    ctx.fillStyle = "#505050";
                    ctx.beginPath();
                    ctx.arc(0, 0, 1, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.rotate(-Math.PI / 6);
                    ctx.drawImage(assetsLib.assets.get(ship.asset), -.8, -.8, 1.6, 1.6);
                }

                if (state.world.activePopulation + ship.population > state.world.maxPopulation) {
                    ctx.fillStyle = "rgba(255, 0, 0, .5)";
                    ctx.beginPath();
                    ctx.arc(0, 0, state.world.availableReinforcements[i].hero ? .5 : 1, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    state.clickables.push(state.UIClickable.radial(
                        canvas.width / uScale - boxWidth - 10 + x + cellSize / 2,
                        canvas.height / uScale - 10 - boxHeight + y + cellSize / 2,
                        cellSize,
                        () => {
                            state.world.reinforcementDrag.enabled = true;
                            state.world.reinforcementDrag.key = i;
                        }
                    ));
                }

                ctx.restore();
            }

            ctx.restore();
        }
    }

    drawCommanders(uScale, reinforcementY);

    ctx.restore();

    drawText(`${fps} fps | ${mspt} mspt`, canvas.width / 2 / uScale, 20, 15, "#FFFFFF", "center");

    totalMS += performance.now() - start;
    frames++;
}

setInterval(() => {
    fps = frames;
    mspt = (totalMS / fps).toFixed(2);

    frames = 0;
    totalMS = 0;
}, 1000);

/**
 * @param {{name:string,color:string,fleet:{ship:string,hero:string|null}[]}} attackingFaction
 * @param {{name:string,color:string,fleet:{ship:string,hero:string|null}[]}} defendingFaction
 * @param {boolean} attacking
 * @param {string} designConfig
 * @param {string} currPlanet
 */
export function initializeBattle(attackingFaction, defendingFaction, attacking = false, designConfig = null, currPlanet = "Wild Space") {
    state.worker.postMessage([1, 0, attacking === true ? 1 : 0, JSON.stringify(attackingFaction), JSON.stringify(defendingFaction)]);

    teamColors.length = 0;
    teamColorRGBs.length = 0;
    teamColors.push(attackingFaction.color, defendingFaction.color);
    teamColorRGBs.push(hextoRGB(attackingFaction.color), hextoRGB(defendingFaction.color));
    planetName = currPlanet;

    if (designConfig != null && "design" in designConfig && typeof designConfig.design === "string") {
        regeneratePlanet(designConfig.design);
        planet.generate();
    }

    setTimeout(() => state.world.acceptDeathClones = true, 5000);
}

/**
 * @param {FactionConfig} myFaction
 */
export function initializeSurvival(myFaction) {
    state.worker.postMessage([1, 2, myFaction.reverseLookupKey]);

    teamColors.length = 0;
    teamColorRGBs.length = 0;

    teamColors.push(myFaction.color, "#FFFFFF");
    teamColorRGBs.push(hextoRGB(myFaction.color), hextoRGB("#FFFFFF"));
    planetName = "Wild Space";

    setTimeout(() => state.world.acceptDeathClones = true, 5000);
}