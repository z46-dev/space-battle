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
    class Planet {
        constructor(name) {
            this.id = name;
            this.x = 0;
            this.y = 0;
            this.color = "#FFFFFF";
            this.joinsTo = [];
            this.controlledFaction = 0;
            planets.set(this.id, this);
        }

        render() {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.strokeStyle = config.factions[this.controlledFaction].color;
            ctx.lineWidth = 15;
            ctx.translate(this.x * 1.5, this.y * 1.5);

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
            ctx.moveTo(this.x * 1.5, this.y * 1.5);
            ctx.lineTo(other.x * 1.5, other.y * 1.5);
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
        planet.x = planetTemplate.x;
        planet.y = planetTemplate.y;
        planet.color = planetTemplate.color ?? "#FFFFFF";
    });

    config.connections.forEach(connection => {
        const a = planets.get(connection[0]);
        const b = planets.get(connection[1]);

        a.joinsTo.push(b.id);
        b.joinsTo.push(a.id);
    });

    config.factions.forEach(faction => {
        faction.planets.forEach(planet => {
            planets.get(planet).controlledFaction = faction.id;
        });
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

    function draw() {
        requestAnimationFrame(draw);

        const scale = uiScale() * .075;

        ctx.save();

        ctx.fillStyle = "#1B1B25";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scale, scale);

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

    draw();
})();