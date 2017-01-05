'use strict';
angular.module('app')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/login', {
		controller: 'LoginController',
		controllerAs: 'login',
		templateUrl: 'sections/login/loginView.html',
		resolve: {
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	});
}]);
