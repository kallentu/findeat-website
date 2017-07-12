// find location of user
var service, map, infowindow;
var latitude, longitude;

function getLocation() {
    if (navigator.geolocation) {
        //getCurrentPosition() method is successful, it returns a coordinates object to the 
        //function specified in the parameter (showPosition)
        navigator.geolocation.getCurrentPosition(setPosition);
    }
    else {
        document.getElementById("restaurant").innerHTML = "can't find you where are you";
    }
}

//displaying location on screen -- may or may not be necessary
function setPosition(position) {
    //determining location
    //document.getElementById("restaurant").innerHTML = "latitude: " + position.coords.latitude +
    //    "<br>longitude: " + position.coords.longitude;

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    init();
}

function init() {
    //initialize user's latitude and longitude for usage
    var userLocation = { lat: latitude, lng: longitude };

    //customize restaurant request, radius is in meters
    var request = {
        location: userLocation,
        radius: 5000,
        type: ['restaurant']
        //TODO: add min and max price
    };

    service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, callback);
}

function callback(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        //TODO: randomize which restaurant to get instead of taking 1
        //shows chosen place name
        document.getElementById("restaurant").innerHTML = results[0].name;
    }

}