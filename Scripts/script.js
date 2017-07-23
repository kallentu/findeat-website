var service;
var latitude, longitude, position;
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
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    initPlaces();
}

// user-inputted distance level
function setDistance() {
    //gets input from input slider
    distance = document.getElementById("MainContent_distance").value;
}

//initialize Google Places API by sending request for search
function initPlaces() {
    //initialize user's latitude and longitude for usage
    var userLocation = { lat: latitude, lng: longitude };

    setDistance();

    //customize restaurant request, radius is in meters - taken from slider
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
        document.getElementById("address").innerHTML = results[index].vicinity;

        try {
            //request for Place Details, more information + photos
            var request = {
                placeId: results[index].place_id
            };

            service.getDetails(request, function (place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    // adds 3 photos with styling in html
                    document.getElementById("picture").innerHTML = '<img style="height: 400px; width: 400px; overflow: hidden; float: left; margin-left: 200px; margin-right: -220px;" src="' + place.photos[0].getUrl({ 'maxWidth': 1500, 'maxHeight': 1500 }) + '" />';
                    document.getElementById("picture2").innerHTML = '<img style="height: 180px; width: 180px; overflow: hidden; margin-bottom: 20px;" src="' + place.photos[1].getUrl({ 'maxWidth': 800, 'maxHeight': 800 }) + '" />';
                    document.getElementById("picture3").innerHTML = '<img style="height: 180px; width: 180px; overflow: hidden; margin-top: 20px;" src="' + place.photos[2].getUrl({ 'maxWidth': 800, 'maxHeight': 800 }) + '" />';
                }
            });
        }
        catch (error) {
            //otherwise removes photos and leaves information
            document.getElementById("picture").innerHTML = " ";
        }
        
    }
}

/* JQuery */
$(document).ready(function () {

    //initialize with default button
    $("#default").css("background-color", "#A9B7CA");
    $("#default").css("color", "white");

    $(".btn").click(function () {
        //takes value of button/selection, null if default
        //makes sure it's not the submit button
        if (!$(this).hasClass("submit")) {
            //inactivates all buttons besides the one chosen
            $(".btn").css("background-color", "").css("color", "#545B6D");
            $(this).css("background-color", "#A9B7CA").css("color", "white");
            category = $(this).val();
        }
    });
});