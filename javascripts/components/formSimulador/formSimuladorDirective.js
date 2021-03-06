angular.module('app')
    .directive('formSimulador', formSimuladorDirective)

function formSimuladorDirective() {
    return {
        controller: formSimuladorController,
        controllerAs: 'ctrl',
        restrict: 'AE',
        replace: 'true',
        scope: {
            form: '=?form',
            resultado: '=?resultado',
        },
        templateUrl: 'javascripts/components/formSimulador/formSimuladorTemplate.html',
        link: function(scope, elem, attrs) {
            scope.construct()
        },

    };
}



angular.module('app')
    .controller('formSimuladorController', '$scope', 'Restangular', '$q', 'appUtils', formSimuladorController);


function formSimuladorController($scope, Restangular, $q, appUtils) {
    var vm = this;
    vm.scope = $scope;
    vm.scope.construct = construct;
    vm.scope.formIsValid = formIsValid;
    vm.scope.calcula = calcula;

    vm.scope.atividade = false;

    function construct() {
        vm.scope.form = {
            "regime": false,
            "faturamento": "R$ 00,00",
            "folha": "R$ 00,00",
            "fatanterior": "R$ 00,00",
            "atividade": false
        };
    }
    /**
    * Form Validator
    */
    function formIsValid() {
        var form = vm.scope.form;
        if (form.regime == 'lucro') {
            if (form.faturamento != 'R$ 00,00' && form.folha != 'R$ 00,00')
                return true;

        } else if (form.regime == 'simples') {
            if (form.faturamento != 'R$ 00,00' && form.folha != 'R$ 00,00' && form.fatanterior != 'R$ 00,00' && form.codatividade != '')
                return true;
        }

        return false;
    }

    // Calcula Factory
    function calcula() {
        vm.scope.loadingdialog = appUtils.showCalculandoDialog();
        var regime = vm.scope.form.regime;
        var faturamento = appUtils.valueFormat(vm.scope.form.faturamento);
        var folha = appUtils.valueFormat(vm.scope.form.folha);

        if (regime == 'lucro') {
            var data = {
                "faturamento": faturamento,
                "folha": folha
            };
            return calculaLucro(data)
        } else {
            var fatanterior = appUtils.valueFormat(vm.scope.form.fatanterior);
            var data = {
                "faturamento": faturamento,
                "folha": folha,
                "fatanterior": fatanterior,
                "codatividade": vm.scope.form.atividade.cod,
            };
            return calculaSimples(data)

        }
    }

    function geraSomatoria(data) {
        vm.scope.resultado.total = {
            'valor': 0,
            'aliquota': 0,
        }

        for (var x in data.objects) {
            vm.scope.resultado.total.valor += parseFloat(data.objects[x].valor);
            vm.scope.resultado.total.valor = parseFloat(vm.scope.resultado.total.valor.toFixed(2));
            vm.scope.resultado.total.aliquota += parseFloat(data.objects[x].aliquota.toFixed(2));
            vm.scope.resultado.total.aliquota = parseFloat(vm.scope.resultado.total.aliquota.toFixed(2));
        }
    }

    function calculaLucro(query) {

        var account = Restangular.one("imposto/lucropresumido");
        account.get(query).then(function(data) {
            if (data.success != true)
                return appUtils.showErrorDialog("", data.errors)
            vm.scope.resultado = data;

            geraSomatoria(data);

            vm.scope.loadingdialog.hide();

        }, function(response) {
            appUtils.showErrorDialog("Error with status code", response.status)
        });
    }

    function calculaSimples(query) {
        var account = Restangular.one("imposto/simples");
        account.get(query).then(function(data) {
            if (data.success != true)
                return appUtils.showErrorDialog("", data.errors)
            vm.scope.resultado = data;


            geraSomatoria(data);

            vm.scope.loadingdialog.hide();

        }, function(response) {
            appUtils.showErrorDialog("Error with status code", response.status)
        });
    }

    vm.scope.$watch(
        function() {
            return vm.scope.form.regime
        },
        function(newValue) {
            if (newValue == 'lucro') {
                appUtils.setFocusTime('faturamento')
                vm.scope.nextOnEnter = 'btnCalcular';
            } else if (newValue == 'simples') {
                appUtils.setFocusTime('fatanterior')
                vm.scope.nextOnEnter = 'atividades';
            }
        }
    );



}