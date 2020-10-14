const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544'
const mymap = L.map('issMap').setView([0, 0], 4);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl, {attribution});
const myIcon = L.icon({
    iconUrl: './images/International_Space_Station.svg.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
    popupAnchor: [-3, -76],
});
const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);


tiles.addTo(mymap);

const getISS = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { latitude, longitude, visibility, velocity } = data;
    document.getElementById("lat").innerText = latitude.toFixed(2) + '\xB0';
    document.getElementById("lon").innerText = longitude.toFixed(2) + '\xB0';
    document.getElementById("visibility").innerText = visibility;
    document.getElementById("velocity").innerText = velocity.toFixed(2);
    marker.setLatLng([latitude, longitude]);
    mymap.setView([latitude, longitude]);
    return data; 
} 

const getGeoLocation = async (latitude, longitude) => {
    const response2 = await fetch(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`)
    const data2 = await response2.json();
    const { timezone_id, country_code } = data2;
    console.log(data2)
}

getISS()


setInterval(getISS, 2000);
