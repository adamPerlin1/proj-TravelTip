import { utilService } from "./utilService.js"
import { storageService } from "./storageService.js"

export const locService = {
    getLocs,
    addLoc
}

const locsStorageKey = 'locsDB'
const locs = []

function getLocs() {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        resolve(locs)
        // }, 2000)
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


