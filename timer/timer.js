let seconds = 0;
let minutes;
let color, style;
let status = 'stopped';

let first = true;

window.onload = function() {
	var params = getParams(window.location.href);

	minutes = params.minutes === undefined ? 5 : Number(params.minutes);
	color = params.color === undefined ? 'red' : params.color;
	animation = params.style === undefined ? 0 : Number(params.animation);

	document.documentElement.style.setProperty('--color', color);
	document.documentElement.style.setProperty('--animation', `visual-${animation}`);
	document.documentElement.style.setProperty('--seconds', `${minutes * 60}s`);

	displayTime();
	minutes--;
};

function stopWatch() {
	if (first) {
		seconds = 60;
		first = false;
	}
	seconds--;

	if (seconds % 60 === 0) {
		seconds = 60;
		minutes--;
	}

	if (minutes === 0 && seconds === 0) {
	}

	displayTime();
}

function displayTime() {
	if (seconds < 10) {
		displaySeconds = '0' + seconds;
	} else {
		displaySeconds = seconds;
	}

	if (minutes < 10) {
		displayMinutes = '0' + minutes;
	} else {
		displayMinutes = minutes;
	}

	document.getElementById('display').innerHTML = displayMinutes + ':' + displaySeconds;
}

//Function that swaps "Start" and "Stop" on button depending on status of timer and sets timer speed
function startStop() {
	if (status === 'stopped') {
		//start the stopwatch by calling the setInterval() function
		interval = window.setInterval(stopWatch, 1000);
		status = 'started';
	} else {
		window.clearInterval(interval);
		status = 'stopped';
	}
	document.documentElement.className = status;
}

var getParams = function(url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};
