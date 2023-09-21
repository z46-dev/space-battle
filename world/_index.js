import ships from "../server/lib/ships.js";

void (async function main() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = innerWidth * devicePixelRatio;
        canvas.height = innerHeight * devicePixelRatio;

        canvas.lineJoin = canvas.lineCap = "round";
    }

    window.addEventListener("resize", resize);
    resize();

    const config = await (await fetch("./planets.json")).json();

    const planets = new Map();

    class Fleet {
        constructor() {
            this.ships = [];
        }

        get population() {
            return this.ships.reduce((a, b) => a + b.population, 0);
        }

        get shipCounts() {
            const fleetLayout = {};

            this.ships.sort((a, b) => b.population - a.population).forEach(ship => {
                fleetLayout[ship.name] = (fleetLayout[ship.name] ?? 0) + 1;
            });

            return fleetLayout;
        }

        toString() {
            return `${this.ships.length} Ships, ${this.population} Population, comprised of ${Object.entries(this.shipCounts).map(entry => {
                const string = entry[1] + " " + entry[0];

                if (entry[1] !== 1) {
                    return string + "s";
                }

                return string;
            }).join(", ")}`;
        }
    }

    class Planet {
        constructor(name) {
            this.id = name;
            this._x = 0;
            this._y = 0;
            this.color = "#FFFFFF";
            this.joinsTo = [];
            this.fleets = [];
            this.controlledFaction = 0;
            planets.set(this.id, this);
        }

        get x() {
            return this._x * 1.5;
        }

        get y() {
            return this._y * 1.5;
        }

        render() {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.strokeStyle = config.factions[this.controlledFaction].color;
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

            drawText(this.id.toUpperCase(), 0, -115, 60, this.color);
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

        // Function to find all possible paths between this planet and another planet
        findAllPaths(otherPlanet) {
            const paths = [];
            const visited = new Set();
            const controlledFaction = this.controlledFaction;

            function findPaths(currentPlanet, path, distance) {
                visited.add(currentPlanet.id);
                path.push(currentPlanet.id);

                if (currentPlanet.id === otherPlanet.id) {
                    paths.push({ path: [...path], distance });
                } else {
                    for (const neighborId of currentPlanet.joinsTo) {
                        const neighbor = planets.get(neighborId);

                        // Check if the neighbor planet is in the controlled faction or it's the final planet
                        if (
                            (neighbor.controlledFaction === controlledFaction || neighbor.id === otherPlanet.id) &&
                            !visited.has(neighborId) &&
                            !path.includes(neighborId)
                        ) {
                            const neighborDistance = Math.sqrt(
                                Math.pow(neighbor.x - currentPlanet.x, 2) +
                                Math.pow(neighbor.y - currentPlanet.y, 2)
                            );
                            findPaths(neighbor, path, distance + neighborDistance);
                        }
                    }
                }

                path.pop();
                visited.delete(currentPlanet.id);
            }

            const initialDistance = 0; // Initial distance is 0
            findPaths(this, [], initialDistance);

            return paths;
        }

        // Function to find the shortest distance path
        findShortestPathTo(otherPlanet) {
            const allPaths = this.findAllPaths(otherPlanet);

            if (allPaths.length === 0) {
                return null; // No paths found
            }

            // Find the shortest distance path based on distance
            let shortestPath = allPaths[0];
            for (const pathInfo of allPaths) {
                if (pathInfo.distance < shortestPath.distance) {
                    shortestPath = pathInfo;
                }
            }

            return shortestPath.path;
        }

    }

    config.planets.forEach(planetTemplate => {
        const planet = new Planet(planetTemplate.name);
        planet._x = planetTemplate.x;
        planet._y = planetTemplate.y;
        planet.color = planetTemplate.color ?? "#FFFFFF";
    });

    config.connections.forEach(connection => {
        const a = planets.get(connection[0]);
        const b = planets.get(connection[1]);

        a.joinsTo.push(b.id);
        b.joinsTo.push(a.id);
    });

    function createFleet(faction, maxPopulation) {
        const fleet = new Fleet();

        let fails = 0;
        while (maxPopulation > 0 && fails < 256) {
            let ship = undefined,
                i = 0;

            miniLoop: while (i < faction.units.length * 5) {
                faction.units = faction.units.sort(() => .5 - Math.random());
                
                const unit = ships[faction.units[0]];

                if (unit.population <= maxPopulation) {
                    ship = unit;
                    break miniLoop;
                }

                i ++;
            }

            if (ship !== undefined) {
                fleet.ships.push(ship);
                maxPopulation -= ship.population;
            } else {
                fails ++;
            }
        }

        return fleet;
    }

    const fleets = [];

    config.factions.forEach(faction => {
        faction.planets.forEach(planet => {
            planets.get(planet).controlledFaction = faction.id;
            // const fleet = createFleet(faction, 40 + Math.random() * 80 | 0);
            // fleets.push({
            //     planet, faction: faction.name, population: fleet.population, ships: fleet.shipCounts
            // });
        });

        if (faction.capital === undefined) {
            return;
        }

        const capital = planets.get(faction.capital.name);

        const fleet = createFleet(faction, faction.capital.fleetPopulation);

        capital.fleets[0] = fleet;

        fleets.push({
            planet: capital.id,
            faction: faction.name,
            population: fleet.population,
            ships: fleet.shipCounts
        });
    });

    planets.forEach(planet => {
        if (planet.fleets[0] != null) {
            return;
        }

        const faction = config.factions[planet.controlledFaction];
        const fleet = createFleet(faction, 40 + Math.random() * 80 | 0);

        planet.fleets[0] = fleet;

        fleets.push({
            planet: planet.id,
            faction: faction.name,
            population: fleet.population,
            ships: fleet.shipCounts
        });
    });

    console.log(createFleet(config.factions[4], 300).toString());

    console.table(fleets);

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

    // Connections
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

            planets.forEach(planet => {
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

    const colorCache = {};
    function mixColors(primary, secondary, strength) {
        const cacheKey = `${primary}${secondary}${strength}`;
        if (colorCache[cacheKey] !== undefined) {
            return colorCache[cacheKey];
        }

        const [primaryR, primaryG, primaryB] = primary.match(/\w\w/g).map(e => parseInt(e, 16));
        const [secondaryR, secondaryG, secondaryB] = secondary.match(/\w\w/g).map(e => parseInt(e, 16));

        const r = Math.round(primaryR + (secondaryR - primaryR) * strength);
        const g = Math.round(primaryG + (secondaryG - primaryG) * strength);
        const b = Math.round(primaryB + (secondaryB - primaryB) * strength);

        const color = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        colorCache[cacheKey] = color;
        return color;
    }

    function drawText(text, x, y, size, fill, stroke = mixColors(fill, "#000000", .5), align = "center") {
        ctx.font = `bold ${size}px sans-serif`;
        ctx.textAlign = align;

        ctx.strokeStyle = stroke;
        ctx.lineWidth = size * .15;
        ctx.strokeText(text, x, y);

        ctx.fillStyle = fill;
        ctx.fillText(text, x, y);
    }

    function drawGalaxySpiral(size) {
        ctx.save();
        ctx.scale(size, size);

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = .01;

        ctx.beginPath();
        ctx.moveTo(0, 0);

        for (let i = 0; i < 100; i++) {
            const angle = Math.PI / 2 * i;
            const radius = 1 / (i / 10 + 1);

            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }

        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    function drawScene() {
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

        //drawGalaxySpiral(3000);

        const routesDone = {};

        planets.forEach(planet => {
            routesDone[planet] = true;

            planet.joinsTo.forEach(otherPlanet => {
                if (routesDone[otherPlanet] === true) {
                    return;
                }

                planet.connectTo(planets.get(otherPlanet));
            });
        });

        planets.forEach(planet => planet.render());

        ctx.restore();
    }

    function drawUI() {
        const scale = uiScale();

        ctx.save();
        ctx.scale(scale, scale);

        if (selectedPlanet !== null) {
            drawText(selectedPlanet.id.toUpperCase(), 10, 40, 30, "#FFFFFF", mixColors("#FFFFFF", "#000000", .5), "left");
            drawText(`Faction: ${config.factions[selectedPlanet.controlledFaction].name}`, 10, 70, 20, config.factions[selectedPlanet.controlledFaction].color, mixColors(config.factions[selectedPlanet.controlledFaction].color, "#000000", .5), "left");
            drawText(`Fleet: ${selectedPlanet.fleets[0].toString()}`, 10, 100, 20, "#FFFFFF", mixColors("#FFFFFF", "#000000", .5), "left");
        }

        

        ctx.restore();
    }

    function draw() {
        requestAnimationFrame(draw);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawScene();
        drawUI();
    }

    draw();

    window.planets = planets;
    window.findPath = (a, b) => planets.get(a).findShortestPathTo(planets.get(b));

    window.printConnections = () => {
        const connectionLinks = [...planets.values()];
        const connections = [];

        connectionLinks.forEach(planet => {
            const first = planet.id;

            for (let other of planet.joinsTo) {
                const conn = [first, other].sort();

                if (!connections.some(ocon => ocon[0] === conn[0] && ocon[1] === conn[1])) {
                    connections.push(conn);
                }
            }
        });
        return connections;
    }

    window.getFactionForces = (factionName) => {
        const faction = config.factions.find(fac => fac.name === factionName);
        const fleets = [];
        const combinedFleet = new Fleet();

        planets.forEach(planet => {
            if (planet.controlledFaction !== faction.id) {
                return;
            }
            
            planet.fleets.forEach(fleet => {
                fleets.push(fleet);

                combinedFleet.ships.push(...fleet.ships);
            });
        });

        return { fleets, combinedFleet };
    }
})();