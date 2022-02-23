export const locService = {
    getLocs,
    addLoc
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        resolve(locs)
        // }, 2000)
    })
}

function addLoc({ name, latLng }) {
    return Promise.resolve(locs.shift({
        id: makeId(5),
        name,
        latLng,
        created
    }))
}


