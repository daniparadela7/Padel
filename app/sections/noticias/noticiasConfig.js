'use strict';
angular.module('app')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/noticias', {
		controller: 'NoticiasController',
		templateUrl: 'sections/noticias/noticiasView.html',
		resolve: {
			noticias: function(apiService) {
			    return apiService.getNodes('noticias');
			},
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	})
	.when('/noticias/:pretty', {
		controller: 'NoticiaController',
		templateUrl: 'sections/noticias/noticia/noticiaView.html',
		resolve: {
			noticia: function(apiService, $route) {
			    return apiService.getNode('noticias', $route.current.params.pretty);
			},
			delayForTransitions: function($timeout) {
                return $timeout(function(){
                    return true;
                }, 500);
            }
		}
	});
}]);
