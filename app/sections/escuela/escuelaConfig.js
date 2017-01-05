'use strict';
angular.module('app')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/escuela', {
		controller: 'EscuelaController',
		templateUrl: 'sections/escuela/escuelaView.html',
		resolve: {
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	});
}]);
