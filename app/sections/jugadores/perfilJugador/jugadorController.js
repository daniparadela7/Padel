'use strict';
angular.module('app')
.controller('JugadorController', ['$scope', 'apiService', 'user', 'users', 'parejas', function($scope, apiService, user, users, parejas){

	$scope.rating = 4;
	$scope.jugados = 1;
	$scope.ganados = 1;
	$scope.perdidos = 1;
	$scope.victorias = 1;
	$scope.porDiv = 1;
	$scope.global = 1;
	$scope.porParejas = 1;

	$scope.datosUsuario = user;
	$scope.fecha_nacimiento = moment(user.fecha_nacimiento).format('DD/MM/YYYY');
	if(user.partidos_ganados == 0){
		$scope.porcentajeVictorias = 0
	}
	else{
		$scope.porcentajeVictorias = ((user.partidos_ganados*100)/user.partidos_jugados);
	}

	$scope.cargarPareja = function(){
		angular.forEach(parejas, function(value, key){
			if(user._id == value.jugador1){
				if(value.aceptado == true){
					apiService.getNode('users', value.jugador2).then(function(data) {
						$scope.parejaUsuario = data;
					});
				}
			}
			else if(user._id == value.jugador2){
				if(value.aceptado == true){
					apiService.getNode('users', value.jugador1).then(function(data) {
						$scope.parejaUsuario = data;
					});
				}
			}
		});
	}
	$scope.cargarPareja();

	//Ranking
	$scope.cargarRanking = function(){
		$scope.rankingGlobal= [];
		$scope.rankingDivision= [];
		$scope.parejasFinal= [];
		angular.forEach(users, function(value, key) {
			value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados);
			$scope.rankingGlobal.push(value);
			if(value.division == user.division){
				value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados);
				$scope.rankingDivision.push(value);
			}
		});
		var numeroPosibleParejas = parejas.length;
		var contador = 0;
		angular.forEach(parejas, function(value, key) {
			contador++;
			if(value.aceptado == true){
				apiService.getNode('users', value.jugador1).then(function(data) {
					var jugador1 = data;
					apiService.getNode('users', value.jugador2).then(function(data2) {
						var jugador2 = data2;
						//Division pareja
						if(jugador1.division == jugador1.division){
							var divisionPareja = jugador1.division;
						}
						else if(jugador1.division > jugador1.division){
							var divisionPareja = jugador1.division;
						}
						else{
							var divisionPareja = jugador2.division;
						}
						//Division pareja Usuario 
						if(value.jugador1 == user._id){
							$scope.divisionParejaUsuario = divisionPareja;
						}
						else if(value.jugador2 == user._id){
							$scope.divisionParejaUsuario = divisionPareja;
						}
						$scope.parejasFinal.push({
							id_jugador1: jugador1._id,
							id_jugador2: jugador2._id,
							nombre: jugador1.nombre + ' ' + jugador1.apellido + ' / ' + jugador2.nombre + ' ' + jugador2.apellido,
							foto_jugador1: jugador1.imagen,
							foto_jugador2: jugador2.imagen,
							division: divisionPareja,
							partidos_ganados: jugador1.partidos_ganados + jugador2.partidos_ganados,
							partidos_perdidos: jugador1.partidos_perdidos + jugador2.partidos_perdidos,
							puntos: jugador1.puntos + jugador2.puntos
						});
						if(numeroPosibleParejas == contador){
							$scope.rankingParejasPorDivision($scope.divisionParejaUsuario);
						}
					});
				});
			}
		});
	}
	$scope.rankingParejasPorDivision = function(div){
		var divisionElegida = div;
		$scope.parejasDivision= [];
		angular.forEach($scope.parejasFinal, function(value, key) {
			if(value.division == divisionElegida){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasDivision.push(value);}
		});
	}
	$scope.cargarRanking();

	$('.sliderTrofeos').owlCarousel({
			stagePadding: 0,
			smartSpeed: 450,
			nav: false,
			dots: false,
			loop: true,
			autoplay: true,
			autoplayTimeout: 2500,
			autoplayHoverPause: false,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1
				},
				320: {
					items: 1
				},
				580: {
					items: 2
				},
				768: {
					items: 3
				},
				1199: {
					items: 4
				}
			}
		});
}]);
