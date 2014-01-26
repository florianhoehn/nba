'use strict';

var req = require('request'),
		deferred = require('q').defer(),
		validateApiDate = require('../../../util/validateApiDate'),
		logger = require('../../../util/logger'),
		config = require('../../../../config');

var eventsFromApi = function (date) {
	var method = 'eventsFromApi',
			apiDateValidationObj = validateApiDate(date, method);

	if (apiDateValidationObj.isValid) {
		var headers = config.xmlstats.headers;
		logger.log('info', 'Calling **Events** API from XMLStats for ' + date, {
			tags: ['nba_info', 'xmlstats_info'],
			method: method,
			timestamp: new Date()
		});
		/*
		TODO: probably needs to be separated to some kind of API call util
		*/
		var getEventsCb = function (err, response, body) {
			if (err || response.statusCode !== 200) {
				err = (err) ? err : response.statusCode;
				logger.log('error', 'XMLStats API call for **Events** returned error: ' + err, {
					tags: ['nba_error', 'xmlstats_error'],
					method: method,
					timestamp: new Date()
				});
				deferred.reject(new Error(err));
			}
			if (!err && response.statusCode === 200) {
				logger.log('info', 'XMLStats API call for **Events** returned success', {
					tags: ['nba_info', 'xmlstats_info'],
					method: method,
					timestamp: new Date()
				});
				deferred.resolve(JSON.parse(body));
			}
		};
		req.get({
			url: config.xmlstats.events(date),
			headers: headers
		}, getEventsCb);
		
	}
	else {
		deferred.reject(new Error(apiDateValidationObj.err.message));
	}
	return deferred.promise;
};

module.exports = eventsFromApi;