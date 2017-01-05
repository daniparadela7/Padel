'use strict';
angular.module('app')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/torneos', {
		controller: 'TorneosController',
		templateUrl: 'sections/torneos/torneosView.html',
		resolve: {
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	});
}]);
