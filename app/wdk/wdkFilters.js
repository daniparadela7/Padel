'use strict';
angular.module('app')
.filter('html', function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	};
})

.filter('limitHtml', function() {
	return function(text, limit) {
		var changedString = String(text).replace(/<[^>]+>/gm, '');
		return changedString.length > limit ? changedString.substr(0, limit - 2) + '...' : changedString;
	};
});
