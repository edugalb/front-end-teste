 angular.module('app')
   .directive('userAvatar', function() {
    return {
      replace: true,
      template: '<div layout="row" layout-align="center end"><img class="img-circle" src="assets/img/eu.png"></div>'
    };
});