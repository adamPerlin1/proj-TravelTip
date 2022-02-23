import { utilService } from "./utilService.js"
import { storageService } from "./storageService.js"

export const locService = {
    getLocs,
    addLoc,
    loadCache,
    getLoc,
    remove: removeLoc,
    setLocs,
    searchLoc
}

const LOCS_STORAGE_KEY = 'locsDB'
let gLocs

function getLocs() {
    return new Promise((resolve, reject) => {
        (!gLocs || !gLocs.length) ? reject('No locs found') : resolve(gLocs)
    })
}

function getLoc(id) {
    return Promise.resolve(gLocs.find(loc => loc.id === id))
}

function setLocs(newLocs) {
    return Promise.resolve(gLocs = newLocs)
}

function loadCache() {
    return Promise.resolve(storageService.load(LOCS_STORAGE_KEY) || [])
}

function addLoc({ name, latLng }) {
    return new Promise((resolve, reject) => {
        if (!name) reject('No Name was given')
        const newLoc = {
            id: utilService.makeId(5),
            name,
            latLng,
            createdAt: Date.now()
        }
        gLocs.unshift(newLoc)
        storageService.save(LOCS_STORAGE_KEY, gLocs)
        resolve(gLocs)
    })
}

function removeLoc(id) {
    const locsPrm = Promise.resolve(gLocs = gLocs.filter(loc => loc.id !== id))
    storageService.save(LOCS_STORAGE_KEY, gLocs)
    return locsPrm
}

function searchLoc(searchVal) {
    const API_KEY = 'AIzaSyAKDOsCc8LzeCHGEFj0ULFxzTzmfU6W6_k' // Adam's API Key
    searchVal = searchVal.replace(/\s/g, '+')
    console.log(searchVal);
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchVal}&key=${API_KEY}`)
        .then(ans => ans.json())
        .then(res => {
            if (res.status !== 'OK') throw new Error('Couldnt communicate with api')
            const formattedLoc = {
                lat: res.results[0].geometry.location.lat,
                lng: res.results[0].geometry.location.lng
            }
            return addLoc({ name: searchVal, latLng: formattedLoc })
                .then(() => formattedLoc)
        })
        .catch(err => {
            throw err
        })
}
