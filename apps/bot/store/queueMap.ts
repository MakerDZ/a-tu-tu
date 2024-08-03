import { Track } from 'discord-player';

interface HashMapValue {
    index: number;
    track: Track;
    played: boolean;
}

type HashMap = { [key: string]: HashMapValue };

const hashmap: HashMap = {};

function set(key: string, value: HashMapValue): void {
    hashmap[key] = value;
}

function get(key: string): HashMapValue | undefined {
    return hashmap[key];
}

function remove(key: string): void {
    delete hashmap[key];
}

function getAll(): HashMap {
    return { ...hashmap };
}

function findByIndex(index: number): HashMapValue | undefined {
    for (const key in hashmap) {
        if (hashmap[key].index === index) {
            return hashmap[key];
        }
    }
    return undefined;
}

function getLastIndex(): number | undefined {
    let lastIndex: number | undefined = undefined;
    for (const key in hashmap) {
        const value = hashmap[key];
        if (lastIndex === undefined || value.index > lastIndex) {
            lastIndex = value.index;
        }
    }
    return lastIndex;
}

function updatePlayed(key: string, played: boolean): void {
    const value = hashmap[key];
    if (value) {
        value.played = played;
    }
}

function clear(): void {
    for (const key in hashmap) {
        delete hashmap[key];
    }
}

export const queueMap = {
    set,
    get,
    remove,
    getAll,
    findByIndex,
    getLastIndex,
    updatePlayed,
    clear,
};
