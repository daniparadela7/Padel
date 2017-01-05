'use strict';
angular.module('app')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/usuario/editarPerfil', {
		controller: 'editarPerfilController',
		templateUrl: 'sections/usuario/editarPerfil/editarPerfilView.html',
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
			notificaciones: function(apiService) {
				return apiService.getNodes('notificaciones');
			},
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	});
}]);
