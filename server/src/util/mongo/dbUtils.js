'use strict';
var logger = require('../logger');

var DbUtils = function (deferred, logInfo) {
	this.deferred = deferred;
	this.logInfo = logInfo;
};

DbUtils.prototype.callback = function (err, result) {
	if (err) {
		logger.log('error', 'MongoDB: ' + this.logInfo.msg + ' failed with error: ' + err, {
			tags: ['nba_error', 'mongo_error'],
			method: this.logInfo.method,
			timestamp: new Date()
		});
		this.deferred.reject(new Error(err));
	}
	else {
		logger.log('info', 'MongoDB: ' + this.logInfo.msg + ' succeeded', {
			tags: ['nba_info', 'mongo_info'],
			method: this.logInfo.method,
			timestamp: new Date()
		});
		this.deferred.resolve(result);
	}
	return this.deferred.promise;
};

module.exports = DbUtils;