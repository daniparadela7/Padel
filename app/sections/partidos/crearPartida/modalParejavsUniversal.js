'use strict';
angular.module('app')
.controller('ModalCrearPartidaParejavsUniversalController', ['$uibModal', '$uibModalInstance', '$scope', '$timeout', 'wdkFunctions', function($uibModal, $uibModalInstance, $scope, $timeout, wdkFunctions){
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

	$scope.atras = function(){		
		$uibModalInstance.close();
		$scope.openPorPareja('lg');
	}

}]);

