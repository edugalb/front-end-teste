angular.module('app')
	.directive('simuladorResultado', simuladorResultadoDirective)

function simuladorResultadoDirective() {
    return {
  	    controller : simuladorResultadoController,
  	    controllerAs : 'ctrl',
        restrict: 'AE',
        replace: 'true',
        scope: {
        	resultado : '=?resultado'
        },
        templateUrl: 'javascripts/components/simuladorResultado/simuladorResultadoTemplate.html',
        link: function(scope, elem, attrs) { 
        	scope.construct()
        },

    };
}



angular.module('app')
	.controller('simuladorResultadoController', '$scope', 'Restangular', '$q', simuladorResultadoController );


	function simuladorResultadoController($scope, Restangular, $q) {
		var vm = this;
		vm.scope = $scope;
		vm.scope.construct = construct;

		function construct()
		{
			//loadElements();
		}
      	


	}

