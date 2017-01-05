'use strict';
angular.module('app')
.controller('TorneosController', ['$scope', '$uibModal', function($scope, $uibModal){

	$scope.openTorneo = function(size) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/sections/torneos/torneo/modalTorneo.html',
	      controller: 'ModalTorneoController',
	      size: size,
	      resolve: {
	      }
	    });

	    modalInstance.result.then(function () {

		}, function () {
		});	  
	}

}]);
