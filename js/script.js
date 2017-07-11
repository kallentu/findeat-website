// find location of user
function getLocation() {
    if (navigator.geolocation) {
        //getCurrentPosition() method is successful, it returns a coordinates object to the 
        //function specified in the parameter (showPosition)
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        document.getElementById("coordinates").innerHTML = "can't find you where are you";
    }
}

function showPosition(position) {
    document.getElementById("coordinates").innerHTML = "latitude: " + position.coords.latitude +
        "<br>longitude: " + position.coords.longitude;
}
