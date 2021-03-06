var formatNumToDecimal = function (input) {
	return parseFloat(Math.round(input * 100) / 100).toFixed(2);
}

var timeToArr = function (d) {
	return [d.getHours(), d.getMinutes()];
}

var calcTargetTZ = function (userDate, userTZ) {
	var target = 17; //we're looking for 5pm
	var offset = target - parseInt(userDate[0]); //userDate[0] is the hour part
	return parseInt(userTZ) + offset;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function pickCheers(country) {
	var result;
	// Find out which language we want to use
	var language = countrytolang[country];
	// Check to make sure we have an actionable result
	if (typeof language == 'undefined' || typeof cheersdata[language.trim()] == "undefined") {
		language = pickRandomProperty(cheersdata).trim();
	} else {
		language = language.trim();
	}

	// Add language for rendering
	var cheers = cheersdata[language];
	cheers.unshift(language);
	// Return the resulting cheers
	return cheers;
}

$(document).ready( function () {
	var timeNow = new Date();
	// var timeNow = new Date(2013,2,1,9,10);
	var currentTimeZoneOffsetInHours = timeNow.getTimezoneOffset() / -60; //negative sign so we get the right offset.
	var userTZ = formatNumToDecimal(currentTimeZoneOffsetInHours);
	var userTime = timeToArr(timeNow);
	var targetTZ = formatNumToDecimal(calcTargetTZ(userTime, userTZ));
	var countries;
	var country;
	if (-12 <= currentTimeZoneOffsetInHours || currentTimeZoneOffsetInHours <= -1) {
		userTZ = userTZ.replace("-","");
		userTZ = "-0" + userTZ;
	} else if (0 <= currentTimeZoneOffsetInHours || currentTimeZoneOffsetInHours <= 9) {
		userTZ = "0" + userTZ;
	}
	countries = timezones[targetTZ];
	country = countries[getRandomInt(0,countries.length-1)].trim();
	$('#five-pm').html('<a href="https://www.google.com/maps/preview#!q=' + country + '">' + country +'</a>');

	var cheers = pickCheers(country);
	var cheersString = $('<div id="saycheers">');
	cheersString.append('<h3>' + cheers[0] + ":" + '</h3>');
	cheersString.append('<p><h4>' + cheers[1] + '!</h4></p>');
	cheersString.append('<p><h4>(' + cheers[2] + ')</h4></p>');

	$('#cheers').append(cheersString);

});
