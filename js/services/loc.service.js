import { utilService } from "./utilService.js"
import { storageService } from "./storageService.js"

export const locService = {
    getLocs,
    addLoc,
    loadCache,
    getLoc,
    remove: removeLoc,
    setLocs
}

const locsStorageKey = 'locsDB'
let locs

function getLocs() {
    return new Promise((resolve, reject) => {
        (!locs || !locs.length) ? reject('No locs found') : resolve(locs)
    })
}

function getLoc(id) {
    return Promise.resolve(locs.find(loc => loc.id === id))
}

function setLocs(newLocs) {
    locs = newLocs
    return Promise.resolve(locs)
}

function loadCache() {
    return new Promise((resolve, reject) => {
        const newLocs = storageService.load(locsStorageKey) || []
        if (!newLocs.length) reject('No Locs in cache')
        else resolve(newLocs)
    })
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
    const locsPrm = Promise.resolve(locs = locs.filter(loc => loc.id !== id))
    storageService.save(locsStorageKey, locs)
    return locsPrm
}

