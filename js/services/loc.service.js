import { utilService } from "./utilService.js"
import { storageService } from "./storageService.js"

export const locService = {
    getLocs,
    addLoc,
    loadCache,
    getLoc,
    remove: removeLoc
}

const locsStorageKey = 'locsDB'
let locs

function getLocs() {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        resolve(locs)
        // }, 2000)
    })
}

function getLoc(id) {
    return locs.find(loc => loc.id === id)
}

function loadCache() {
    return locs = storageService.load(locsStorageKey) || []
}

function addLoc({ name, latLng }) {
    const newLoc = {
        id: utilService.makeId(5),
        name,
        latLng,
        createdAt: Date.now()
    }
    locs.unshift(newLoc)
    storageService.save(locsStorageKey, locs)
    return Promise.resolve(locs)
}

function removeLoc(id) {
    locs = locs.filter(loc => loc.id !== id)
}

