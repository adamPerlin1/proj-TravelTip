'use strict'

export const mapService = {
    initMap,
    addMarker,
    panTo
}

<<<<<<< HEAD
var gMap
=======
let gMap;
>>>>>>> aa284bf50a8d583150e1bd84d04893c66d9f2c2d

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    const marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
<<<<<<< HEAD
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
=======
    return marker;
}

function panTo(lat, lng) {
    const laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
>>>>>>> aa284bf50a8d583150e1bd84d04893c66d9f2c2d
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
<<<<<<< HEAD
    const API_KEY = '' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)
=======
    const API_KEY = ''; //TODO: Enter your API Key
    const elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
>>>>>>> aa284bf50a8d583150e1bd84d04893c66d9f2c2d

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}