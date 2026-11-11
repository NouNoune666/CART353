window.onload = go;

async function go() {





    // my api key
    const key = '7vKeZnHekBMfDZnpSUkw';
    const styleURL = 'https://api.maptiler.com/maps/01a14c50-96ac-7805-8ea9-dc914492797a/style.json?key=' + key;
    const map = L.map(document.getElementById('map')).setView([45.547307, -73.618364], 16); //latitude, longtitude, zoom
    const mtLayer = L.maptiler.maptilerLayer({
        apiKey: key,
        style: styleURL,
    }).addTo(map);


    // character
    let originalLatitude = 45.54812686724733;
    let originalLongitude = -73.61843611951373;
    let characterRadius = 10;
    let characterMovement = 0.0001

    let myCircle = new L.CircleMarker([originalLatitude, originalLongitude], {
        color: 'black',
        radius: characterRadius,
    }).addTo(map)


    window.addEventListener("keydown", function (e) {
        console.log(e.key)
        if (e.key === "w") {
            console.log(originalLatitude)
            originalLatitude += characterMovement
            myCircle.setLatLng([originalLatitude, originalLongitude])
        }
        if (e.key === "a") {
            originalLongitude -= characterMovement
            myCircle.setLatLng([originalLatitude, originalLongitude])
        }
        if (e.key === "s") {
            console.log(originalLatitude)
            originalLatitude -= characterMovement
            myCircle.setLatLng([originalLatitude, originalLongitude])
        }
        if (e.key === "d") {
            originalLongitude += characterMovement
            myCircle.setLatLng([originalLatitude, originalLongitude])
        }
    });




    try {
        let response = await fetch('data/test.geojson');
        let testData = await response.json();
        // console.log('works', testData)
        new L.GeoJson(testData, {
            pointToLayer: function (feature, latlng) {
                // console.log('un lieu, un point:', feature.properties.Nom);
                return new L.CircleMarker(latlng);
            }
        }).addTo(map);
    }

    catch (err) {
        console.error('error:', err)
    }

    try {
        let response = await fetch('data/villeray_2026.json');
        let villerayData = await response.json();
        // console.log('villeray data works', villerayData[0].info.owners.main.name)
        console.log(villerayData.length);
        // console.log(villerayData[0].unit); 


        villerayData.forEach(function (logement) {
            // console.log(logement.lat);
            // console.log(logement.unit.NOMBRE_LOGEMENT)

            let radius = 3;
            let NBlogements = logement.unit.NOMBRE_LOGEMENT;

            if (NBlogements > 50) {
                new L.CircleMarker([logement.lng, logement.lat], {
                    color: 'red',
                    radius: radius,
                }).addTo(map)
            }
            else if (NBlogements > 20) {
                new L.CircleMarker([logement.lng, logement.lat], {
                    color: 'green',
                    radius: radius,
                }).addTo(map)
            }
            else if (NBlogements > 10) {
                new L.CircleMarker([logement.lng, logement.lat], {
                    color: 'blue',
                    radius: radius,
                }).addTo(map)

            }
            else {
                new L.CircleMarker([logement.lng, logement.lat], {
                    color: 'pink',
                    radius: radius,
                }).addTo(map)
            }

        });



    }
    catch (err) {
        console.error(err)
    }


}
