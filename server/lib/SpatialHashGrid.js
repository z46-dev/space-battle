const shiftA = 9;
const shiftB = 9;

export default class SpatialHashGrid {
    constructor() {
        this.grid = new Map();
        this.currentQuery = 0;
    }

    clear() {
        this.grid.clear();
        this.currentQuery = 0;
    }

    insert(object) {
        const startX = object._AABB.x1 >> shiftA;
        const startY = object._AABB.y1 >> shiftA;
        const endX = object._AABB.x2 >> shiftA;
        const endY = object._AABB.y2 >> shiftA;
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                const key = x | (y << shiftB);
                if (!this.grid.has(key)) this.grid.set(key, [object]);
                else this.grid.get(key).push(object);
            }
        }
    }

    retrieve(object) {
        const result = new Map();
        const startX = object._AABB.x1 >> shiftA;
        const startY = object._AABB.y1 >> shiftA;
        const endX = object._AABB.x2 >> shiftA;
        const endY = object._AABB.y2 >> shiftA;
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                const key = x | (y << shiftB);
                if (!this.grid.has(key)) {
                    continue;
                }

                const cell = this.grid.get(key);
                for (let i = 0; i < cell.length; i++) {
                    if (cell[i]._AABB.currentQuery != this.currentQuery) {
                        cell[i]._AABB.currentQuery = this.currentQuery;
                        if (
                            cell[i].hash !== 0 &&
                            this.hitDetection(object, cell[i])
                        ) {
                            result.set(cell[i].id, cell[i]);
                        }
                    }
                }
            }
        }
        
        this.currentQuery = (this.currentQuery + 1) >>> 0;
        return result;
    }

    hitDetection(object, other) {
        return !(object._AABB.x1 > other._AABB.x2 || object._AABB.y1 > other._AABB.y2 || object._AABB.x2 < other._AABB.x1 || object._AABB.y2 < other._AABB.y1);
    }

    getAABB(object) {
        const size = object.size;
        return {
            x1: object.x - size * object.width,
            y1: object.y - size * object.height,
            x2: object.x + size * object.width,
            y2: object.y + size * object.height,
            currentQuery: -1
        };
    }
}