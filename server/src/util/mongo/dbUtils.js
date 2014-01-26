'use strict';
var logger = require('../logger');

var dbUtils = {
	deferred: {},
	logInfo: {
		msg: '',
		method: ''
	},
	saveCb: function (err, result) {
		var logDetails = dbUtils.logInfo;
		if (err) {
			logger.log('error', 'Saving ' + logDetails.msg + ' in MongoDB failed with error: ' + err, {
				tags: ['nba_error', 'mongo_error'],
				method: logDetails.method,
				timestamp: new Date()
			});
			dbUtils.deferred.reject(new Error(err));
		}
		else {
			logger.log('info', logDetails.msg + ' saved in MongoDB successfully', {
				tags: ['nba_info', 'mongo_info'],
				method: logDetails.method,
				timestamp: new Date()
			});
			dbUtils.deferred.resolve(result);
		}
		return dbUtils.deferred.promise;
	},
	dbCb: function (err, result) {
		var logDetails = dbUtils.logInfo;
		if (err) {
			logger.log('error', logDetails.msg + ' MongoDB failed with error: ' + err, {
				tags: ['nba_error', 'mongo_error'],
				method: logDetails.method,
				timestamp: new Date()
			});
			dbUtils.deferred.reject(new Error(err));
		}
		else {
			logger.log('info', logDetails.msg + ' MongoDB succeeded', {
				tags: ['nba_info', 'mongo_info'],
				method: logDetails.method,
				timestamp: new Date()
			});
			dbUtils.deferred.resolve(result);
		}
		return dbUtils.deferred.promise;
	}
};

module.exports = dbUtils;