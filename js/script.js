var service;
var latitude, longitude;
var distance, category = null;

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
    //displaying location
    //document.getElementById("restaurant").innerHTML = "latitude: " + position.coords.latitude +
    //    "<br>longitude: " + position.coords.longitude;

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    initPlaces();
}

// user-inputted distance level
function setDistance() {
    //gets input from input slider
    distance = document.getElementById("distance").value;
}

//initialize Google Places API by sending request for search
function initPlaces() {
    //initialize user's latitude and longitude for usage
    var userLocation = { lat: latitude, lng: longitude };

    setDistance();

    //customize restaurant request, radius is in meters - taken from sliders
    var request = {
        location: userLocation,
        radius: distance,
        type: ['restaurant'],
        keyword: category
    };

    service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, displayResult);
}

//shows chosen place name
//random int between 0 and however many restaurants were found
function displayResult(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var index = Math.round(Math.random() * (results.length - 1));
        //document.getElementById("restaurant").innerHTML = results.length;
        document.getElementById("restaurant").innerHTML = results[index].name;
        //TODO: make new page or have new section that shows name, address, other info...
    }
}

/* JQuery */
$(document).ready(function () {
    $("button").click(function () {
        //takes value of button/selection, null if default
        //makes sure it's not the submit button
        if (!$(this).hasClass("submit")) {
            category = $(this).val();
            //alert("" + category);
        }
    });
});