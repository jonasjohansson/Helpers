var settings = {};

/*
	https://seesparkbox.com/foundry/how_to_code_an_SVG_pie_chart
	https://apps.apple.com/se/app/time-timer/id332520417
*/

window.onload = function() {
	var params = getParams(window.location.href);
	settings.minutes = params.minutes === undefined ? 20 : Number(params.minutes);
	settings.color = params.color === undefined ? 'red' : params.color;
	settings.steps = params.steps === undefined ? 5 : Number(params.steps);
	settings.smallSteps = params.smallSteps === undefined ? 5 : Number(params.smallSteps);
	createTimer();
	var bg = document.querySelector('#bg');
	bg.style.fill = settings.color;
	var fg = document.querySelector('#fg');
	var id = setInterval(frame, ((settings.minutes * 60) / 942) * 100);
	var i = 0;

	document.documentElement.addEventListener('click', function() {
		document.documentElement.classList.toggle('running');
	});
	function frame() {
		if (document.documentElement.classList.contains('running')) {
			i = i + 0.1;
			fg.style.strokeDasharray = `${i} 942`;
		}
	}
};

var createTimer = function() {
	var marks = document.querySelector('#marks');
	var labels = document.querySelector('#labels');

	var timePerStep = settings.minutes / settings.steps;
	var degreesPerStep = 360 / settings.steps;

	for (var i = 0; i < settings.steps; i++) {
		let degreesLarge = degreesPerStep * i;

		// create large line
		let lineLarge = createLine(150, 200, 0, 0);
		lineLarge.classList.add('large');
		lineLarge.style.transform = `rotate(-${degreesLarge}deg)`;

		// create small line
		for (var j = 0; j < settings.smallSteps; j++) {
			let degreesSmall = degreesLarge + (degreesPerStep / (settings.smallSteps + 1)) * j + degreesPerStep / (settings.smallSteps + 1);

			let lineSmall = createLine(150, 170, 0, 0);
			lineSmall.classList.add('small');
			lineSmall.style.transform = `rotate(${degreesSmall}deg)`;

			marks.appendChild(lineSmall);
		}

		// create label
		let sin = Math.sin(degreesLarge) * -20;
		let label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		label.style.transform = `rotate(${degreesLarge}deg) translate(${220 + sin}px) rotate(${-degreesLarge + 90}deg)`;
		label.className = 'label';
		let number;
		if (i !== 0) {
			number = (settings.steps - i) * timePerStep;
		} else {
			number = i * timePerStep;
		}
		if (settings.minutes <= 3) {
			number *= 60;
		}
		label.innerHTML = number;

		labels.appendChild(label);
		marks.appendChild(lineLarge);
	}
};

var createLine = function(x1, x2, y1, y2) {
	var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	line.setAttribute('x1', x1);
	line.setAttribute('y1', y1);
	line.setAttribute('x2', x2);
	line.setAttribute('y2', y2);
	return line;
};

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
