'use strict';

var Hapi = require('hapi'),
		config = require('./config'),
		indexRoutes = require('./src/api/index/indexRoutes'),
		eventsRoutes = require('./src/api/events/eventsRoutes');

var options = {
	cors: true,
	cache: {
		engine: 'redis',
		partition: 'cm'
	}
};

var server = Hapi.createServer('0.0.0.0', config.port, options);


server.route(indexRoutes);
server.route(eventsRoutes);

server.start();
console.log('Hapi server running in port ' + config.port);

module.exports = server;