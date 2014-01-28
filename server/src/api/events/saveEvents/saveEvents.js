'use strict';

var deferred = require('q').defer(),
		db = require('../../../util/mongo/dbConnect'),
		DbUtils = require('../../../util/mongo/dbUtils'),
		validateApiDate = require('../../../util/validateApiRequestParams').apiDate;

var saveEvents = function (date, events) {
	var method = 'saveEvents',
			apiDateValidationObj = validateApiDate(date, method);

	if (apiDateValidationObj.isValid) {
		var logInfo = {method: method, msg: 'Saving Events for ' + date},
				dbUtil = new DbUtils(deferred, logInfo);
	
		db.events.save({
			_id: date,
			events: events
		}, dbUtil.callback.bind(dbUtil));
	}
	else {
		deferred.reject(new Error(apiDateValidationObj.err.message));
	}
	return deferred.promise;
};

module.exports = saveEvents;