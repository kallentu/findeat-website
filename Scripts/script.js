var category = null;

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
        document.getElementsByClassName("restaurant")[0].innerHTML = "sorry, could not find your location.";
    }
}

//setting location based on coordinates
function setPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    initPlaces(lat, long);
}

//TODO: if category and radius do not change, use next page if there is one
//initialize Google Places API by sending request for search
function initPlaces(latitude, longitude) {
    //initialize user's latitude and longitude for usage
    var userLocation = { lat: latitude, lng: longitude };

    //gets input from input slider
    var distance = document.getElementById("MainContent_distance").value;

    //customize restaurant request, radius is in meters - taken from slider
    var request = {
        location: userLocation,
        radius: distance,
        type: ["restaurant"],
        keyword: category
    };

    var service = new google.maps.places.PlacesService(document.createElement("div"));
    service.nearbySearch(request, storeRandomResults);
}

//random restaurant selection and inputs information into hiddenfields
function storeRandomResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        //random int between 0 and however many restaurants were found
        var index = Math.round(Math.random() * (results.length - 1));
        
        //hidden, adds placeid to make available for database
        document.getElementById("MainContent_placeIDServer").value = results[index].place_id;
        document.getElementById("MainContent_nameServer").value = results[index].name;

        displayDetails(results[index].place_id);
    }
}

//request for Place Details, more information + photos
function displayDetails(id, index) {
    //if index is given, it's used
    index = (index == null) ? 0 : index;

    var request = {
        placeId: id
    };

    //new service, if one isn't already created
    var service = new google.maps.places.PlacesService(document.createElement("div"));

    service.getDetails(request, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            //displays essential information
            document.getElementsByClassName("address")[index].innerHTML = place.formatted_address;

            try {
                document.getElementsByClassName("restaurant")[index].innerHTML = place.name;
            }
            catch(error){}

            try {
                document.getElementsByClassName("phone")[index].innerHTML = place.formatted_phone_number;
            }
            catch (error) {
                document.getElementsByClassName("phone")[index].innerHTML = "Phone numbers are currently unavailable. ";
            }

            try {
                document.getElementsByClassName("picture")[index].innerHTML = "<img style='height: 400px; width: 400px; overflow: hidden; float: left; margin-left: 240px; margin-right: -200px;' src='" + place.photos[0].getUrl({ "maxWidth": 1500, "maxHeight": 1500 }) + "' />";
                document.getElementsByClassName("picture2")[index].innerHTML = "<img style='height: 180px; width: 180px; overflow: hidden; margin-bottom: 20px;' src='" + place.photos[1].getUrl({ "maxWidth": 800, "maxHeight": 800 }) + "' />";
                document.getElementsByClassName("picture3")[index].innerHTML = "<img style='height: 180px; width: 180px; overflow: hidden; margin-top: 20px;' src='" + place.photos[2].getUrl({ "maxWidth": 800, "maxHeight": 800 }) + "' />";
            }
            catch (error) {
                document.getElementsByClassName("picture")[index].innerHTML = "Pictures are currently unavailable. ";
            }
                
            try {
                document.getElementsByClassName("hours")[index].innerHTML = place.opening_hours.weekday_text[0] + "</br>" +
                                                             place.opening_hours.weekday_text[1] + "</br>" +
                                                             place.opening_hours.weekday_text[2] + "</br>" +
                                                             place.opening_hours.weekday_text[3] + "</br>" +
                                                             place.opening_hours.weekday_text[4] + "</br>" +
                                                             place.opening_hours.weekday_text[5] + "</br>" +
                                                             place.opening_hours.weekday_text[6];
            }
            catch (error) {
                document.getElementsByClassName("hours")[index].innerHTML = "Restaurant hours are currently unavailable.";
            }

            try {
                document.getElementsByClassName("rating")[index].innerHTML = "&#9733; " + place.rating + " / 5.0";
            }
            catch (error) {
                document.getElementsByClassName("rating")[index].innerHTML = "Rating is currently unavailable.";
            }

            document.getElementsByClassName("directions")[index].innerHTML = "<a href='https://maps.google.com?saddr=Current+Location&daddr=" + place.geometry.location + "' class='btn submit' target='_blank'><span class='glyphicon glyphicon-globe glyphicon-align-left'></span>&nbsp;&nbsp;directions to " + place.name.toLowerCase() + "</a>";

            document.getElementsByClassName("open")[index].innerHTML = place.opening_hours.open_now ? "Open Now" : "Closed Now";
        }
    });
}

/* JQuery */
$(document).ready(function () {

    //initialize with default button
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
        $("html, body").delay(1500).animate({
            scrollTop: $(".restaurant").offset().top - 60
        }, 800);

        //shows the save button
        $("#hide").show();
    });

    //Favorites page
    //opens panel drawer
    $(".panel-heading").on("click", function (e) {
        e.preventDefault();

        //toggles between open or not
        $(this).parent("div.panel").toggleClass("active");

        if ($(this).parent("div.panel").hasClass("active")) {
            $(this).parent("div.panel").animate({ maxHeight: "3000px" }, 1250);
            $(this).children("i.fa").toggleClass("fa-angle-down fa-angle-up");
        }
        else {
            $(this).parent("div.panel").animate({ maxHeight: "80px" }, 1250);
            $(this).children("i.fa").toggleClass("fa-angle-up fa-angle-down");
        }
    });
});
