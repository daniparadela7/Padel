'use strict';
angular.module('app')
.controller('HeaderController', ['$rootScope', '$scope', '$auth', '$timeout', '$location', '$uibModal', function($rootScope, $scope, $auth, $timeout, $location, $uibModal){
	
	$scope.openCrearPartida = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/partidos/crearPartida/modalCrearPartida.html',
	      controller: 'ModalCrearPartidaController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {

		}, function () {
		});	  
	}

	$scope.openPartidoRapido = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/partidos/partidoRapido/modalPartidoRapido.html',
	      controller: 'ModalPartidoRapidoController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {

		}, function () {
		});	  
	}

	$scope.openNotificaciones = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/usuario/notificaciones/modalNotificaciones.html',
	      controller: 'ModalNotificacionesController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {
	    	
		}, function () {
		});	  
	}

	$scope.cerrarSesion = function(){
		$auth.removeToken();
		$rootScope.authentificated = false;
		$location.path('/login');
	}

	$timeout(function(){
		$(document).on('click', '.navbar-collapse.in', function(e) {
			//Plegamos el menu tras pinchar sobre alguna seccion
			if($(e.target).is('a')) {
				var el = this;
				$timeout(function(){
					$(el).collapse('hide');
				}, 500);
			}
		});
	}, 0);
}]);
