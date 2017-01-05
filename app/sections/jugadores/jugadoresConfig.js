'use strict';
angular.module('app')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/jugadores', {
		controller: 'JugadoresController',
		templateUrl: 'sections/jugadores/jugadoresView.html',
		resolve: {
			users: function(apiService) {
			    return apiService.getNodes('users');
			},
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	})
	.when('/jugadores/:pretty', {
		controller: 'JugadorController',
		templateUrl: 'sections/jugadores/perfilJugador/jugadorView.html',
		resolve: {
			user: function(apiService, $route){
				return apiService.getNode('perfil', $route.current.params.pretty)
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
