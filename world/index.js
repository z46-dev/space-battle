const config = (await import("./planets.json", {
    assert: {
        type: "json"
    }
})).default;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;

    canvas.lineJoin = canvas.lineCap = "round";
}

window.addEventListener("resize", resize);
resize();

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
}

function drawText(text, x, y, size, fill, stroke = Color.mix(fill, "#000000", .5), align = "center") {
    ctx.font = `bold ${size}px sans-serif`;
    ctx.textAlign = align;

    ctx.strokeStyle = stroke;
    ctx.lineWidth = size * .15;
    ctx.strokeText(text, x, y);

    ctx.fillStyle = fill;
    ctx.fillText(text, x, y);
}

const worker = new Worker("./world.js", {
    type: "module"
});

worker.onmessage = function onWorkerMessage(event) {
    const data = event.data;
    const factionCount = data.shift();
    const planetCount = data.shift();

    const factions = [];
    const planets = [];

    for (let i = 0; i < factionCount; i++) {
        const faction = {
            id: data.shift(),
            money: data.shift(),
            income: data.shift(),
            controlledPlanets: []
        };

        const planetsSize = data.shift();

        for (let j = 0; j < planetsSize; j++) {
            faction.controlledPlanets.push(data.shift());
        }

        factions.push(faction);
    }

    for (let i = 0; i < planetCount; i++) {
        const planet = {
            id: data.shift(),
            income: data.shift(),
            hasShipyard: data.shift() == 1
        };

        if (planet.hasShipyard) {
            planet.shipyard = {
                level: data.shift(),
                queue: []
            };

            const queueSize = data.shift();

            for (let j = 0; j < queueSize; j++) {
                planet.shipyard.queue.push({
                    name: data.shift(),
                    day: data.shift()
                });
            }
        }

        planets.push(planet);
    }

    planets.forEach(newPlanet => {
        const planet = Planet.planets.get(newPlanet.id) ?? new Planet(newPlanet.id);
        planet.income = newPlanet.income;

        if (newPlanet.hasShipyard) {
            if (planet.shipyard == null) {
                planet.shipyard = new Shipyard(planet, newPlanet.shipyard.level);
            }

            planet.shipyard.queue = newPlanet.shipyard.queue;
        }
    });

    factions.forEach(newFaction => {
        const faction = Faction.factions.get(newFaction.id) ?? new Faction(newFaction.id);
        faction.money = newFaction.money;
        faction.income = newFaction.income;

        faction.controlledPlanets.clear();

        newFaction.controlledPlanets.forEach(planetID => {
            const planet = Planet.get(planetID);

            planet.controllingFaction = faction;
            faction.controlledPlanets.set(planetID, planet);
        });
    });

    window.factions = factions;
    window.planets = planets;
}

class Shipyard {
    constructor(planet, level) {
        this.planet = planet;
        this.level = level;
        this.queue = [];
        this.buildables = new Map();

        const roster = config.factions[planet.controllingFaction.id].shipyardRosters[level];

        for (const ship of roster) {
            this.buildables.set(ship, 50);
        }
    }
}

class Planet {
    /**
     * @type {Map<number,Planet>}
     */
    static planets = new Map();

    static get(name) {
        let planet = null;

        Planet.planets.forEach(p => {
            if (p.name === name) {
                planet = p;
            }
        });

        return planet;
    }

    constructor(id) {
        this.id = id;
        this.name = config.planets[id].name;
        this.color = config.planets[id].color;
        this.income = 0;

        this._x = config.planets[id].x;
        this._y = config.planets[id].y;

        /**
         * @type {Shipyard}
         */
        this.shipyard = null;

        this.connectingPlanets = [];

        config.connections.forEach(connection => {
            if (connection[0] === this.name) {
                this.connectingPlanets.push(connection[1]);
            }

            if (connection[1] === this.name) {
                this.connectingPlanets.push(connection[0]);
            }
        });

        /**
         * @type {Faction}
         */
        this.controllingFaction = null;

        /**
         * @type {Fleet[]}
         */
        this.fleets = [];

        Planet.planets.set(this.id, this);
    }

