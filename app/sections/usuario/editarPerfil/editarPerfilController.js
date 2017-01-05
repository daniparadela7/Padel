'use strict';
angular.module('app')
.controller('editarPerfilController', ['$scope', '$location', 'apiService', 'user', 'users', 'parejas', 'notificaciones', function($scope, $location, apiService, user, users, parejas, notificaciones){
	$scope.user = user;
	$scope.user.fecha = new Date(user.fecha_nacimiento);
	var parejas = parejas;
	$scope.usuariosParejaDisponibles = [];

	//Cargar pareja usuario o solicitud (Si tiene)
	$scope.cargarParejaSolicitud = function(){
		angular.forEach(parejas, function(value, key){
			if(user._id == value.jugador1){
				if(value.aceptado == true){
					apiService.getNode('users', value.jugador2).then(function(data) {
						$scope.parejaUsuario = data;
					});
					$scope.parejaId = value._id;
				}
				else if(value.aceptado == false){
					apiService.getNode('users', value.jugador2).then(function(data) {
						$scope.solicitudParejaUsuario = data;
					});
					$scope.parejaId = value._id;
				}
			}
			else if(user._id == value.jugador2){
				if(value.aceptado == true){
					apiService.getNode('users', value.jugador1).then(function(data) {
						$scope.parejaUsuario = data;
					});
					$scope.parejaId = value._id;
				}
				else if(value.aceptado == false){
					$scope.parejaId = value._id;
				}
			}
		});
	}
	$scope.cargarParejaSolicitud();

	//Cargar los usuarios disponibles para Pareja
	$scope.usuariosDisponiblesPareja = function(){
		angular.forEach(users, function(value, key) {
			$scope.usuariosParejaDisponibles.push({id: value._id, nombre: value.nombre + ' ' + value.apellido});
		});

		angular.forEach($scope.usuariosParejaDisponibles, function(value, key){
			if(value.id == $scope.user._id){
				var indexArray = $scope.usuariosParejaDisponibles.indexOf(value);
				$scope.usuariosParejaDisponibles.splice(indexArray, 1);
			}
			for(var i=0; i<parejas.length; i++) {
				if((value.id == parejas[i].jugador1 && parejas[i].aceptado == true)||(value.id == parejas[i].jugador2 && parejas[i].aceptado == true)){
					var indexArray = $scope.usuariosParejaDisponibles.indexOf(value);
					$scope.usuariosParejaDisponibles.splice(indexArray, 1);
				}
		    }
		   
		});
	}
	$scope.usuariosDisponiblesPareja();

	$scope.eliminarSolicitudPareja = function(){
		apiService.deleteNode('parejas', $scope.parejaId).then(function(data) {
			swal("La solicitud de pareja a " + $scope.solicitudParejaUsuario.nombre + ' ' + $scope.solicitudParejaUsuario.apellido + ' ha sido eliminada.', "", "success");
			$location.path('/');
		});
		angular.forEach(notificaciones, function(value, key) {
			if(value.tipo){
				if(value.tipo[0].informacion == $scope.parejaId){
					$scope.notificacionSolicitud = value;
				}
			}
		});
		apiService.deleteNode('notificaciones',$scope.notificacionSolicitud._id);
	}

	$scope.eliminarPareja = function(){
		apiService.deleteNode('parejas', $scope.parejaId).then(function(data) {
			swal('Tú y ' + $scope.parejaUsuario.nombre + ' ' + $scope.parejaUsuario.apellido + ' ya no sois pareja', "", "success");
			$location.path('/');
			var notificacionSinPareja = {title: 'Tú y ' + user.nombre + ' ' + user.apellido + ' ya no sois pareja', tipo: {tipo_solicitud: 'Sin Pareja'}, estado: 'Cancelado', mensaje: 'El jugador ' + user.nombre + ' ' + user.apellido + ' y tú ya no sois pareja.', envia: 'Club Padel', recibe: $scope.parejaUsuario._id, leido: false}
			apiService.addNode('notificaciones', notificacionSinPareja);
		});
	}

	$scope.modificarPerfil = function(){
		if($scope.solicitudPareja){
			if($scope.solicitudPareja.id){
				var solicitudParejaCliente = {jugador1: user._id, jugador2: $scope.solicitudPareja.id, aceptado: false};
				console.log(solicitudParejaCliente)
				apiService.addNode('parejas', solicitudParejaCliente).then(function(data) {
					var enviaNombre = user.nombre + " " + user.apellido;
					var notificacionPareja = {title: 'Solicitud de pareja de ' + enviaNombre, tipo: {tipo_solicitud: 'Pareja', informacion: data._id}, estado: 'Pendiente', mensaje: 'Has recibido una solicitud de pareja de ' + enviaNombre, envia: user._id, recibe: $scope.solicitudPareja.id, leido: false}
					apiService.addNode('notificaciones', notificacionPareja);
				});
			}
			else{
				swal("Esta pareja no existe.", "Introduce un nombre de usuario correcto.", "error");
			}
		}
		$scope.datosUsuario = {
			nombre : $scope.user.nombre,
            apellido : $scope.user.apellido,
            fecha_nacimiento: $scope.user.fecha,
            telefono: $scope.user.telefono,
            pista: $scope.user.pista,
            posicion: $scope.user.posicion,
            imagen: $scope.user.image
		};
		swal("Los cambios se han realizado correctamente", "", "success");
		$location.path('/');
		return apiService.updateNode('users', apiService.getId(), $scope.datosUsuario);
	}
	

}]);
