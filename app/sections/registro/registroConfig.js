'use strict';
angular.module('app')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/registro', {
		controller: 'RegistroController',
		templateUrl: 'sections/registro/registroView.html',
		resolve: {
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	});
}]);
