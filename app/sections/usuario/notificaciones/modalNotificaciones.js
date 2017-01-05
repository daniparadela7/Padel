'use strict';
angular.module('app')
.controller('ModalNotificacionesController', ['$uibModalInstance', '$uibModal', '$scope', '$timeout', 'apiService', 'wdkFunctions', function($uibModalInstance, $uibModal, $scope, $timeout, apiService, wdkFunctions){

	$scope.cargarNotificaciones = function(){
		$scope.notificaciones = [];
		if(apiService.isAuthentificated()){
			var idCliente = apiService.getId();
			apiService.getNodes('notificaciones').then(function(data) {
			    angular.forEach(data, function(value, key) {
			    	value.fecha_notificacion = moment(value.fecha_registro).format('DD/MM/YYYY HH:mm')
					if(value.recibe == idCliente){$scope.notificaciones.push(value);}
				});
			});
		}
	}
	$scope.cargarNotificaciones();

	$scope.openNotificacion = function(size, notificacion_id) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/usuario/notificaciones/modalNotificacion.html',
	      controller: 'ModalNotificacionController',
	      size: size,
	      resolve: {
	      	notificacion_id: function(){
	      		return notificacion_id;
	      	}
	      }
	    });

	    modalInstance.result.then(function () {
	    	
		}, function () {
		});	  

		$uibModalInstance.close();
	}

	$scope.eliminarNotificacion = function(notificacion_id){
		apiService.deleteNode('notificaciones', notificacion_id).then(function(data) {
			$scope.cargarNotificaciones();
		});
	}

	$scope.cerrar = function(){
		$uibModalInstance.close();
	}
	
}]);

