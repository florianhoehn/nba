'use strict';

var sinon = require('sinon'),
		rewire = require('rewire'),
		events = rewire('../../../../src/api/events/xmlstats/events'),
		logger = events.__get__('logger'),
		deferred = events.__get__('deferred'),
		testHelpers = require('../../../helpers'),
		checkLogStub = testHelpers.checkLogStub,
		checkPromiseSpy = testHelpers.checkPromiseSpy;

describe('Get Events from XMLStats', function () {

	var logStub, method, deferredRejectSpy, deferredResolveSpy, reqStub, config;

	beforeEach(function () {
		testHelpers.method = 'eventsFromApi';
		logStub = sinon.stub(logger, 'log');
		reqStub = sinon.stub(events.__get__('req'), 'get');
		deferredRejectSpy = sinon.stub(deferred, 'reject');
		deferredResolveSpy = sinon.stub(deferred, 'resolve');
		config = {
			xmlstats: {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer testToken',
					'User-Agent': 'testUserAgent'
				},
				events: function () {
					return 'http://test.com/events.json';
				}
			}
		};
		events.__set__('config', config);
	});

	afterEach(function () {
		logStub.restore();
		reqStub.restore();
		deferredRejectSpy.restore();
		deferredResolveSpy.restore();
	});


	describe('\nInvalid Date Argument\n', function () {
		

		it('should log an error and reject the promise if date argument is not defined', function () {
			testHelpers.validateUndefinedDate(events, logStub, deferredRejectSpy);
		});

		it('should log an error if date argument is not a string', function () {
			testHelpers.validateStingDate(events, logStub, deferredRejectSpy);
		});

		it('should log an error if date is not of YYYYMMDD format', function () {
			testHelpers.validateCorrectFormat(events, logStub, deferredRejectSpy);
		});

	});

	describe('\nValid Date Argument\n', function () {

		it('should log that the events api is being called', function () {
			events('20131224');
			checkLogStub(logStub, 'info', 'Calling **Events** API from XMLStats for 20131224', ['nba_info', 'xmlstats_info']);
		});

		it('should log that it tries to make a call to events api', function () {
			events('20131224');
			expect(reqStub.called).toBe(true);
			expect(reqStub.callCount).toEqual(1);
		});

		it('should call the events API with the correct arguments', function () {
			events('20131224');
			expect(reqStub.lastCall.args[0].url).toEqual('http://test.com/events.json');
			expect(reqStub.lastCall.args[0].headers['Content-Type']).toEqual('application/json');
			expect(reqStub.lastCall.args[0].headers.Authorization).toEqual('Bearer testToken');
			expect(reqStub.lastCall.args[0].headers['User-Agent']).toEqual('testUserAgent');
			expect((typeof reqStub.lastCall.args[1])).toEqual('function');
		});

		it('should log an error if request was unsuccessful', function () {
			reqStub.yields('error', null, null);
			events('20131224');
			checkLogStub(logStub, 'error', 'XMLStats API call for **Events** returned error: error', ['nba_error', 'xmlstats_error']);
			checkPromiseSpy(deferredRejectSpy, new Error('XMLStats API call for **Events** returned error: error'));
		});

		it('should log an error if request did not return 200', function () {
			reqStub.yields(null, {statusCode: 404}, null);
			events('20131224');
			checkLogStub(logStub, 'error', 'XMLStats API call for **Events** returned error: 404', ['nba_error', 'xmlstats_error']);
			checkPromiseSpy(deferredRejectSpy, new Error('XMLStats API call for **Events** returned error: error'));
		});

		it('should log that the request to events API was successful', function () {
			reqStub.yields(null, {statusCode: 200}, null);
			events('20131224');
			checkLogStub(logStub, 'info', 'XMLStats API call for **Events** returned success', ['nba_info', 'xmlstats_info']);
		});

		it('should return a resolved promise if request was successful', function () {
			reqStub.yields(null, {statusCode: 200}, '{"body": "body"}');
			events('20131224');
			checkPromiseSpy(deferredResolveSpy, {'body': 'body'});
		});

	});
	
});