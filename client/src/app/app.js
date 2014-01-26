'use strict';

angular.module('app', ['templates', 'common', 'ngRoute'])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/app.view.html',
				controller: 'AppCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	}])
	.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
			$scope.message = 'Hello World';
			$scope.templateUrl = 'app/app.view.html';
			$http.get('/api/v1/events').then(function (events) {
				console.log('My Events: ', events);
				$scope.events = events.data.events;
			}, function (err) {
				$scope.events = err;
			});
		}
	]);