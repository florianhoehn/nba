'use strict';

var req = require('request'),
		deferred = require('q').defer(),
		validateApiGameId = require('../../../util/validateApiRequestParams').apiGameId,
		RequestCb = require('../../../util/requestUtils'),
		config = require('../../../../config');

var boxscoreFromApi = function (gameId) {
	var method = 'boxscoreFromApi',
			apiGameIdValidationObj = validateApiGameId(gameId, method);

	if (apiGameIdValidationObj.isValid) {
		var headers = config.xmlstats.headers,
				logInfo = {method: method, msg: 'BoxScore'},
				getBoxscore = new RequestCb(deferred, logInfo);

		req.get({
			url: config.xmlstats.boxscore(gameId),
			headers: headers
		}, getBoxscore.callback.bind(getBoxscore));
	}
	else {
		deferred.reject(new Error(apiGameIdValidationObj.err.message));
	}
	return deferred.promise;
};

module.exports = boxscoreFromApi;