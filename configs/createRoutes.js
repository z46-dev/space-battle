import { PlanetConfig } from "./planets.js";

function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

function linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const ccw = (xA, yA, xB, yB, xC, yC) => (yC - yA) * (xB - xA) > (yB - yA) * (xC - xA);
    return (
        ccw(x1, y1, x3, y3, x4, y4) !== ccw(x2, y2, x3, y3, x4, y4) &&
        ccw(x1, y1, x2, y2, x3, y3) !== ccw(x1, y1, x2, y2, x4, y4)
    );
}

function lineNearPoint(x1, y1, x2, y2, px, py, radius) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    const param = lenSq !== 0 ? dot / lenSq : -1;

    let xx, yy;
    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    return dist(px, py, xx, yy) < radius;
}

class DSU {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
    }

    find(x) {
        if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }

    union(x, y) {
        const rx = this.find(x);
        const ry = this.find(y);
        if (rx !== ry) this.parent[rx] = ry;
    }

    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

/** @param {PlanetConfig[]} planets */
export function createSafeLinks(planets) {
    const maxLinks = 5;
    const minLinks = 3;
    const radius = 150;
    const links = [];
    const linkCounts = new Map();
    const planetMap = new Map(planets.map(p => [p.name, p]));
    const planetIndex = new Map(planets.map((p, i) => [p.name, i]));

    const candidates = [];

    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const a = planets[i];
            const b = planets[j];
            candidates.push({ a, b, dist: dist(a.x, a.y, b.x, b.y) });
        }
    }

    candidates.sort((a, b) => a.dist - b.dist);

    function linkExists(a, b) {
        return links.some(
            l => (l.from === a.name && l.to === b.name) || (l.from === b.name && l.to === a.name)
        );
    }

    function canLink(a, b) {
        return (linkCounts.get(a.name) || 0) < maxLinks &&
            (linkCounts.get(b.name) || 0) < maxLinks;
    }

    function overlapsExisting(a, b) {
        for (const l of links) {
            const p1 = planetMap.get(l.from);
            const p2 = planetMap.get(l.to);

            if (linesIntersect(a.x, a.y, b.x, b.y, p1.x, p1.y, p2.x, p2.y)) return true;

            for (const p of planets) {
                if (p.name !== a.name && p.name !== b.name) {
                    if (lineNearPoint(a.x, a.y, b.x, b.y, p.x, p.y, radius)) return true;
                }
            }
        }
        return false;
    }

    function tryAddLink(a, b) {
        if (!canLink(a, b)) return false;
        if (linkExists(a, b)) return false;
        if (overlapsExisting(a, b)) return false;

        links.push({ from: a.name, to: b.name });
        linkCounts.set(a.name, (linkCounts.get(a.name) || 0) + 1);
        linkCounts.set(b.name, (linkCounts.get(b.name) || 0) + 1);
        return true;
    }

    // Phase 1: Add shortest non-overlapping links
    for (const { a, b } of candidates) {
        tryAddLink(a, b);
    }

    // Phase 2: Ensure every planet has at least 2 links
    // for (const a of planets) {
    //     while ((linkCounts.get(a.name) || 0) < minLinks) {
    //         for (const b of planets) {
    //             if (a.name === b.name) continue;
    //             if (tryAddLink(a, b)) break;
    //         }
    //     }
    // }
    // Phase 2: Ensure every planet has at least minLinks links
    for (const a of planets) {
        let needed = minLinks - (linkCounts.get(a.name) || 0);
        for (let attempt = 0; attempt < needed; attempt++) {
            planets.sort((aa, bb) => dist(a.x, a.y, aa.x, aa.y) - dist(a.x, a.y, bb.x, bb.y));
            for (const b of planets) {
                if (a.name === b.name) continue;
                if (tryAddLink(a, b)) {
                    break;
                }
            }
        }
    }


    // Phase 3: Ensure full connectivity
    const dsu = new DSU(planets.length);
    for (const l of links) {
        dsu.union(planetIndex.get(l.from), planetIndex.get(l.to));
    }

    for (const { a, b } of candidates) {
        const i1 = planetIndex.get(a.name);
        const i2 = planetIndex.get(b.name);
        if (dsu.connected(i1, i2)) continue;
        if (tryAddLink(a, b)) dsu.union(i1, i2);
    }

    return links;
}
