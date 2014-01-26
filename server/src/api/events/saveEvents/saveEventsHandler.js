'use strict';

var Joi = require('joi'),
		S = Joi.Types.String(),
		events = require('../xmlstats/events'),
		saveEvents = require('./saveEvents'),
		config = require('../../../../config'),
		formatDate = require('../../../util/dateFormat');

var saveHandler = function (date) {
	date =  formatDate(date);
	if (date) {
		// var time = function() {
		events(date)
		.then(function (events) {
			var event = events.event;
			var isCompleted = true;
			for (var i in events.event) {
				if (event[i].event_status !== 'completed') {
					isCompleted = false;
				}
			}
			if (isCompleted) {
				return saveEvents(date, event);
			}
			else {
				return 'NOT YET COMPLETE';
			}
		})
		.then(function (result) {
			//console.log('Final Result: ', result);
		}, function (error) {
			//console.log('Error: ', error);
		});
		//var timer = setInterval(time, 3600000);
		//setInterval(time, 3600000);
	}
	
};

saveHandler('2014-01-23');

//module.exports = saveHandler;