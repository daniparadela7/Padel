'use strict';
angular.module('app')
.run(['$rootScope', '$window', '$location', '$routeParams', '$timeout', '$analytics', '$appConfig', '$auth', 'wdkFunctions', 'apiService', 'screenSize', function($rootScope, $window, $location, $routeParams, $timeout, $analytics, $appConfig, $auth, wdkFunctions, apiService, screenSize) {
	$rootScope.wdkFunctions = wdkFunctions;
	$rootScope.$appConfig = $appConfig;

	$(window).on('resize', function(){
		var windowHeight = $(window).outerHeight();
		$('.headerBG').outerHeight(windowHeight);
	});


	$rootScope.toggleVisible = function() {
		$rootScope.visibleMenu = !$rootScope.visibleMenu;
		$('.c-hamburger').toggleClass('is-active');
		if($rootScope.visibleMenu) {
			$('body, html').addClass('menu-mobile-in');
			if((screenSize.is('xs')) || (screenSize.is('sm'))){
				var windowHeight = $(window).outerHeight();
				$('.headerBG').outerHeight(windowHeight);
			}
		} else {
			$('body, html').removeClass('menu-mobile-in');
		}
	};

	//Actualizar nº notificaciones header
    $rootScope.getNotificaciones = function(){
        var idCliente = apiService.getId();
        var notificaciones = [];
        apiService.getNodes('notificaciones').then(function(data) {
            angular.forEach(data, function(value, key) {
                value.fecha_notificacion = moment(value.fecha_registro).format('DD/MM/YYYY HH:mm')
                if(value.recibe == idCliente){ if(value.leido == false){notificaciones.push(value);}}
            });
            $rootScope.numNotificaciones = notificaciones.length;
        });
    }

	$rootScope.$on('$routeChangeStart', function(){
		NProgress.start();
		if(($location.path() != '/registro')&&($location.path() != '/login')){
			if(!apiService.isAuthentificated()){
				$location.path('/login');
			}
			else{
				apiService.getId();
				$rootScope.authentificated = true;
				$rootScope.getNotificaciones();
			}
		}
	});
	
	$rootScope.$on('$routeChangeSuccess', function(){
		$timeout(function(){
			NProgress.done();
			wdkFunctions.init();
			$analytics.pageTrack($location.path());
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			$('.navbar-toggle').removeClass('is-active');
			$rootScope.htmlReady();
		}, 0);
	});

	$rootScope.$on('$routeChangeError', function(){
		NProgress.done();
		console.error('$routeChangeError');
	});

}]);
