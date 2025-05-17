export class LogEntry {
    static LEVEL = {
        SYSTEM: {
            INFO: 0,
            WARNING: 1,
            ERROR: 2
        },
        GAME: {
            GENERIC: 3,
            BATTLE_RESULT: 4,
            BATTLE_PENDING: 5,
            HERO_DEATH: 6,
            PLANET_CONTROL_CHANGE: 7,
            DREADNOUGHT_CONSTRUCTION: 8
        }
    };

    constructor(week, level, message) {
        this.week = week;
        this.level = level;
        this.message = message;
    }

    get color() {
        return {
            [LogEntry.LEVEL.SYSTEM.WARNING]: "#FFFF00",
            [LogEntry.LEVEL.SYSTEM.ERROR]: "#FF0000",
            [LogEntry.LEVEL.GAME.BATTLE_RESULT]: "#5555CC",
            [LogEntry.LEVEL.GAME.BATTLE_PENDING]: "#CC5555",
            [LogEntry.LEVEL.GAME.HERO_DEATH]: "#CCCC55",
            [LogEntry.LEVEL.GAME.PLANET_CONTROL_CHANGE]: "#55CCCC",
            [LogEntry.LEVEL.GAME.DREADNOUGHT_CONSTRUCTION]: "#CC55CC"
        }[this.level] || "#FFFFFF";
    }
}

export class LivingLogEntry extends LogEntry {
    constructor(week, level, message) {
        super(week, level, message);
        this.timer = 1024;
    }
}

export default class Log {
    /** @type {LogEntry[]} */
    #entries;
    constructor() {
        this.#entries = [];

        /** @type {LivingLogEntry[]} */
        this.livingEntries = [];
    }

    #write(week, level, message) {
        this.#entries.push(new LogEntry(week, level, message));
        this.livingEntries.push(new LivingLogEntry(week, level, message));
    }

    info(week, message) {
        this.#write(week, LogEntry.LEVEL.SYSTEM.INFO, message);
    }

    warning(week, message) {
        this.#write(week, LogEntry.LEVEL.SYSTEM.WARNING, message);
    }

    error(week, message) {
        this.#write(week, LogEntry.LEVEL.SYSTEM.ERROR, message);
    }

    generic(week, message) {
        this.#write(week, LogEntry.LEVEL.GAME.GENERIC, message);
    }

    battleResult(week, message) {
        this.#write(week, LogEntry.LEVEL.GAME.BATTLE_RESULT, message);
    }

    battlePending(week, message) {
        this.#write(week, LogEntry.LEVEL.GAME.BATTLE_PENDING, message);
    }

    heroDeath(week, message) {
        this.#write(week, LogEntry.LEVEL.GAME.HERO_DEATH, message);
    }

    planetControlChange(week, message) {
        this.#write(week, LogEntry.LEVEL.GAME.PLANET_CONTROL_CHANGE, message);
    }

    dreadnoughtConstruction(week, message) {
        this.#write(week, LogEntry.LEVEL.GAME.DREADNOUGHT_CONSTRUCTION, message);
    }

    get entries() {
        return this.#entries;
    }

    getLivingEntries() {
        for (let i = 0; i < this.livingEntries.length; i++) {
            const entry = this.livingEntries[i];
            entry.timer--;

            if (entry.timer <= 0) {
                this.livingEntries.splice(i, 1);
                i--;
            }
        }

        return this.livingEntries;
    }

    serialize() {
        return this.#entries.map(e => [e.week, e.level, e.message]);
    }

    static deserialize(data) {
        const log = new Log();

        for (const [week, level, message] of data) {
            log.#write(week, level, message);
        }

        return log;
    }
}