'use strict';
angular.module('app')
.controller('RegistroController', ['$scope', '$appConfig', '$http', '$location', 'apiService', function($scope, $appConfig, $http, $location, apiService){
    $scope.Registro = function() {
        $scope.datosUsuario = {
            nombre : $scope.nombre,
            apellido : $scope.apellido,
            fecha_nacimiento: $scope.fecha_nacimiento,
            telefono: $scope.telefono,
            genero: $scope.genero,
            division: $scope.division,
            imagen: $scope.imagen,
            pretty_url: $scope.nombre + $scope.apellido + Math.floor(Math.random() * 100000000000),
            email: $scope.email,
            contraseña: $scope.password,
            partidos_jugados: 0,
            partidos_ganados: 0,
            partidos_perdidos: 0,
            puntos: 0
        };

        apiService.addNode('users', $scope.datosUsuario).then(function(data) {
            var usuario = data;
            console.log(usuario);
            if(usuario.status == 500){
                $scope.errorRegistro = usuario.data.message;
                swal("Error al registrarse", $scope.errorRegistro, "error");
            }
            else{
                $location.path('/login');
                swal("Te has registrado correctamente", "", "success");
            }
        });
    };

}]);
