'use strict';
angular.module('app')
.controller('ModalNotificacionController', ['$uibModal', '$uibModalInstance', '$scope', '$timeout', 'apiService', 'wdkFunctions', 'notificacion_id', function($uibModal, $uibModalInstance, $scope, $timeout, apiService, wdkFunctions, notificacion_id){
	
	$scope.cargarUsuario = function(){
		apiService.getNode('users', apiService.getId()).then(function(data) {
			$scope.user = data;
		});
	}
	$scope.cargarUsuario();

	$scope.cargarNotificacion = function(){
		apiService.getNode('notificaciones', notificacion_id).then(function(data) {
			//Marcar como leído
			data.leido = true;
			$scope.notificacion = data;
			//Actualizar como leído en BD
			apiService.updateNode('notificaciones', notificacion_id, $scope.notificacion);
			$scope.fecha_registro = moment(data.fecha_registro).format('DD/MM/YYYY HH:mm');
		});
	}
	$scope.cargarNotificacion();

	$scope.aceptarPareja = function(){
		apiService.getNode('parejas', $scope.notificacion.tipo[0].informacion).then(function(data) {
			data.aceptado = true;
			$scope.confirmarPareja = data;
			apiService.updateNode('parejas', $scope.notificacion.tipo[0].informacion, $scope.confirmarPareja).then(function(data) {
				swal("Felicidades!, Mucha suerte con tú nueva pareja", "", "success");
				apiService.deleteNode('notificaciones', notificacion_id);
				var notificacionParejaAceptada = {title: 'El jugador ' + $scope.user.nombre + ' ' + $scope.user.apellido + ' ha aceptado tu solicitud de pareja', tipo: {tipo_solicitud: 'Pareja Confirmada'}, estado: 'Confirmado', mensaje: 'Felicidades!, el jugador ' + $scope.user.nombre + ' ' + $scope.user.apellido + ' y tú ya sois pareja.', envia: 'Club Padel', recibe: $scope.confirmarPareja.jugador1, leido: false};
				apiService.addNode('notificaciones', notificacionParejaAceptada);
				$uibModalInstance.close();
			});
		});
	}

	$scope.rechazarPareja = function(){
		apiService.getNode('parejas', $scope.notificacion.tipo[0].informacion).then(function(data) {
			$scope.rechazarPareja = data;
			apiService.deleteNode('parejas', $scope.notificacion.tipo[0].informacion).then(function(data) {
				apiService.deleteNode('notificaciones', notificacion_id);
				var notificacionParejaAceptada = {title: 'El jugador ' + $scope.user.nombre + ' ' + $scope.user.apellido + ' ha rechazado tu solicitud de pareja', tipo: {tipo_solicitud: 'Pareja Rechazada'}, estado: 'Cancelado', mensaje: 'El jugador ' + $scope.user.nombre + ' ' + $scope.user.apellido + ' ha rechazado tu solicitud de pareja', envia: 'Club Padel', recibe: $scope.rechazarPareja.jugador1, leido: false};
				apiService.addNode('notificaciones', notificacionParejaAceptada);
				$uibModalInstance.close();
			});
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

		$uibModalInstance.close();
	}

	$scope.atras = function(){
		$uibModalInstance.close();
		$scope.openNotificaciones('lg');
	}

}]);

