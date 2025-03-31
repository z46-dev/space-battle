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

const mixColors = (function () {
    const cache = {};
    return function (primary, secondary, x) {
        const target = `${primary}${secondary}${x}`;
        if (cache[target] !== undefined) return cache[target];
        var [primary, a, o] = primary.match(/\w\w/g).map(e => parseInt(e, 16)), [secondary, n, r] = secondary.match(/\w\w/g).map(e => parseInt(e, 16));
        return cache[target] = `#${Math.round(primary + (secondary - primary) * x).toString(16).padStart(2, "0")}${Math.round(a + (n - a) * x).toString(16).padStart(2, "0")}${Math.round(o + (r - o) * x).toString(16).padStart(2, "0")}`;
    }
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

let closeByStars = [];

setInterval(() => {
    const scale = uiScale() * state.camera.zoom;
    const AABB = state.world.starGrid.getAABB({
        x: state.camera.x,
        y: state.camera.y,
        size: canvas.width / scale,
        width: 1,
        height: 1
    });

    closeByStars = state.world.starGrid.retrieve({
        _AABB: AABB,
        id: state.world.starCounter
    });
}, 1000);

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
            y += measurement.height * 1.1;
            height += measurement.height * 1.1;
        } else {
            line = testLine;
        }
    }

    ctx.fillText(line, x, y);
    height += measureText(line, size).height * 1.1;

    ctx.restore();

    return height;
}

function measureText(text, size) {
    ctx.save();
    ctx.font = `bold ${size}px sans-serif`;

    const width = ctx.measureText(text).width;
    const height = ctx.measureText("M").width;

    ctx.restore();

    return {
        width: width,
        height: height
    };
}

