'use strict';
angular.module('app')
.controller('ClasificacionController', ['$scope', '$timeout', 'apiService', 'users', 'user', 'parejas', function($scope, $timeout, apiService, users, user, parejas){
	$scope.usuarios = [];
	$scope.user = user;
	$scope.divUsuario = user.division;

	$scope.parejas = [];
	$scope.parejas2 = [];
	$scope.parejasFinal = [];

	$scope.rankingDivision = 1;

	//Nombre y apellidos en el buscador
	angular.forEach(users, function(value, key) {
		value.nombre = value.nombre + ' ' + value.apellido;
		$scope.usuarios.push(value);
	});
	
	//Ranking por División
	$scope.rankingPorDivision = function(div){
		var divisionElegida = div;
		$scope.porDivision= [];
		if($scope.rankingGenero=='Masculino'){
			angular.forEach(users, function(value, key) {
				if((value.division == divisionElegida)&&(value.genero == 'Masculino')){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.porDivision.push(value);}
			});
		}
		else if($scope.rankingGenero=='Femenino'){
			angular.forEach(users, function(value, key) {
				if((value.division == divisionElegida)&&(value.genero == 'Femenino')){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.porDivision.push(value);}
			});
		}
		else{
			angular.forEach(users, function(value, key) {
				if(value.division == divisionElegida){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.porDivision.push(value);}
			});
		}
	}
	$scope.rankingPorDivision($scope.divUsuario);

	$scope.rankingPorDivisionMasculino = function(){
		$scope.rankingPorDivision($scope.rankingDivision);
		$scope.rankingSeleccionadoM = $scope.porDivision;
		$scope.porDivision= [];
		angular.forEach($scope.rankingSeleccionadoM, function(value, key) {
			if(value.genero == 'Masculino'){$scope.porDivision.push(value);}
		});
	}

	$scope.rankingPorDivisionFemenino = function(){
		$scope.rankingPorDivision($scope.rankingDivision);
		$scope.rankingSeleccionadoF = $scope.porDivision;
		$scope.porDivision= [];
		angular.forEach($scope.rankingSeleccionadoF, function(value, key) {
			if(value.genero == 'Femenino'){$scope.porDivision.push(value);}
		});
	}

	//Ranking Global
	$scope.rankingGlobal = function(){
		$scope.global= [];
		angular.forEach(users, function(value, key) {
			value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.global.push(value);
		});
	}
	$scope.rankingGlobal();

	$scope.rankingGlobalMasculino = function(){
		$scope.global= [];
		angular.forEach(users, function(value, key) {
			if(value.genero == 'Masculino'){value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.global.push(value);}
		});
	}

	$scope.rankingGlobalFemenino = function(){
		$scope.global= [];
		angular.forEach(users, function(value, key) {
			if(value.genero == 'Femenino'){value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.global.push(value);}
		});
	}

	//Ranking por Parejas
	$scope.rankingPorParejas = function(){
		$scope.parejasFinal = [];
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
						//Género pareja
						if(jugador1.genero == jugador1.genero){
							var generoPareja = jugador1.genero;
						}
						else if(jugador1.division != jugador1.division){
							var generoPareja = 'Mixto';
						}
						$scope.parejasFinal.push({
							id_jugador1: jugador1._id,
							id_jugador2: jugador2._id,
							nombre: jugador1.nombre + ' ' + jugador1.apellido + ' / ' + jugador2.nombre + ' ' + jugador2.apellido,
							foto_jugador1: jugador1.imagen,
							foto_jugador2: jugador2.imagen,
							pretty_url1: jugador1.pretty_url,
							pretty_url2: jugador2.pretty_url,
							genero: generoPareja,
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
		$scope.parejasGlobal= [];
		if($scope.rankingGeneroP=='MasculinoP'){
			angular.forEach($scope.parejasFinal, function(value, key) {
				if(divisionElegida == 'global'){
					if(value.genero == 'Masculino'){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value)};
				}
				else{
					if((value.division == divisionElegida)&&(value.genero == 'Masculino')){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value)};
				}
			});
		}
		else if($scope.rankingGeneroP=='FemeninoP'){
			angular.forEach($scope.parejasFinal, function(value, key) {
				if(divisionElegida == 'global'){
					if(value.genero == 'Femenino'){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);}
				}
				else{
					if((value.division == divisionElegida)&&(value.genero == 'Femenino')){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);}
				}
			});
		}
		else if($scope.rankingGeneroP=='MixtoP'){
			angular.forEach($scope.parejasFinal, function(value, key) {
				if(divisionElegida == 'global'){
					if(value.genero == 'Mixto'){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);}
				}
				else{
					if((value.division == divisionElegida)&&(value.genero == 'Mixto')){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);}
				}
			});
		}
		else{
			angular.forEach($scope.parejasFinal, function(value, key) {
				if(divisionElegida == 'global'){
					value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);
				}
				else{
					if(value.division == divisionElegida){ value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);}
				}
			});
		}
	}
	$scope.rankingPorParejas();

	$scope.rankingParejasGlobalMasculino = function(){
		$scope.rankingParejasPorDivision($scope.divisionParejaUsuario);
		$scope.rankingSeleccionadoPM = $scope.parejasGlobal;
		$scope.parejasGlobal= [];
		angular.forEach($scope.rankingSeleccionadoPM, function(value, key) {
			if(value.genero == 'Masculino'){value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);}
		});
	}

	$scope.rankingParejasGlobalFemenino = function(){
		$scope.rankingParejasPorDivision($scope.divisionParejaUsuario);
		$scope.rankingSeleccionadoPF = $scope.parejasGlobal;
		$scope.parejasGlobal= [];
		angular.forEach($scope.rankingSeleccionadoPF, function(value, key) {
			if(value.genero == 'Femenino'){value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);}
		});
	}

	$scope.rankingParejasGlobalMixto = function(){
		$scope.rankingParejasPorDivision($scope.divisionParejaUsuario);
		$scope.rankingSeleccionadoPMi = $scope.parejasGlobal;
		$scope.parejasGlobal= [];
		angular.forEach($scope.rankingSeleccionadoPMi, function(value, key) {
			if(value.genero == 'Mixto'){value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);}
		});
	}

	$scope.rankingParejasGlobalTodos = function(){
		$scope.rankingParejasPorDivision($scope.divisionParejaUsuario);
		$scope.rankingSeleccionadoPT = $scope.parejasGlobal;
		$scope.parejasGlobal= [];
		angular.forEach($scope.rankingSeleccionadoPT, function(value, key) {
			value.porcentajeVictorias = ((value.partidos_ganados*100)/value.partidos_jugados); $scope.parejasGlobal.push(value);
		});
	}

	$scope.irAlUsuario = function(){
		if($scope.usuarioSeleccionado){
			var claseUsuario = $scope.usuarioSeleccionado.pretty_url;
			var userPosition = $('.'+claseUsuario).offset().top-300;
			$('html, body').animate({scrollTop : userPosition},800);
			return false;
			event.stopPropagation();
		}
		else{
			var claseUsuario = user.pretty_url;
			var userPosition = $('.'+claseUsuario).offset().top-300;
			$('html, body').animate({scrollTop : userPosition},800);
			return false;
			event.stopPropagation();
		}
	}

	$timeout(function(){
			$scope.irAlUsuario();
		}, 0);

}]);
