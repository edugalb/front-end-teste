angular.module('app')
    .directive('toolbarApp', toolbarDirective);

function toolbarDirective() {
    return {
        controller: toolbarController,
        controllerAs: '_ctrl',
        restrict: 'AE',
        replace: 'true',
        scope: {
            appContainer: '=?appContainer'
        },
        templateUrl: 'javascripts/components/toolbar/toolbarTemplate.html',
        link: function(scope, elem, attrs) {
            scope.construct()
        },

    };
}

angular.module('app')
    .controller('appContainer', '$scope', toolbarController);

function toolbarController(appContainer, $scope) {

    var vm = this;
    vm.scope = $scope;
    vm.scope.user = {};

    vm.scope.construct = construct;

    function construct() {
        vm.scope.moduleName = appContainer.getElement(vm.scope, 'moduleName')

    }



}