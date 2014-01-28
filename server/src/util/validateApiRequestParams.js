'use strict';
var Joi = require('joi'),
		S = Joi.Types.String,
		logger = require('./logger');

var validate = {
	apiDate: function (date, method) {
		var validationObj = {
			date: S().required().regex(/^[0-9]{8}$/)
		},
		err = Joi.validate({
			date: date
		}, validationObj);
		return validate._validationHandler(err, method);
	},
	apiGameId: function (gameId, method) {
		var validationObj = {
			gameId: S().required().regex(/^[0-9]{8}(-[a-z]+)+$/)
		},
		err = Joi.validate({
			gameId: gameId
		}, validationObj);

		return validate._validationHandler(err, method);
	},
	_validationHandler: function (err, method) {
		var isValid = false;
		if (err) {
			logger.log('error', 'Error: ' + err.message, {
				tags: ['nba_error'],
				method: method,
				timestamp: new Date()
			});
		}
		else {
			isValid = true;
		}
		return {
			isValid: isValid,
			err: err
		};
	}
};

module.exports = validate;