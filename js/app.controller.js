'use strict'

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGoTo = onGoTo
window.onDelete = onDelete
window.onSearchLoc = onSearchLoc

function onInit() {
    mapService.initMap()
        .then((map) => {
            console.log('Map is ready')
            addListeners(map)
        })
        .catch(() => console.log('Error: cannot init map'))

    locService.loadCache()
        .then(locService.setLocs)
        .then(renderLocations)
        .catch(err => console.log(err))
}

function addListeners(map) {
    addMapListener(map)
}

function addMapListener(map) {
    map.addListener('click', (mapsMouseEvents) => {
        const latLng = mapsMouseEvents.latLng
        const location = {
            name: prompt('Enter location name'),
            latLng: {
                lat: latLng.lat(),
                lng: latLng.lng()
            }
        }

        locService.addLoc(location)
            .then(renderLocations)
    })

}

function renderLocations(locations) {
    const strHTMLs = locations.map(location => {
        return `<tr>
                    <td>${location.name}</td>
                    <td>${location.latLng.lng}</td>
                    <td>${location.latLng.lat}</td>
                    <td>
                    <button onclick="onGoTo(${location.latLng.lat},${location.latLng.lng})">Go</button>
                    <button onclick="onDelete('${location.id}')">Delete</button>
                    </td>
                </tr>`
    })
    document.querySelector('.places-table').innerHTML = strHTMLs.join('')
}

function onDelete(locationId) {
    locService.remove(locationId)
        .then(renderLocations)
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onSearchLoc() {
    const value = document.querySelector('input').value
    locService.searchLoc(value)
        .then(onPanTo)
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            onGoTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onGoTo(lat, lng) {
    const formattedPos = {lat , lng}
    onPanTo(formattedPos)
}

function onPanTo(loc) {
    if(!loc) loc ={
        lat:139.76083673742966,
        lng: 35.693004073757464
       
    }
    console.log('Panning the Map') 
    mapService.panTo(loc.lat, loc.lng)
}