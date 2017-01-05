'use strict';
angular.module('app')
.controller('ModalCrearPartidaUniversalController', ['$uibModal', '$uibModalInstance', '$scope', '$timeout', 'wdkFunctions', function($uibModal, $uibModalInstance, $scope, $timeout, wdkFunctions){
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

