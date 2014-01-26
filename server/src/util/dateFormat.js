'use strict';
var logger = require('./logger'),
		Joi = require('joi'),
		S =  Joi.Types.String;

var formatDate = function (date) {
	var validationObj = {
		date: Joi.date().required()
	};
	var err = Joi.validate({
		date: date
	}, validationObj);

	if (err) {
		logger.log('error', 'Error: ' + err.message, {
			tags: ['nba_error'],
			method: 'dateFormat',
			timestamp: new Date()
		});
		return false;
	}
	else {
		var initDate = new Date(date);
		if (initDate.toString() === 'Invalid Date') {
			logger.log('error', 'Error: Invalid Date', {
				tags: ['nba_error'],
				method: 'dateFormat',
				timestamp: new Date()
			});
			return false;
		}
		else {
			logger.log('info', 'Formatting date to YYYYMMDD format', {
				tags: ['nba_info'],
				method: 'dateFormat',
				timestamp: new Date()
			});
			var years = initDate.getFullYear();
			var months = ('0' + (initDate.getMonth() + 1)).slice(-2);
			var dates = ('0' + initDate.getDate()).slice(-2);
			var formattedDate = years + '' + months + '' + dates;
			return formattedDate;
		}
	}
};

module.exports = formatDate;