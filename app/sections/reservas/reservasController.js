'use strict';
angular.module('app')
.controller('ReservasController', ['$scope', '$timeout', '$uibModal', 'apiService', 'reservas', function($scope, $timeout, $uibModal, apiService, reservas){
	var hoy = moment();
	$scope.diaHoy = hoy.format('DD/MM/YYYY');
	var hoyMas7 = moment().add('7', 'days');
	$scope.diaMas7 = hoyMas7.format('DD/MM/YYYY');

	$scope.cargarReservas = function(){
		$timeout(function(){
			angular.forEach(reservas, function(value, key) {
				if(value.usuario == apiService.getId()){
					value.color = '#003760';
				}
				$('#pista-' + value.pista).fullCalendar('renderEvent', value);
			});
		}, 0);
	}

	$scope.cargarReservas();

	$scope.siguienteDia = function(dia){
		$('.calendar').fullCalendar('next');
		$scope.cargarReservas();
		var diaActual = $('.calendar').fullCalendar('getDate')
		$scope.actualDay = diaActual.format('DD/MM/YYYY');

	}

	$scope.anteriorDia = function(dia){
		$('.calendar').fullCalendar('prev');
		$scope.cargarReservas();
		var diaActual = $('.calendar').fullCalendar('getDate')
		$scope.actualDay = diaActual.format('DD/MM/YYYY');
	}

}]);

