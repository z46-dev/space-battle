import ships from "./lib/ships.js";

function angleDifference(a, b) {
    return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;

    return Math.sqrt(dx * dx + dy * dy);
}

class Projectile {}

class Hardpoint {}

class Ship {}

function gameLoop() {}

function talkLoop() {}