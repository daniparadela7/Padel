'use strict';
angular.module('app')
.config(['$routeProvider', '$locationProvider', '$analyticsProvider', '$authProvider', '$appConfig', function($routeProvider, $locationProvider, $analyticsProvider, $authProvider, $appConfig) {

	// Parametros de configuración login
    $authProvider.loginUrl = $appConfig.apiUrl + 'auth/login';
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "app",

	$locationProvider.hashPrefix('!');
	$locationProvider.html5Mode(true);

	NProgress.configure({ easing: 'ease', speed: 500, trickleRate: 0.02, trickleSpeed: 800, showSpinner: false, minimum: 0.7});

	$analyticsProvider.virtualPageviews(false);

	$routeProvider
	.otherwise({ redirectTo: '/' });
}]);