    get x() {
        return this._x * 2;
    }

    get y() {
        return this._y * 2;
    }

    render() {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.controllingFaction?.color ?? "#000000";
        ctx.lineWidth = 15;

        ctx.translate(this.x, this.y);

        ctx.beginPath();

        ctx.arc(0, 0, 135, 0, Math.PI * 2);

        for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 3 * i + (performance.now() / 2000);

            ctx.moveTo(Math.cos(angle) * 135, Math.sin(angle) * 135);
            ctx.lineTo(Math.cos(angle) * 100, Math.sin(angle) * 100);
        }

        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();

        ctx.arc(0, 0, 90, 0, Math.PI * 2);

        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    text() {
        ctx.save();
        ctx.translate(this.x, this.y);

        const myFill = this.color;
        const myStroke = Color.mix(myFill, "#000000", .5);
        const whiteFill = "#FFFFFF";
        const whiteStroke = Color.mix(whiteFill, "#000000", .5);

        drawText(this.name.toUpperCase(), 100, 90 * .75, 90 * .55, this.color, Color.mix(this.color, "#000000", .5), "left");
        drawText((this.income < 0 ? "" : "+") + this.income + " | Shipyard Lvl: " + this.shipyard?.level, 100, 110, 90 * .4, "#FFFFFF", Color.mix("#FFFFFF", "#000000", .5), "left");

        ctx.restore();
    }

    connectTo(other) {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(other.x, other.y);
        ctx.closePath();
        ctx.stroke();
    }
}

class Faction {
    /**
     * @type {Map<number,Faction>}
     */
    static factions = new Map();

    constructor(id) {
        this.id = id;
        this.name = config.factions[id].name;
        this.color = config.factions[id].color;
        this.money = 0;
        this.income = 0;

        /**
         * @type {Map<number,Planet>}
         */
        this.controlledPlanets = new Map();

        Faction.factions.set(this.id, this);
    }
}

const camera = {
    realX: 0,
    realY: 0,
    realZoom: 1,
    //
    x: 0,
    y: 0,
    zoom: 3
};

function lerp(A, B, w) {
    return (1 - w) * A + w * B;
}

function lerpAngle(A, B, w) {
    let CS = (1 - w) * Math.cos(A) + w * Math.cos(B);
    let SN = (1 - w) * Math.sin(A) + w * Math.sin(B);
    return Math.atan2(SN, CS);
}

// CAMERA CONTROLS
window.addEventListener("wheel", event => {
    camera.realZoom += event.deltaY / 1000;
    camera.realZoom = Math.max(camera.realZoom, .05);
    camera.realZoom = Math.min(camera.realZoom, 2.75);
});

let mouseX = 0,
    mouseY = 0,
    mouseDirectionX = 0,
    mouseDirectionY = 0,
    rmb = false;

/**
 * @type {Planet}
 */
let selectedPlanet = null;

window.addEventListener("mousemove", event => {
    mouseX = event.clientX * window.devicePixelRatio;
    mouseY = event.clientY * window.devicePixelRatio;

    mouseDirectionX = event.movementX;
    mouseDirectionY = event.movementY;
});

window.addEventListener("mousedown", event => {
    if (event.button === 2) {
        rmb = true;
    } else {
        const scale = uiScale() * camera.zoom;

        const x = (mouseX - canvas.width / 2) / scale + camera.x;
        const y = (mouseY - canvas.height / 2) / scale + camera.y;

        let selected;

        Planet.planets.forEach(planet => {
            if (Math.sqrt(Math.pow(planet.x - x, 2) + Math.pow(planet.y - y, 2)) <= 135) {
                selected = planet;
            }
        });

        selectedPlanet = selected ?? null;
    }
});

