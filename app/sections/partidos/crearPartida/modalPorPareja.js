'use strict';
angular.module('app')
.controller('ModalCrearPartidaPorParejaController', ['$uibModal', '$uibModalInstance', '$scope', '$timeout', 'wdkFunctions', function($uibModal, $uibModalInstance, $scope, $timeout, wdkFunctions){
	$scope.openParejavsPareja = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/partidos/crearPartida/modalParejavsPareja.html',
	      controller: 'ModalCrearPartidaParejavsParejaController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {

		}, function () {
		});	

		$uibModalInstance.close();  
	}

	$scope.openParejavsUniversal = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/partidos/crearPartida/modalParejavsUniversal.html',
	      controller: 'ModalCrearPartidaParejavsUniversalController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {

		}, function () {
		});	  

		$uibModalInstance.close();
	}

	$scope.openCrearPartidaTipo = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/partidos/crearPartida/modalCrearPartidaTipo.html',
	      controller: 'ModalCrearPartidaTipoController',
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
		$scope.openCrearPartidaTipo('lg');
	}

}]);

