const DB_NAME = "GameSavesDB";
const DB_VERSION = 1;
const STORE_NAME = "saves";

/** @type {IDBDatabase} */
let db = null;

export function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = function () {
            reject("IndexedDB initialization failed");
        }

        request.onsuccess = function () {
            db = request.result;
            resolve();
        }

        request.onupgradeneeded = function (event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        }
    });
}

export function insertSave(name, saveBlob) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject("DB not initialized. Call initDB() first.");
        }

        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.put(saveBlob, name);

        request.onsuccess = function () {
            resolve();
        }

        request.onerror = function () {
            reject("Failed to insert save.");
        }
    });
}

export function loadSave(name) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject("DB not initialized. Call initDB() first.");
        }

        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(name);

        request.onsuccess = function (event) {
            const result = event.target.result;
            if (result !== undefined) {
                resolve(result);
            } else {
                reject("Save not found.");
            }
        }

        request.onerror = function () {
            reject("Failed to load save.");
        }
    });
}

export function saveKeys() {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject("DB not initialized. Call initDB() first.");
        }

        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAllKeys();

        request.onsuccess = function (event) {
            resolve(event.target.result);
        }

        request.onerror = function () {
            reject("Failed to retrieve save keys.");
        }
    });
}

export function deleteSave(name) {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject("DB not initialized. Call initDB() first.");
        }

        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.delete(name);

        request.onsuccess = function () {
            resolve();
        }

        request.onerror = function () {
            reject("Failed to delete save.");
        }
    });
}

export function wipeSaves() {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject("DB not initialized. Call initDB() first.");
        }

        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = function () {
            resolve();
        }

        request.onerror = function () {
            reject("Failed to wipe saves.");
        }
    });
}