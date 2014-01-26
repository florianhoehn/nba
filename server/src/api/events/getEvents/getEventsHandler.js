'use strict';
var Hapi = require('hapi'),
		getEvents = require('./getEvents');

var getEventsHandler = function (request, reply) {
	getEvents('20140125').then(function (events) {
		reply({events: events[0].events});
	}, function (err) {
		reply(Hapi.error.notFound('Events are not available...'));
	});
};

module.exports = getEventsHandler;