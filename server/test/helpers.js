'use strict';

var testHelpers = {
	method: '',
	checkLogStub: function (stub, type, msg, tags) {
		expect(stub.called).toBe(true);
		expect(stub.lastCall.args[0]).toEqual(type);
		expect(stub.lastCall.args[1]).toEqual(msg);
		expect(stub.lastCall.args[2].tags).toEqual(tags);
		expect(stub.lastCall.args[2].method).toEqual(testHelpers.method);
		expect(stub.lastCall.args[2].timestamp).toBeDefined();
	},
	checkPromiseSpy: function (spy, msg) {
		expect(spy.called).toBe(true);
		expect(spy.lastCall.args[0]).toEqual(msg);
	},
	validateUndefinedDate: function (fn, logStub, deferredRejectSpy) {
		fn();
		testHelpers.checkLogStub(logStub, 'error', 'Error: the value of date is not allowed to be undefined', ['nba_error']);
		testHelpers.checkPromiseSpy(deferredRejectSpy, new Error('Error: the value of date is not allowed to be undefined'));
	},
	validateStingDate: function (fn, logStub, deferredRejectSpy) {
		fn({a: 'a'});
		testHelpers.checkLogStub(logStub, 'error', 'Error: the value of date must be a string', ['nba_error']);
		testHelpers.checkPromiseSpy(deferredRejectSpy, new Error('Error: the value of date must be a string'));
		fn(['a', 'b']);
		testHelpers.checkLogStub(logStub, 'error', 'Error: the value of date must be a string', ['nba_error']);
		testHelpers.checkPromiseSpy(deferredRejectSpy, new Error('Error: the value of date must be a string'));
		fn(function () {});
		testHelpers.checkLogStub(logStub, 'error', 'Error: the value of date must be a string', ['nba_error']);
		testHelpers.checkPromiseSpy(deferredRejectSpy, new Error('Error: the value of date must be a string'));
		fn(8);
		testHelpers.checkLogStub(logStub, 'error', 'Error: the value of date must be a string', ['nba_error']);
		testHelpers.checkPromiseSpy(deferredRejectSpy, new Error('Error: the value of date must be a string'));
	},
	validateCorrectFormat: function (fn, logStub, deferredRejectSpy) {
		fn('dasda');
		testHelpers.checkLogStub(logStub, 'error', 'Error: the value of date must match the regular expression /^[0-9]{8}$/', ['nba_error']);
		testHelpers.checkPromiseSpy(deferredRejectSpy, new Error('Error: the value of date must match the regular expression /^[0-9]{8}$/'));
		fn('201312');
		testHelpers.checkLogStub(logStub, 'error', 'Error: the value of date must match the regular expression /^[0-9]{8}$/', ['nba_error']);
		testHelpers.checkPromiseSpy(deferredRejectSpy, new Error('Error: the value of date must match the regular expression /^[0-9]{8}$/'));
		fn('201312259');
		testHelpers.checkLogStub(logStub, 'error', 'Error: the value of date must match the regular expression /^[0-9]{8}$/', ['nba_error']);
		testHelpers.checkPromiseSpy(deferredRejectSpy, new Error('Error: the value of date must match the regular expression /^[0-9]{8}$/'));
		fn('2013Nov14');
		testHelpers.checkLogStub(logStub, 'error', 'Error: the value of date must match the regular expression /^[0-9]{8}$/', ['nba_error']);
		testHelpers.checkPromiseSpy(deferredRejectSpy, new Error('Error: the value of date must match the regular expression /^[0-9]{8}$/'));
	}
};

module.exports = testHelpers;