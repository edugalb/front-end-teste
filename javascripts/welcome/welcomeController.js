'use strict';

/**
 * WelcomeController
 */
angular.module('app')
    .controller('WelcomeController', [
        '$scope',
        'appContainer',
        'appUtils',
        WelcomeController
    ]);

function WelcomeController($scope, appContainer, appUtils) {

    var vm = this;
    vm.scope = $scope;
    var vm = this;
    vm.scope = $scope;
    vm.scope.resultado = [];
    // vm.scope.resultado.objects = [];
    vm.scope.appContainer = appContainer;
    vm.scope.appContainer.setElement(vm.scope, 'moduleName', 'Welcome my friend');

}