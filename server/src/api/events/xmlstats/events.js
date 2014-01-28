'use strict';

var req = require('request'),
		deferred = require('q').defer(),
		validateApiDate = require('../../../util/validateApiRequestParams').apiDate,
		RequestCb = require('../../../util/requestUtils'),
		config = require('../../../../config');

var eventsFromApi = function (date) {
	var method = 'eventsFromApi',
			apiDateValidationObj = validateApiDate(date, method);

	if (apiDateValidationObj.isValid) {
		var headers = config.xmlstats.headers,
				logInfo = {method: method, msg: 'Events'},
				getEvents = new RequestCb(deferred, logInfo);

		req.get({
			url: config.xmlstats.events(date),
			headers: headers
		}, getEvents.callback.bind(getEvents));
	}
	else {
		deferred.reject(new Error(apiDateValidationObj.err.message));
	}
	return deferred.promise;
};

module.exports = eventsFromApi;