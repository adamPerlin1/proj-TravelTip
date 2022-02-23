import { utilService } from "./utilService.js"

export const locService = {
    getLocs,
    addLoc
}


const locs = [

]

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
    console.log(locs)
    return Promise.resolve(locs)
}


