'use strict';
angular.module('app')
.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-position': '50% 50%',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            'height': attrs.height + 'px' || '100px'
        });
    };
})
.directive('prettyp', function(){
    return function(scope, element, attrs){
        $("[rel^='prettyPhoto']").prettyPhoto({deeplinking: false, social_tools: false, allow_expand: false});
    } 
})
.directive('datepicker', [function() {
    var link;
    link = function(scope, element, attr, ngModel) {
        element.datetimepicker({
            locale: 'es',
            format: 'DD/MM/YYYY',
            minDate:  moment(),
            maxDate: moment().add(14, 'days'),
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down",
                next: "fa fa-arrow-right",
                previous: "fa fa-arrow-left"
            }
        });
      element.on('dp.change', function(event) {
        //need to run digest cycle for applying bindings
        scope.$apply(function() {
          ngModel.$setViewValue(event.date);
        });
      });
    };

    return {
      restrict: 'A',
      link: link,
      require: 'ngModel'
    };
    }
])
.directive('starRating',function() {
    return {
        restrict : 'A',
        template : '<ul class="rating">'
           + ' <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
           + '  <i class="fa fa-star"></i>'
           + ' </li>'
           + '</ul>',
        scope : {
         ratingValue : '=',
         max : '=',
         onRatingSelected : '&'
        },
        link : function(scope, elem, attrs) {
         var updateStars = function() {
          scope.stars = [];
          for ( var i = 0; i < scope.max; i++) {
           scope.stars.push({
            filled : i < scope.ratingValue
           });
          }
         };
         
         scope.toggle = function(index) {
          scope.ratingValue = index + 1;
          scope.onRatingSelected({
           rating : index + 1
          });
         };
         
         scope.$watch('ratingValue',
          function(oldVal, newVal) {
           if (newVal) {
            updateStars();
           }
          }
         );
        }
    };
});

