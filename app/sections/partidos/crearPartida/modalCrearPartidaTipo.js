'use strict';
angular.module('app')
.controller('ModalCrearPartidaTipoController', ['$uibModal', '$uibModalInstance', '$scope', '$timeout', 'wdkFunctions', function($uibModal, $uibModalInstance, $scope, $timeout, wdkFunctions){
	$scope.openPorReto = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/partidos/crearPartida/modalPorReto.html',
	      controller: 'ModalCrearPartidaPorRetoController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {

		}, function () {
		});

		$uibModalInstance.close();
	}

	$scope.openPorPareja = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/partidos/crearPartida/modalPorPareja.html',
	      controller: 'ModalCrearPartidaPorParejaController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {

		}, function () {
		});

		$uibModalInstance.close();
	}

	$scope.openUniversal = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/partidos/crearPartida/modalUniversal.html',
	      controller: 'ModalCrearPartidaUniversalController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {

		}, function () {
		});

	    $uibModalInstance.close();
	}

	$scope.openCrearPartida = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/partidos/crearPartida/modalCrearPartida.html',
	      controller: 'ModalCrearPartidaController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {

		}, function () {
		});	  
	}

	$scope.atras = function(){		
		$uibModalInstance.close();
		$scope.openCrearPartida('lg');
	}
	
}]);

