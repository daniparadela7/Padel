'use strict';
angular.module('app').service('wdkFunctions', ['$rootScope', '$uibModal', '$timeout', '$route', '$location', 'apiService', function($rootScope, $uibModal, $timeout, $route, $location, apiService) {
	
	this.init = function(){
		this.isActive();
		this.tamañoPantalla();
		this.calendarioReservas();
	};

	this.animate = function(element, inview, inviewpart, transition, duration, delay) {
		if(!screenSize.is('xs')){
			if(inview && (inviewpart === 'top' || inviewpart === 'bottom' || inviewpart === 'both') && !$(element).hasClass(transition)) {
				$(element).css('animation-delay', delay + 's');
					$(element).css('animation-duration', duration + 's');
					$(element).addClass('animated ' + transition);
			}
		}
	};

	this.isActive = function(route) {
        $rootScope.ruta = $route;
    };

    this.tamañoPantalla = function(){
		var windowHeight = $(window).height();
		//$('.sliderInicio').css('height', windowHeight);
	};


	$rootScope.abrirModalReserva = function(date, pista, tiempoPista){
		var modalInstance = $uibModal.open({
	    	animation: true,
	    	templateUrl: '/sections/reservas/reservaModal/modalReserva.html',
	    	controller: 'ModalReservaController',
	      	resolve: {
	      		date: function(){
	        		return date;
	        	},
	        	pista: function(){
	        		return pista;
	        	},
	        	tiempoPista: function(){
	        		return tiempoPista;
	        	}
	    	}
    	});

	    modalInstance.result.then(function () {

		}, function () {
		});
	}

	this.calendarioReservas = function(){
		if($location.path() == '/reservas'){
			$('.calendar').fullCalendar({
				header: false,
				columnFormat: {day: false},
				lang: 'es',
				defaultDate: moment(),
				defaultView: 'agendaDay',
				contentHeight: 'auto',
				views:{
					day:{allDaySlot: false, allDayText: false}
				},
				axisFormat: 'HH:mm',
				timeFormat: {
				    agenda: 'HH:mm'
				},
				minTime: '09:00',
				maxTime: '23:00',
				eventOverlap: false,
				dayClick: function(date, e) {
					var ahora = new Date();
					ahora.setHours(ahora.getHours()+2);
					if(date < ahora){
						swal("Esta hora ya ha pasado", "", "error");
					}
					else{
						var pista = $(e.target).parents('.calendar').attr('id');
						var numPista = pista.substring(6);
						//Media hora menos
						var mediaHoraMenos = new Date(date); mediaHoraMenos.setMinutes(mediaHoraMenos.getMinutes()-30); var mediaHoraMenosString = mediaHoraMenos.toISOString();
						//Media hora mas
						var mediaHoraMas = new Date(date); mediaHoraMas.setMinutes(mediaHoraMas.getMinutes()+30); var mediaHoraMasString = mediaHoraMas.toISOString();
						//1 hora mas
						var unaHoraMas = new Date(date); unaHoraMas.setMinutes(unaHoraMas.getMinutes()+60); var unaHoraMasString = unaHoraMas.toISOString();
						//1 hora y media mas
						var unaHoraMediaMas = new Date(date); unaHoraMediaMas.setMinutes(unaHoraMediaMas.getMinutes()+90); var unaHoraMediaMasString = unaHoraMediaMas.toISOString();
						//2 horas mas
						var dosHorasMas = new Date(date); dosHorasMas.setMinutes(dosHorasMas.getMinutes()+120); var dosHorasMasString = dosHorasMas.toISOString();
						//2 horas y media mas
						var dosHorasMediaMas = new Date(date); dosHorasMediaMas.setMinutes(dosHorasMediaMas.getMinutes()+150); var dosHorasMediaMasString = dosHorasMediaMas.toISOString();
						//3 horas mas
						var tresHorasMas = new Date(date); tresHorasMas.setMinutes(tresHorasMas.getMinutes()+180); var tresHorasMasString = tresHorasMas.toISOString();
						//3 horas y media mas
						var tresHorasMediaMas = new Date(date); tresHorasMediaMas.setMinutes(tresHorasMediaMas.getMinutes()+210); var tresHorasMediaMasString = tresHorasMediaMas.toISOString();

						apiService.getNodes('reservas').then(function(data) {
							$rootScope.reservas = data
							var dataLength = data.length;
							$rootScope.pistaDisponible = true;
							$rootScope.tiempoFull = 0;
				            angular.forEach(data, function(value, key) {
								if((numPista == value.pista)&&(value.end == mediaHoraMenosString)){
									for (var i=0; i<dataLength; i++) {
										if(value.start != mediaHoraMenosString){
											$rootScope.pistaDisponible = false;
											swal("No puedes dejar espacios libres menores de 60 minutos", "", "error");
											$rootScope.tiempoFull = 8;
										}
								    }
								}
								else if((numPista == value.pista)&&(value.start == mediaHoraMasString)){
									swal("El mínimo tiempo de la reserva es de una hora", "", "error");
									$rootScope.pistaDisponible = false;
									$rootScope.tiempoFull = 8;
								}

							});
							if($rootScope.pistaDisponible == true){
								angular.forEach($rootScope.reservas, function(value, key) {
									if((numPista == value.pista)&&(value.start == unaHoraMasString)){
										$rootScope.tiempoFull = 1;
									}
									else if((numPista == value.pista)&&(value.start == unaHoraMediaMasString)){
										$rootScope.tiempoFull = 2;
									}
									else if((numPista == value.pista)&&(value.start == dosHorasMasString)){
										$rootScope.tiempoFull = 3;
									}
									else if((numPista == value.pista)&&(value.start == dosHorasMediaMasString)){
										$rootScope.tiempoFull = 4;
									}
									else if((numPista == value.pista)&&(value.start == tresHorasMasString)){
										$rootScope.tiempoFull = 5;
									}
									else if((numPista == value.pista)&&(value.start == tresHorasMediaMasString)){
										$rootScope.tiempoFull = 6;
									}
		

								});
							}
							if($rootScope.tiempoFull == 0){
								var tiempoPista = [{tiempo: '1 hora', valor: 1}, {tiempo: '1 hora y 30 min', valor: 130}, {tiempo: '2 horas', valor: 2}, {tiempo: '2 horas y 30 min', valor: 230}, {tiempo: '3 horas', valor: 3}];
								$rootScope.abrirModalReserva(date, pista, tiempoPista);
							}
							else{
								if($rootScope.tiempoFull == 1){
									var tiempoPista = [{tiempo: '1 hora', valor: 1}];
									$rootScope.abrirModalReserva(date, pista, tiempoPista);
								}
								if($rootScope.tiempoFull == 2){
									var tiempoPista = [{tiempo: '1 hora y 30 min', valor: 130}];
										$rootScope.abrirModalReserva(date, pista, tiempoPista);
								}
								if($rootScope.tiempoFull == 3){
									var tiempoPista = [{tiempo: '1 hora', valor: 1}, {tiempo: '2 horas', valor: 2}];
									$rootScope.abrirModalReserva(date, pista, tiempoPista);
								}
								if($rootScope.tiempoFull == 4){
									var tiempoPista = [{tiempo: '1 hora', valor: 1}, {tiempo: '1 hora y 30 min', valor: 130}, {tiempo: '2 horas y 30 min', valor: 230}];
									$rootScope.abrirModalReserva(date, pista, tiempoPista);
								}
								if($rootScope.tiempoFull == 5){
									var tiempoPista = [{tiempo: '1 hora', valor: 1}, {tiempo: '1 hora y 30 min', valor: 130}, {tiempo: '2 horas', valor: 2}, {tiempo: '3 horas', valor: 3}];
									$rootScope.abrirModalReserva(date, pista, tiempoPista);
								}
								if($rootScope.tiempoFull == 6){
									var tiempoPista = [{tiempo: '1 hora', valor: 1}, {tiempo: '1 hora y 30 min', valor: 130}, {tiempo: '2 horas', valor: 2}, {tiempo: '2 horas y 30 min', valor: 230}];
									$rootScope.abrirModalReserva(date, pista, tiempoPista);
								}
							}
				        });

					}  
			    }
	    	})
		}
	};

}]);
