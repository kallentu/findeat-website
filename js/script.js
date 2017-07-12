// find location of user
var service, map, infowindow;
var latitude, longitude;

function getLocation() {
    if (navigator.geolocation) {
        //getCurrentPosition() method is successful, it returns a coordinates object to the 
        //function specified in the parameter (showPosition)
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        document.getElementById("restaurant").innerHTML = "can't find you where are you";
    }
}

//displaying location on screen -- may or may not be necessary
function showPosition(position) {
    document.getElementById("restaurant").innerHTML = "latitude: " + position.coords.latitude +
        "<br>longitude: " + position.coords.longitude;

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    initMap();
}

function initMap() {
    //initialize user's latitude and longitude for usage
    var userLocation = { lat: latitude, lng: longitude };

    map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();

    //customize restaurant request, radius is in meters
    var request = {
        location: userLocation,
        radius: 500,
        type: ['restaurant']
        //TODO: add min and max price
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }

    //TODO: randomize which restaurant to get instead of taking 1
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}