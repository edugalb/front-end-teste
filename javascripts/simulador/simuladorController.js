'use strict';

/**
 * SimuladorController
 */  
angular.module('app')
  .controller('SimuladorController', [
    '$scope',
    'appContainer',
    'appUtils',
    'Restangular',
    SimuladorController
]);
    
function SimuladorController($scope, appContainer, appUtils, Restangular) {

  var vm = this;
  vm.scope = $scope;
  vm.scope.resultado = [];
 // vm.scope.resultado.objects = [];
  vm.scope.appContainer = appContainer;
  vm.scope.appContainer.setElement(vm.scope, 'moduleName', 'Realize sua simulação');

           
}