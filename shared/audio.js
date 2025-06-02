export const SONG_TYPE_HOME = 0;
export const SONG_TYPE_MAP = 1;
export const SONG_TYPE_BATTLE = 2;

const music = {
    [SONG_TYPE_HOME]: [
        "Across the Stars.mp3",
        "Yoda and the Younglings.mp3",
        "Jyn Erso & Hope Suite.mp3",
        "Guardians of the Whills Suite.mp3"
    ],
    [SONG_TYPE_MAP]: [
        "Lord Tyrannus Returns Finale.mp3",
        "Approaching the Death Star.m4a",
        "The Imperial Probe Saying Goodbye.m4a",
        "Grievous Speaks to Lord Sidious.mp3",
        "Jyn Erso & Hope Suite.mp3",
        "NIAMOS.mp3",
        "Past-Present-Future.mp3",
        "When Has Become Now.mp3"
    ],
    [SONG_TYPE_BATTLE]: [
        "Pursuit of the Falcon.m4a",
        "Battle of Endor I.m4a",
        "The Battle of Endor II.mp3",
        "Battle of Endor III.m4a",
        "The Battle of Hoth.m4a",
        "The Battle of Coruscant-Rescuing the Chancellor.mp3",
        "The Imperial Suite.mp3",
        "BattleOfKaminoCW.mp3",
        "BattleOfQuellCW.mp3",
        "Ben Kenobi's Death_Tie Fighter Attack.m4a",
        "The Battle of Yavin.m4a",
        "Scrambling the Rebel Fleet.mp3",
        "The Escape.mp3",
        "The Battle of Crait.mp3",
        "The Supremacy.mp3",
        "Holdos Resolve Edited.mp3"
    ]
};

let currentSong = null;
const audio = new Audio();

export function playSong(type) {
    const song = music[type][Math.random() * music[type].length | 0];

    if (currentSong === song) {
        return;
    }

    currentSong = song;
    audio.src = `./assets/audio/music/${song}`;

    audio.oncanplaythrough = null;
    audio.onended = null;

    audio.oncanplaythrough = () => {
        audio.play().catch(err => {
            console.error("Error playing song:", err);
            currentSong = null;
            setTimeout(() => playSong(type), 1000);
        });
    };

    audio.onended = () => {
        currentSong = null;
        playSong(type);
    };
}


export function stopSong() {
    if (audio.src) {
        audio.pause();
        audio.src = "";
        currentSong = null;
    }
}

export class SFXManager {
    constructor(maxConcurrent = 10) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.maxConcurrent = maxConcurrent;
        this.currentlyPlaying = new Set();
        this.bufferCache = new Map();

        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
    }

    setVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        } else {
            console.warn("Master gain node not initialized");
        }
    }

    async loadBuffer(file) {
        if (this.bufferCache.has(file)) {
            return this.bufferCache.get(file);
        }

        const response = await fetch(file);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

        this.bufferCache.set(file, audioBuffer);
        return audioBuffer;
    }

    async playSFX(file) {
        if (this.currentlyPlaying.size >= this.maxConcurrent) {
            return;
        }

        const buffer = await this.loadBuffer(file);
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.masterGain);

        source.onended = () => this.currentlyPlaying.delete(source);
        this.currentlyPlaying.add(source);

        source.start();
    }
}

// Hardpoint: 2, 4
// Boom: 7, 12

const genericSFX = new SFXManager(16);
const explosionSFX = new SFXManager(16);

genericSFX.setVolume(.05);
explosionSFX.setVolume(.45);

export const SFX_LASER_LIGHT = 0;
export const SFX_LASER_HEAVY = 1;
export const SFX_HARDPOINT = 2;
export const SFX_SHIP_EXPLOSION = 3;

const sfxFiles = {
    [SFX_LASER_LIGHT]: [
        "LightLaser1.mp3",
        "LightLaser2.mp3",
        "LightLaser3.mp3"
    ],
    [SFX_LASER_HEAVY]: [
        "HeavyLaser1.mp3",
        "HeavyLaser2.mp3",
        "HeavyLaser3.mp3",
        "HeavyLaser4.mp3"
    ],
    [SFX_HARDPOINT]: [
        "Hardpoint1.mp3",
        "Hardpoint2.mp3",
        "Hardpoint3.mp3"
    ],
    [SFX_SHIP_EXPLOSION]: [
        "ShipExplosion1.mp3",
        "ShipExplosion2.mp3",
        "ShipExplosion3.mp3"
    ]
};

export function playSFX(type) {
    const files = sfxFiles[type];
    if (!files || files.length === 0) {
        console.warn("No SFX files available for type:", type);
        return;
    }

    const file = files[Math.floor(Math.random() * files.length)];

    switch (type) {
        case SFX_HARDPOINT:
        case SFX_SHIP_EXPLOSION:
            explosionSFX.playSFX(`./assets/audio/sfx/${file}`).catch(err => {
                console.error("Error playing SFX:", err);
            });
            break;
        default:
            genericSFX.playSFX(`./assets/audio/sfx/${file}`).catch(err => {
                console.error("Error playing SFX:", err);
            });
    }
}