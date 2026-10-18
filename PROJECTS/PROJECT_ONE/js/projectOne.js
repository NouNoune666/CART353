window.onload = chargerDonneesCarte;

async function chargerDonneesCarte() {


    // my api key
    const key = '7vKeZnHekBMfDZnpSUkw';
    const styleURL = 'https://api.maptiler.com/maps/01a14c50-96ac-7805-8ea9-dc914492797a/style.json?key=' + key;
    const map = L.map(document.getElementById('map')).setView([45.547307, -73.618364], 16); //latitude, longtitude, zoom
    const mtLayer = L.maptiler.maptilerLayer({
        apiKey: key,
        style: styleURL,
    }).addTo(map);


    try {
        let response = await fetch('data/test.geojson');
        let testData = await response.json();
        console.log('works', testData)
        L.geoJson(testData, {
            pointToLayer: function (feature, latlng) {
                console.log('un lieu, un point:', feature.properties.Nom);
                return L.circleMarker(latlng);
            }
        }).addTo(map);
    }

    catch (err) {
        console.error('error:', err)
    }





}

