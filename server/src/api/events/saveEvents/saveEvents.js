'use strict';

var deferred = require('q').defer(),
		db = require('../../../util/mongo/dbConnect'),
		dbUtils = require('../../../util/mongo/dbUtils'),
		validateApiDate = require('../../../util/validateApiDate');

var saveEvents = function (date, events) {
	var method = 'saveEvents',
			apiDateValidationObj = validateApiDate(date, method),
			saveCb = dbUtils.saveCb;

	dbUtils.deferred = deferred;
	dbUtils.logInfo.msg = 'Events';
	dbUtils.logInfo.method = method;
	if (apiDateValidationObj.isValid) {
		db.events.save({
			_id: date,
			events: events
		}, saveCb);
	}
	else {
		deferred.reject(new Error(apiDateValidationObj.err.message));
	}
	return deferred.promise;
};

module.exports = saveEvents;