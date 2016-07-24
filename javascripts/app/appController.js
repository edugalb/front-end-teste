(function() {
    'use strict';

    angular.module('app')
        .controller('AppController', [
            '$scope',

            AppController
        ]);

    function AppController($scope, ) {

        var vm = this;
        vm.scope = $scope


    }

})