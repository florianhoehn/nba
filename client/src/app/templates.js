angular.module('templates', ['app/app.view.html', 'app/demo/demo.view.html']);

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
