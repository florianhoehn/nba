'use strict';

var deferred = require('q').defer(),
		db = require('../../../util/mongo/dbConnect'),
		DbUtils = require('../../../util/mongo/dbUtils'),
		validateApiDate = require('../../../util/validateApiRequestParams').apiDate;

var getEvents = function (date) {
	var method = 'getEvents',
			apiDateValidationObj = validateApiDate(date, method);

	if (apiDateValidationObj.isValid) {
		var logInfo = {method: method, msg: 'Find Events for ' + date},
				dbUtil = new DbUtils(deferred, logInfo);

		db.events.find({
			_id: date
		}, dbUtil.callback.bind(dbUtil));
	}
	else {
		deferred.reject(new Error(apiDateValidationObj.err.message));
	}
	return deferred.promise;
};

module.exports = getEvents;