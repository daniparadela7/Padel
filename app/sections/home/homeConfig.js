'use strict';
angular.module('app')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'HomeController',
		templateUrl: 'sections/home/homeView.html',
		resolve: {
			user: function(apiService) {
			    return apiService.getNode('users', apiService.getId());
			},
			users: function(apiService) {
			    return apiService.getNodes('users');
			},
			parejas: function(apiService) {
			    return apiService.getNodes('parejas');
			},
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	});
}]);
