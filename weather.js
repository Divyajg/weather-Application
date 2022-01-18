//get weather for your choice of city------------------------------------------

const apiKey = "c20bdbd9cdf94e9fb3889776572cba5a";

function getWeatherHere() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
        console.log(weatherUrl);


        fetch(weatherUrl)
            .then(response => response.json())
            .then(weather => {
                if (weather.message === "city not found") {
                    document.getElementById('note').innerHTML = "Please provide the valid city name!"
                } else {
                    document.getElementById('city').innerHTML = "City:  " + city;
                    document.getElementById('temp').innerHTML = "Temperatur(F):  " + weather.main.temp;
                    document.getElementById('icon').src = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
                    document.getElementById('wind').innerHTML = "Wind Speed(Kmps):  " + weather.wind.speed;
                    document.getElementById('cloud').innerHTML = "Clouds:  " + weather.clouds.all;

                    localStorage.setItem('city', city);
                    let retriveData = localStorage.getItem('city');
                    console.log('retrived data:  ', retriveData);

                    let lat = weather.coord.lat;
                    let lng = weather.coord.lon;
                    let map;

                    function initMap(lat, lng) {
                        const coords = new google.maps.LatLng(lat, lng);
                        map = new google.maps.Map(document.getElementById("map"), {
                            zoom: 4,
                            center: coords,
                        });
                    }
                    initMap(lat, lng);
                    document.getElementById('map').innerHTML = `<div><iframe src="https://maps.google.com/maps?q=${weather.name}&t=&z=11&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div>`;
                }
            })
            .catch((error) => console.log(error));
    } else {
        document.getElementById('note').innerHTML = "Please provide the city!"
    }
}
document.querySelector('#weatherButton').addEventListener('click', getWeatherHere);

//Get current Location:

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    let crd = pos.coords;
    const cLocation = document.getElementById('displayCurrentLoc');
    cLocation.innerHTML = "Latitude= " + crd.latitude + "  Longitude= " + crd.longitude;
    const myurl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + crd.latitude + '&lon=' + crd.longitude + '&appid=' + apiKey;
    console.log(myurl);

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + crd.latitude + '&lon=' + crd.longitude + '&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {
            document.getElementById('currentTemp').innerHTML = "Temperatur(F):  " + data.main.temp;
            document.getElementById('currentWeather').innerHTML = "Weather:  " + data.weather[0].description;
            document.getElementById('icon2').src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

            let lat = data.coord.lat.toFixed(4);
            let lng = data.coord.lon.toFixed(4);
            let mapCurrent;
            const coords = new google.maps.LatLng(lat, lng);


            initMap(coords);
            document.getElementById('mapC').innerHTML = `<div><iframe src="https://maps.google.com/maps?q=${coords}&t=&z=11&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div>`;
        })
}

function initMap(coords) {
    mapCurrent = new google.maps.Map(document.getElementById("mapC"), {
        zoom: 16,
        center: coords,
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function currentLocation() { navigator.geolocation.getCurrentPosition(success, error, options); }

document.getElementById('currentLoc').addEventListener('click', currentLocation);