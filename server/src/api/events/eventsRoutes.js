'use strict';
var getEventsHandler = require('./getEvents/getEventsHandler');

var getEventsRoute = {
	method: 'GET',
	path: '/api/v1/events',
	config: {
		handler: getEventsHandler
	}
};

module.exports = [getEventsRoute];