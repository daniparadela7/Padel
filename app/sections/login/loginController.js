'use strict';
angular.module('app')
.controller('LoginController', ['$rootScope', '$scope', '$auth', '$location', function($rootScope, $scope, $auth, $location){

	var vm = this;
    this.login = function(){
        $auth.login({
            email: vm.email,
            contraseña: vm.password
        })
        .then(function(response){
            $rootScope.authentificated = true;
            $location.path('/');
        })
        .catch(function(response){
            // Si ha habido errores llegamos a esta parte
            $scope.errorLogin = response.data.message;
            swal("Error al entrar", $scope.errorLogin, "error");
        });
    }

}]);