window.addEventListener("mouseup", event => {
    if (event.button === 2) {
        rmb = false;
    }
});

function uiScale() {
    if (canvas.height > canvas.width) {
        return canvas.height / 1080;
    }

    return canvas.width / 1920;
}

function renderGalaxy() {
    if (rmb) {
        camera.realX -= mouseDirectionX / camera.realZoom;
        camera.realY -= mouseDirectionY / camera.realZoom;
    }

    camera.x = lerp(camera.x, camera.realX, .1);
    camera.y = lerp(camera.y, camera.realY, .1);
    camera.zoom = lerp(camera.zoom, camera.realZoom, .1);

    const scale = uiScale() * camera.zoom;

    ctx.save();

    ctx.fillStyle = "#1B1B25";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.translate(-camera.x * scale, -camera.y * scale);
    ctx.scale(scale, scale);

    const routesDone = {};

    Planet.planets.forEach(planet => {
        routesDone[planet.name] = true;

        planet.connectingPlanets.forEach(otherPlanet => {
            if (routesDone[otherPlanet] === true) {
                return;
            }

            planet.connectTo(Planet.get(otherPlanet));
        });
    });

    Planet.planets.forEach(planet => planet.render());

    Planet.planets.forEach(planet => planet.text());

    ctx.restore();
}

const myFactionID = 1;

function renderUI() {
    const scale = uiScale();

    ctx.save();
    ctx.scale(scale, scale);

    let y = 30;

    const myFaction = Faction.factions.get(myFactionID);

    if (myFaction !== undefined) {
        drawText(myFaction.name.toUpperCase(), 10, y, 30, myFaction.color, Color.mix(myFaction.color, "#000000", .5), "left");
        y += 25;
        drawText(`Money: ${myFaction.money} | Income: ${myFaction.income}`, 10, y, 15, "#FFFFFF", Color.mix("#FFFFFF", "#000000", .5), "left");
        y += 30;
    }

    if (selectedPlanet !== null) {
        drawText(selectedPlanet.name.toUpperCase(), 30, y, 20, "#FFFFFF", Color.mix("#FFFFFF", "#000000", .5), "left");
        y += 25;
        drawText(`Faction: ${selectedPlanet.controllingFaction.name}`, 30, y, 20, selectedPlanet.controllingFaction.color, Color.mix(selectedPlanet.controllingFaction.color, "#000000", .5), "left");
    }

    if (true) {
        ctx.save();

        const width = canvas.width / scale;

        ctx.translate(0, canvas.height / scale - 200);

        ctx.fillStyle = "#252525";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#505050";

        ctx.beginPath();
        ctx.moveTo(200, 0);
        ctx.lineTo(width - 200, 0);
        ctx.lineTo(width - 100, 210);
        ctx.lineTo(100, 210);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(300, 0);
        ctx.lineTo(300, 210);
        ctx.closePath();
        ctx.stroke();

        function drawButton(x, y, fill, text) {
            ctx.translate(x, y);

            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.closePath();

            ctx.fillStyle = fill;
            ctx.strokeStyle = Color.mix(fill, "#000000", .5);
            ctx.lineWidth = 2.5;

            ctx.fill();
            ctx.stroke();

            drawText(text, 0, 20, 8, "#FFFFFF");

            ctx.translate(-x, -y);
        }

        drawButton(250, 50, "#EE5555", "Shipyard"); // Shipyard
        drawButton(250, 150, "#55EE55", "Structures"); // Structures

        if (selectedPlanet !== null && selectedPlanet.shipyard != null) {
            // Draw shipyard options
            let i = 0;
            selectedPlanet.shipyard.buildables.forEach(function drawBuildable(cost, name) {
                drawButton(400 + (i % 5) * 100, 50 + (i / 5 | 0) * 100, "#5555EE", cost);

                i++;
            });
        }

        ctx.restore();
    }

    ctx.restore();
}

function render() {
    requestAnimationFrame(render);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderGalaxy();
    renderUI();
}

render();