function drawCommander(commander) {
    const hero = heroes[commander.name];

    const img = assetsLib.assets.get(hero.image);

    if (!img || !img.ready) {
        loadAsset(`./assets/portraits/${hero.image}`, hero.image);
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

function drawCommanders(uScale) {
    const size = 75;
    const x = canvas.width / uScale - size - 10;
    let y = canvas.height / uScale - size - 20;
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

export default function draw() {
    state.camera.x = lerp(state.camera.x, state.camera.realX, .2);
    state.camera.y = lerp(state.camera.y, state.camera.realY, .2);
    state.camera.zoom = lerp(state.camera.zoom, state.camera.realZoom, .2);

    state.worker.postMessage(state.inputs.rmb ? [0, -state.inputs.mouseDirectionX / state.camera.zoom, -state.inputs.mouseDirectionY / state.camera.zoom, state.camera.cZoom] : [0, 0, 0, state.camera.cZoom]);

    const scale = uiScale() * state.camera.zoom;

    state.inputs.hardpointOver = null;
    state.inputs.shipOver = null;

    ctx.fillStyle = "#893135";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-state.camera.x, -state.camera.y);

    const realMouseX = (state.inputs.mouseX - canvas.width / 2) / scale + state.camera.x;
    const realMouseY = (state.inputs.mouseY - canvas.height / 2) / scale + state.camera.y;

    // Draw world width/height
    ctx.fillStyle = "#1B1B25";
    ctx.fillRect(-state.world.width, -state.world.height, state.world.width * 2, state.world.height * 2);

    ctx.fillStyle = "#DEDEDE";
    ctx.shadowColor = "#FFFFFF";
    closeByStars.forEach(star => {
        const XYHash = (star.x + star.y) * (.5 + Math.sin(performance.now() / 1000) * .5);
        const size = 15 + (.5 + Math.sin(XYHash / (star.x + star.y))) * 10;

        if (size * scale > 3) {
            ctx.shadowBlur = size * 3;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
    });

    const planetSize = planetOptions.Radius * 32;
    ctx.shadowBlur = planetOptions.Radius * 2;
    ctx.shadowColor = planetOptions.Colors[3][2];
    ctx.drawImage(planet.canvas, -planetSize / 1.125, -planetSize / 1.125, planetSize, planetSize);

    ctx.shadowBlur = 0;

    const drawObjects = [];

    state.world.deathClones.forEach((clone, index) => {
        drawObjects.push({
            type: 1,
            key: index,
            object: clone
        });
    });

    ships.forEach((ship, index) => {
        drawObjects.push({
            type: 0,
            key: index,
            object: ship
        });
    });

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
                    ctx.drawImage(assetsLib.getShieldFrame(asset, ship.key, ((performance.now() / 50 | 0) % 16) | 0), -ship.size / 2, -ship.size / 2, ship.size, ship.size);
                }

                // Draw hardpoints
                if (shipConfig[ship.key].classification >= shipTypes.Corvette) {
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

                    if (ship.size >= 150) {
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

                                            if (Math.random() > .5) {
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
            const q = performance.now();
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
                const angle = Math.PI * 2 / 24 * i + q / 1000 + performance.now() / 2300;
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

    // Draw squadrons
    squadrons.forEach(squadron => {
        squadron.x = lerp(squadron.x, squadron.realX, .2);
        squadron.y = lerp(squadron.y, squadron.realY, .2);
        squadron.health = lerp(squadron.health, squadron.realHealth, .2);

        if (scale > .6) {
            return;
        }

        ctx.save();
        ctx.translate(squadron.x, squadron.y);

        ctx.fillStyle = squadron.team === 0 ? "#FF0000" : "#0000FF";
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

    // Draw explosions
    explosions.forEach(explosion => {

        if (explosion.sprite.currentFrame >= explosion.sprite.frames.length - 1) {
            explosions.delete(explosion);
            return;
        }

        ctx.save();

        ctx.translate(explosion.x, explosion.y);
        ctx.scale(explosion.size, explosion.size);
        ctx.rotate(explosion.angle);

        explosion.sprite.draw(ctx, -1, -1, 2, 2);

        ctx.restore();
    });

    ctx.restore();

    // UI
    const uScale = uiScale();

    ctx.save();
    ctx.scale(uScale, uScale);

    ctx.globalAlpha = .5;

    // Minimap
    ctx.save();
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

        ctx.fillStyle = data.team === 0 ? "#FF0000" : "#0000FF";

        if (data.type === 0) {
            if (!assetsLib.assets.has(data.asset)) {
                assetsLib.loadAsset(`./assets/ships/${data.asset}`, data.asset);
                return;
            }

            if (!assetsLib.assets.get(data.asset).ready) {
                return;
            }

            const silhouetteKey = `${data.asset}${data.team}`;
            if (!assetsLib.silhouettes.has(silhouetteKey)) {
                assetsLib.silhouettes.set(silhouetteKey, false);
                assetsLib.generateSilhouette(assetsLib.assets.get(data.asset), silhouetteKey, data.team === 0 ? 255 : 0, data.team === 2 ? 255 : 0, data.team === 1 ? 255 : 0);
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

    if (state.inputs.hardpointOver !== null) {
        const str = state.inputs.hardpointOver.data.weapon.name + " - " + Math.round(state.inputs.hardpointOver.data.weapon.damage) + "dmg";
        const measurement = measureText(str, 18);
        const width = measurement.width + 15;

        ctx.fillStyle = "#AAAAAA";
        ctx.fillRect(state.inputs.mouseX / uScale + 10, state.inputs.mouseY / uScale - 10, width, 50);
        ctx.fillStyle = state.inputs.hardpointOver.health > .667 ? "#00FF00" : state.inputs.hardpointOver.health > .333 ? "#FFFF00" : "#FF0000";
        ctx.fillRect(state.inputs.mouseX / uScale + 15, state.inputs.mouseY / uScale - 5, (width - 10) * state.inputs.hardpointOver.health, 15);
        drawText(str, state.inputs.mouseX / uScale + 15, state.inputs.mouseY / uScale + 25, 18);
    }

    if (state.inputs.shipOver !== null && shipConfig[state.inputs.shipOver.key]) {
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
            bigHeight += (m2.height + 5) * m2.width / (bigWidth - 10);
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

    drawCommanders(uScale);

    if (!state.world.snapshotMode) {
        ctx.save();

        const width = canvas.width / uScale;

        ctx.translate(0, canvas.height / uScale - 175);

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

        ctx.restore();
    }

    ctx.restore();
}

export function initializeBattle(myShips, enemyShips, attacking, designConfig) {
    state.worker.postMessage([1, 0, JSON.stringify(myShips), JSON.stringify(enemyShips), attacking]);

    if (designConfig != null && "design" in designConfig && typeof designConfig.design === "string") {
        console.log("Regenerating planet with design: " + designConfig.design);
        regeneratePlanet(designConfig.design);

        planet.generate();
    }
}

if (!location.href.includes("complete")) {
    draw();

    initializeBattle(["CR90_REBEL"], ["QUASAR_EMPIRE"], 0);
}