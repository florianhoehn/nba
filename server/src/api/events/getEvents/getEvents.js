'use strict';

var deferred = require('q').defer(),
		db = require('../../../util/mongo/dbConnect'),
		dbUtils = require('../../../util/mongo/dbUtils'),
		logger = require('../../../util/logger'),
		validateApiDate = require('../../../util/validateApiDate');

var getEvents = function (date) {
	var method = 'getEvents',
			apiDateValidationObj = validateApiDate(date, method),
			findCb = dbUtils.dbCb;

	dbUtils.deferred = deferred;
	dbUtils.logInfo.msg = 'Finding Events from';
	dbUtils.logInfo.method = method;
	if (apiDateValidationObj.isValid) {
		db.events.find({
			_id: date
		}, findCb);
	}
	else {
		deferred.reject(new Error(apiDateValidationObj.err.message));
	}
	return deferred.promise;
};

module.exports = getEvents;