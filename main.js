const express = require('express');
const app = express();
const port = 8000;
const jsonFile = require('./events.json');
const pageNotFound = '<p>Page not found(</p>';


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// Send current server uptime
app.get('/status', (req, res) => res.send(getServerUptime()));
app.post('/status', (req, res) => res.send(getServerUptime()));

// Send json events
app.get('/api/events', validateType, typesResponse);
app.post('/api/events', validateType, typesResponse);

// Route other addresses to error page
app.get('*', (req, res) => res.status(404).send(pageNotFound));
app.post('*', (req, res) => res.status(404).send(pageNotFound));

// Make a middleware to handle errors
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send(err);
});

function validateType(req, res, next) {
	const request = req.query || req.body;
		
	if (request.type) {
		const requestedTypes = request.type.split(':');
		const existingTypes = getEventsByType(jsonFile);
		requestedTypes.forEach(type => {

			if (!existingTypes.has(type)) {
				res.status(400).send('Incorrect type');
				return next('Incorrect type caught in middleware: ' + type);
			}
		});
	}
	next();
}

// Make a response
function typesResponse(req, res) {
	let response = jsonFile;
	const request = req.query || req.body;

	if (request.type) {
		const requestedTypes = request.type.split(':');
		const filteredEvents = jsonFile.events.filter(e => requestedTypes.includes(e.type));
		response = { events: [...filteredEvents] };
	}

	res.send(response);
}

// Count time from server start
function getServerUptime() {
	const secs = Math.floor(process.uptime());
	const date = new Date(null);
	date.setSeconds(secs);
	return date.toISOString().substr(11, 8);
}

// Get type of events
function getEventsByType(jsonFile) {
	return new Set(jsonFile.events.map(ev => ev.type));

}
