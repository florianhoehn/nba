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
	]);;'use strict';

angular.module('common', ['dependencies']);;'use strict';

angular.module('dependencies', []);;'use strict';

/**
 * @ngdoc function
 * @name ng.module:demo
 * @function
 *
 * @description
 * [add a description]
 *
 */
angular.module('demo', [])

	/**
	 * @ngdoc function
	 * @name ng.controller:demoCtrl
	 * @function
	 *
	 * @description
	 * [add a description]
	 *
	 */
	.controller('DemoCtrl', ['$scope', function ($scope) {
		$scope.msg = 'This is the DemoCtrl controller';
	}])

	/**
	 * @ngdoc function
	 * @name ng.factory:demoFactory
	 * @function
	 *
	 * @description
	 * [add a description]
	 *
	 * @returns {string} A new instance of this factory.
	 *
	 */
	.factory('demoFactory', function () {
		// Service logic
		// ...

		var meaningOfLife = 42;

		// Public API here
		return {
			someMethod: function () {
				return meaningOfLife;
			}
		};
	});;angular.module('templates', ['app/app.view.html', 'app/demo/demo.view.html']);

angular.module('app/app.view.html', []).run(['$templateCache', function($templateCache) {
	'use strict';
	$templateCache.put('app/app.view.html',
		'<h1>{{message}}</h1>\n' +
		'<ul>\n' +
		'	<li ng-repeat="event in events">\n' +
		'		{{event.away_team.team_id}} @ {{event.home_team.team_id}}\n' +
		'	</li>\n' +
		'</ul>');
}]);

angular.module('app/demo/demo.view.html', []).run(['$templateCache', function($templateCache) {
	'use strict';
	$templateCache.put('app/demo/demo.view.html',
		'<div ng-controller="DemoCtrl">\n' +
		'	<h1>{{msg}}</h1>\n' +
		'</div>');
}]);
