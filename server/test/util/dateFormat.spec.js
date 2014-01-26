'use strict';

var rewire = require('rewire'),
		sinon = require('sinon'),
		dateFormat = rewire('../../src/util/dateFormat'),
		logger = dateFormat.__get__('logger');

describe('Format Date Utility', function () {
	var logStub;
	var method = 'dateFormat';

	function checkLogStub(stub, type, msg, tags) {
		expect(stub.called).toBe(true);
		expect(stub.lastCall.args[0]).toEqual(type);
		expect(stub.lastCall.args[1]).toEqual(msg);
		expect(stub.lastCall.args[2].tags).toEqual(tags);
		expect(stub.lastCall.args[2].method).toEqual(method);
		expect(stub.lastCall.args[2].timestamp).toBeDefined();
	}

	beforeEach(function () {
		logStub = sinon.stub(logger, 'log');
	});

	afterEach(function () {
		logStub.restore();
	});


	it('should return an error if date argument is not passed', function () {
		expect(dateFormat()).toEqual(false);
		checkLogStub(logStub, 'error', 'Error: the value of date is not allowed to be undefined', ['nba_error']);
	});

	it('should return an error if date argument is not date or integer (msec)', function () {
		expect(dateFormat({a: 'a'})).toEqual(false);
		expect(dateFormat(['a', 'b'])).toEqual(false);
		expect(dateFormat(function () {})).toEqual(false);
		expect(dateFormat('wwqqee')).toEqual(false);
		checkLogStub(logStub, 'error', 'Error: the value of date must be a number of milliseconds or valid date string',
			['nba_error']);
	});

	it('should return the date in the YYYYMMDD format', function () {
		expect(dateFormat('2013-12-24')).toEqual('20131224');
		expect(dateFormat('2013/12/24')).toEqual('20131224');
		expect(dateFormat('2014/01/12')).toEqual('20140112');
		expect(dateFormat('2014/01/01')).toEqual('20140101');
		checkLogStub(logStub, 'info', 'Formatting date to YYYYMMDD format', ['nba_info']);
	});

});