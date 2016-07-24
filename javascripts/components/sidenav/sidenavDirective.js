angular.module('app')
  .directive('sideNavApp', sidenavDirective);

function sidenavDirective() {
    return {
        controller : sidenavController,
        controllerAs : '_ctrl',
        restrict: 'AE',
        replace: 'true',
        scope: {
            appContainer : '=?appContainer'
        },
        templateUrl: 'javascripts/components/sidenav/sidenavTemplate.html',
        link: function(scope, elem, attrs) { 
            scope.construct()
        },

    };
}

angular.module('app')
  .controller('appContainer','$scope', sidenavController);

function sidenavController(appContainer, $scope) {

  var vm = this;
  vm.scope = $scope;
  vm.scope.user = {};

  vm.scope.construct = construct;

  function construct(){

   
	vm.scope.menu = [
      {
        "icon": "md-icon",
        "title": "Simulador",
        "route": "simulador"
      },
      {
        "icon": "md-icon",
        "title": "Welcome",
        "route": "welcome"
      }
    ];

    loadUser();
  }

  function loadUser(){
     vm.scope.user = {
        'name': 'Eduardo Galbiati',
        'email': 'eduardo.galbiati7@gmail.com'
     };
  }


}


