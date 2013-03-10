var stopId = 51;
var stopId1 = 13782;
var stopId2 = 75;
if (window.location.hash != "" && window.location.hash != "#") {
    stopId = window.location.hash.substr(1);
}

var stopInfoURL = "http://proximobus.appspot.com/agencies/mit/stops/"+stopId+".js?callback=?";
var stopRoutesURL = "http://proximobus.appspot.com/agencies/mit/stops/"+stopId+"/routes.js?callback=?";
var stopMessagesURL = "http://proximobus.appspot.com/agencies/mit/stops/"+stopId+"/messages.js?callback=?";
var stopPredictionsURL = "http://proximobus.appspot.com/agencies/mit/stops/"+stopId+"/predictions.js?callback=?";

var routeNames = {}
var runNames = {}
var routeCount = 0;
var routesLoadedCount = 0;
var gotRouteNames = false;
var gotStopInfo = false;

function allReady() {
    return gotRouteNames && gotStopInfo && (routeCount == routesLoadedCount);
}

function poll() {
    $.getJSON(stopPredictionsURL, handlePredictions);
}

function startPolling() {
    if (allReady()) {
	poll();
    }
}

function routeRunsURL(routeId) {
    return "http://proximobus.appspot.com/agencies/mit/routes/"+routeId+"/runs.js?callback=?";
}

function handleRouteRunsList(data) {
    runs = data.items;
    for (var i = 0; i < runs.length; i++) {
	run = runs[i];
	runNames[run.id] = run.display_name;
    }
    routesLoadedCount++;
    startPolling();
}

function handleRoutesList(data) {
    routes = data.items;
    routeCount = routes.length;
    for (var i = 0; i < routes.length; i++) {
	route = routes[i];

	routeNames[route.id] = route.display_name;
	$.getJSON(routeRunsURL(route.id), handleRouteRunsList);
    }
    routeIds = routes.map(function (i) { return i.id }).sort();
    $("#routelist").html('');
    for (var i = 0; i < routeIds.length; i++) {
	var elem = $('<li></li>');
	$(elem).text(routeIds[i]);
	$("#routelist").append(elem);
    }

    gotRouteNames = true;
    startPolling();
}


function handleStopInfo(data) {
    $("#stopname").text(data["display_name"]);
    gotStopInfo = true;
    startPolling();
}

function handleMessagesList(data) {
    $("#messages").html('');
    messages = data.items;

    for (var i = 0; i < messages.length; i++) {
	var elem = $('<li></li>');
	$(elem).text(messages[i]);
	$("#messages").append(elem);
    }

    $("#messagescontainer").jCarouselLite(
	{
	    vertical: true,
	    visible: 1,
	    auto: messages.length > 1 ? 3000 : 0,
	    speed: 1000
	}
    );
}

function handlePredictions(data) {
    setTimeout(poll, 30000);

    $("#predictions").html('');

    predictions = data.items;

    if (predictions.length == 0) {
	$("#predictions").html('<li><div class="none">Try walking</div></li>');
	return;
    }

    for (var i = 0; i < 2; i++) {
	var elem = $('<li><div class="route"></div><div class="time"></div><div class="run"></div></li>');
	prediction = predictions[i];


	if (routeNames[prediction.route_id] == 'Ct1') {
		$(elem).find('.route').text('CT1 - Limited');
	}
	else if (routeNames[prediction.route_id] == 'Saferide Cambridge West') {
		$(elem).find('.route').text('Cambridge West');
	}
	else if (routeNames[prediction.route_id] == 'Saferide Cambridge All') {
		$(elem).find('.route').text('Cambridge All');
	}
	else if (routeNames[prediction.route_id] == 'Trader Joe\'s - Whole Foods') {
		$(elem).find('.route').text('Grocery Shuttle');
	}
	else {
	$(elem).find('.route').text(routeNames[prediction.route_id]);
	}

	if (runNames[prediction.run_id] == 'Dudley Station via Mass. Ave.') {
		$(elem).find('.run').text('Dudley Square');
	}
	else if (runNames[prediction.run_id] == 'West Campus') {
		$(elem).find('.run').text('toward Kendall Sq');
	}
	else if (runNames[prediction.run_id] == 'from Campus') {
		$(elem).find('.run').text('toward Central Sq');
	}
	else if (runNames[prediction.run_id] == 'to Campus') {
		$(elem).find('.run').text('toward Central Sq');
	}
	else if (runNames[prediction.run_id] == 'B.U. Medical Center (Limited Stops)') {
		$(elem).find('.run').text('toward BU Medical Ctr');
	}
	else if (runNames[prediction.run_id] == 'Harvard Station via Mass. Ave.') {
		$(elem).find('.run').text('toward Harvard Sq');
	}
	else if (runNames[prediction.run_id] == 'Central Square (Limited Stops)') {
		$(elem).find('.run').text('toward Central Sq');
	}
	else if (runNames[prediction.run_id] == 'To Trader Joe\'s') {
		$(elem).find('.run').text('toward Trader Joe\'s/Central Sq');
	}
	else if (runNames[prediction.run_id] == 'Inbound to North Point & Van Ness') {
		$(elem).find('.run').text('Pretend-destination');
	}
	else {
	$(elem).find('.run').text(runNames[prediction.run_id]);
	}


	var minutes = prediction.minutes;
	var timeCaption;
	if (minutes == 0) {
	    timeCaption = prediction.is_departing ? "Departing" : "Arriving";
	}
	else {
	    timeCaption = minutes+" min";
	}

	$(elem).find('.time').text(timeCaption);

	$("#predictions").append(elem);
    }

}

$(document).ready(function() {
    $.getJSON(stopInfoURL, handleStopInfo);
    $.getJSON(stopRoutesURL, handleRoutesList);
    $.getJSON(stopMessagesURL, handleMessagesList);
});


