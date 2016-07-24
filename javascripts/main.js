'use strict';

/**
 * AppController
 * the base controller
 */  
angular.module('app')
  .controller('AppController', [
    '$scope',
    'appContainer',
    AppController
]);
    
function AppController($scope, appContainer) {

   var vm = this;
   vm.scope = $scope
   vm.scope.config = {
   	 'version' : '2.0.0'

   }

   appContainer.define(vm.scope, {
            'elements' : {
              'moduleName': ''
            }
    })

}











