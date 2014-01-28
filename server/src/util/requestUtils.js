'use strict';
var logger = require('./logger');

var RequestCb = function (deferred, logInfo) {
	this.deferred = deferred;
	this.logInfo = logInfo;
};

RequestCb.prototype.callback = function (err, response, body) {
	if (err || response.statusCode !== 200) {
		err = (err) ? err : response.statusCode;
		logger.log('error', 'XMLStats API call for **' + this.logInfo.msg + '** returned error: ' +
			err, {
			tags: ['nba_error', 'xmlstats_error'],
			method: this.logInfo.method,
			timestamp: new Date()
		});
		this.deferred.reject(new Error(err));
	}
	if (!err && response.statusCode === 200) {
		logger.log('info', 'XMLStats API call for **' + this.logInfo.msg + '** returned success', {
			tags: ['nba_info', 'xmlstats_info'],
			method: this.logInfo.method,
			timestamp: new Date()
		});
		this.deferred.resolve(JSON.parse(body));
	}
};

module.exports = RequestCb;