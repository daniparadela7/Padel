'use strict';
angular.module('app')
.controller('JugadoresController', ['$scope', 'users', function($scope, users){
	$scope.usuarios = [];
	$scope.porDivision1 = [];
	$scope.porDivision2 = [];
	$scope.porDivision3 = [];
	$scope.porDivision4 = [];
	$scope.porDivision5 = [];

	$scope.jugadores = function(){
		angular.forEach(users, function(value, key) {
			$scope.usuarios.push({nombre: value.nombre + ' ' + value.apellido, jugador: value});
		});
	}
	$scope.jugadores();

	$scope.jugadoresPorDivision1 = function(){
		angular.forEach(users, function(value, key) {
			if(value.division == 1){$scope.porDivision1.push(value);}
		});
	}
	$scope.jugadoresPorDivision1();

	$scope.jugadoresPorDivision2 = function(){
		angular.forEach(users, function(value, key) {
			if(value.division == 2){$scope.porDivision2.push(value);}
		});
	}
	$scope.jugadoresPorDivision2();

	$scope.jugadoresPorDivision3 = function(){
		angular.forEach(users, function(value, key) {
			if(value.division == 3){$scope.porDivision3.push(value);}
		});
	}
	$scope.jugadoresPorDivision3();

	$scope.jugadoresPorDivision4 = function(){
		angular.forEach(users, function(value, key) {
			if(value.division == 4){$scope.porDivision4.push(value);}
		});
	}
	$scope.jugadoresPorDivision4();

	$scope.jugadoresPorDivision5 = function(){
		angular.forEach(users, function(value, key) {
			if(value.division == 5){$scope.porDivision5.push(value);}
		});
	}
	$scope.jugadoresPorDivision5();

	$scope.irAlUsuario = function(){
		var divisionTab = $scope.usuarioSeleccionado.jugador.division;
		$('#'+divisionTab).tab('show');
		setTimeout(function () {
			var claseUsuario = $scope.usuarioSeleccionado.jugador.pretty_url;
			var userPosition = $('.'+claseUsuario).offset().top-300;
	        $('html, body').animate({scrollTop : userPosition},800);
			return false;
			event.stopPropagation();
	    }, 500);
	}

}]);
