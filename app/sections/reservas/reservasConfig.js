'use strict';
angular.module('app')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/reservas', {
		controller: 'ReservasController',
		templateUrl: 'sections/reservas/reservasView.html',
		resolve: {
			reservas: function(apiService) {
			    return apiService.getNodes('reservas');
			},
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	});
}]);
