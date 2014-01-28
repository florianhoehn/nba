'use strict';
var Hapi = require('hapi'),
		getEvents = require('./getEvents');

var getEventsHandler = function (request, reply) {
	getEvents('20140127').then(function (events) {
		if (events) {
			reply({events: events[0].events});
		}
		else {
			reply(Hapi.error.notFound('Events are not available...'));
		}
	}, function (err) {
		reply(Hapi.error.notFound('Events are not available...'));
	});
};

module.exports = getEventsHandler;