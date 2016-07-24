'use strict';

/**
 * WelcomeController
 */  
angular.module('app')
  .controller('WelcomeController', [
    '$scope',
    WelcomeController
]);
    
function WelcomeController($scope) {

   var vm = this;
   vm.scope = $scope;
   
}