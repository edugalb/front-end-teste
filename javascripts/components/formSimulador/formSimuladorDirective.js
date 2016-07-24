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


    function formIsValid() {
        var form = vm.scope.form;
        console.log(form)
        if (form.regime == 'lucro') {
            if (form.faturamento != 'R$ 00,00' && form.folha != 'R$ 00,00')
                return true;

        } else if (form.regime == 'simples') {
            if (form.faturamento != 'R$ 00,00' && form.folha != 'R$ 00,00' && form.fatanterior != 'R$ 00,00' && form.codatividade != '')
                return true;
        }

        return false;
    }

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

    function calculaLucro(query) {

        var account = Restangular.one("imposto/lucropresumido");
        account.get(query).then(function(data) {
            vm.scope.resultado = data;
            vm.scope.resultado.total = {
                'valor': 0,
                'aliquota': 0,
            }

            for (var x in data.objects) {
                vm.scope.resultado.total.valor += data.objects[x].valor;
                vm.scope.resultado.total.aliquota += data.objects[x].aliquota;
            }
            vm.scope.loadingdialog.hide();

        }, function(response) {
            appUtils.showErrorDialog("Error with status code", response.status)
        });
    }

    function calculaSimples(query) {
        var account = Restangular.one("imposto/simples");
        account.get(query).then(function(data) {
            vm.scope.resultado = data;
            vm.scope.resultado.total = {
                'valor': 0,
                'aliquota': 0,
            }

            for (var x in data.objects) {
                vm.scope.resultado.total.valor += data.objects[x].valor;
                vm.scope.resultado.total.aliquota += data.objects[x].aliquota;
            }
            vm.scope.loadingdialog.hide();

        }, function(response) {
            console.log("Error with status code", response.status);
        });
    }

    vm.scope.$watch(
        function() {
            return vm.scope.form.regime
        },
        function(newValue) {
            // if(newValue != '' && newValue != undefined){
            if (newValue == 'lucro') {
                appUtils.setFocusTime('faturamento')
            } else if (newValue == 'simples') {
                appUtils.setFocusTime('fatanterior')
            }
            //}
        }
    );



}