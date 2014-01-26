'use strict';
var Joi = require('joi'),
		S = Joi.Types.String,
		logger = require('./logger');

var validate = function (date, method) {
	var isValid = false;
	var validationObj = {
		date: S().required().regex(/^[0-9]{8}$/)
	};
	var err = Joi.validate({
		date: date
	}, validationObj);

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
};

module.exports = validate;