'use strict';
angular.module('app')
.controller('ModalReservaController', ['$uibModalInstance', '$scope', '$timeout', 'apiService', 'date', 'pista', 'tiempoPista', function($uibModalInstance, $scope, $timeout, apiService, date, pista, tiempoPista){
	$scope.fechaHora = date.format('DD/MM/YYYY HH:mm');
	$scope.fecha = date.format('DD/MM/YYYY');
	$scope.hora = date.format('HH:mm');
	$scope.pista = pista.substring(6);
	$scope.tiempoPista = tiempoPista;

	$scope.crearReserva = function(){
		if($scope.tiempoDuracion == 130){
			$scope.duracion = moment(date).add(1, 'hour').add(30, 'minute');
		}
		else if($scope.tiempoDuracion == 230){
			$scope.duracion = moment(date).add(2, 'hour').add(30, 'minute');
		}
		else{
			$scope.duracion = moment(date).add($scope.tiempoDuracion, 'hour');
		}
        var newEvent = {
            title: 'Reservado',
            start: date,
            end: $scope.duracion,
            pista: $scope.pista,
            usuario: apiService.getId(),
            color: '#B5232D'
        };

        apiService.addNode('reservas', newEvent).then(function(data) {
		    var reserva = data;
		    if(reserva.status == 500){
		    	$scope.errorReserva = reserva.data.message;
		    	swal("Error al crear la reserva", $scope.errorReserva, "error");
		    }
		    else{
		    	if(newEvent.usuario == apiService.getId()){
					newEvent.color = '#003760';
				}
		    	$('#' + pista).fullCalendar( 'renderEvent', newEvent);
		    	swal("La reserva se ha realizado correctamente", "Día " + $scope.fecha + " a las " + $scope.hora + " en la pista " + $scope.pista, "success");
		    }
		});

        $uibModalInstance.close();
	}

}]);

