var service;
var latitude, longitude, position;
var distance, category = null;

//updates and displays distance the user is choosing
function updateDistance(value) {
    document.getElementById("distanceDisplay").innerHTML = (value / 1000).toFixed(1) + "km";
}

//grabs location of user
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

//setting location based on coordinates
function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    initPlaces();
}

//initialize Google Places API by sending request for search
function initPlaces() {
    //initialize user's latitude and longitude for usage
    var userLocation = { lat: latitude, lng: longitude };

    //gets input from input slider
    distance = document.getElementById("MainContent_distance").value;

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

//shows chosen place name and address, calls for more details and inputs information into hiddenfields
function displayResult(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        //random int between 0 and however many restaurants were found
        var index = Math.round(Math.random() * (results.length - 1));
        
        //values for restaurant name and address
        document.getElementById("restaurant").innerHTML = results[index].name;
        document.getElementById("address").innerHTML = results[index].vicinity;

        //hidden, adds placeid to make available for database
        document.getElementById("MainContent_placeIDServer").value = results[index].place_id;
        document.getElementById("MainContent_nameServer").value = results[index].name;
        document.getElementById("MainContent_addressServer").value = results[index].vicinity;

        getDetails(results[index].place_id);
    }
}

//request for Place Details, more information + photos
function getDetails(id) {
    var request = {
        placeId: id
    };

    service.getDetails(request, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            //displays number, if none, removes previous number
            try {
                document.getElementById("phone").innerHTML = place.formatted_phone_number;
            }
            catch (error) {
                document.getElementById("phone").innerHTML = " ";
            }

            // adds 3 photos with styling in html
            try {
                document.getElementById("picture").innerHTML = '<img style="height: 400px; width: 400px; overflow: hidden; float: left; margin-left: 240px; margin-right: -200px;" src="' + place.photos[0].getUrl({ 'maxWidth': 1500, 'maxHeight': 1500 }) + '" />';
                document.getElementById("picture2").innerHTML = '<img style="height: 180px; width: 180px; overflow: hidden; margin-bottom: 20px;" src="' + place.photos[1].getUrl({ 'maxWidth': 800, 'maxHeight': 800 }) + '" />';
                document.getElementById("picture3").innerHTML = '<img style="height: 180px; width: 180px; overflow: hidden; margin-top: 20px;" src="' + place.photos[2].getUrl({ 'maxWidth': 800, 'maxHeight': 800 }) + '" />';
            }
            catch (error) {
                //otherwise removes photos and leaves information
                document.getElementById("picture").innerHTML = " ";
            }
                
            //adds hours, if unavailable, leave empty
            try {
                document.getElementById("hours").innerHTML = place.opening_hours.weekday_text[0] + "</br>" + 
                                                             place.opening_hours.weekday_text[1] + "</br>" +
                                                             place.opening_hours.weekday_text[2] + "</br>" +
                                                             place.opening_hours.weekday_text[3] + "</br>" +
                                                             place.opening_hours.weekday_text[4] + "</br>" +
                                                             place.opening_hours.weekday_text[5] + "</br>" +
                                                             place.opening_hours.weekday_text[6];
            }
            catch (error) {
                document.getElementById("hours").innerHTML = "Restaurant hours are currently unavailable.";
            }

            //restaurant rating if available
            try {
                document.getElementById("rating").innerHTML = "&#9733; " + place.rating + " / 5.0";
            }
            catch (error) {
                document.getElementById("rating").innerHTML = "Rating is currently unavailable.";
            }

            //directions button from current location
            document.getElementById("directions").innerHTML = '<a href="https://maps.google.com?saddr=Current+Location&daddr=' + place.geometry.location + '" class="btn submit" target="_blank">directions to ' + place.name.toLowerCase() + '</a>';

            //displays whether restaurant is open or closed at the moment
            document.getElementById("open").innerHTML = place.opening_hours.open_now ? "Open Now" : "Closed Now";
        }
    });
}

/* JQuery */
$(document).ready(function () {

    ////initialize with default button
    $("#default").css("background-color", "#A9B7CA");
    $("#default").css("color", "white");

    //hides the save button initially
    $("#hide").hide();

    //change selection user chooses
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
    
    //scroll down to restaurant information
    $(".scroll").click(function () {
        //removes initialized space by info
        $(".info").css("margin-bottom", "0");

        //delay for picture load
        //TODO: maybe find more intuitive way to delay the scroll?
        $("html, body").delay(1500).animate({
            scrollTop: $("#restaurant").offset().top - 60
        }, 800);

        //shows the save button
        $("#hide").show();
    });

    //Favorites page
    //opens panel drawer
    //TODO: use toggleActive instead and create active css
    $(".panel-heading").click(function (e) {
        e.preventDefault();
        $(this).parent("div.panel").css("max-height", "3000px");
    });
});
