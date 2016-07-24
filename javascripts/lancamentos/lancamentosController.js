'use strict';

/**
 * LancamentosController
 */  
angular.module('app')
  .controller('LancamentosController', [
    '$scope',
    'appContainer',
    'appUtils',
    'Restangular',
    LancamentosController
]);
    
function LancamentosController($scope, appContainer, appUtils, Restangular) {

  var vm = this;
  vm.scope = $scope;
  vm.scope.atividade = false;
  vm.scope.calcula = calcula;
  vm.scope.resultado = [];
  vm.scope.form = {};
 // vm.scope.resultado.objects = [];
  vm.scope.formIsValid = formIsValid;
  vm.scope.appContainer = appContainer;
  vm.scope.appContainer.setElement(vm.scope, 'moduleName', 'Realize sua simulação');

  Restangular.all("atividades").getList().then(function(data) {
    vm.scope.atividades = data.objects.map( function (state) {
                return {
                    value: state.cod+' - '+state.descricao,
                    display: state.cod+' - '+state.descricao,
                    cod: state.cod
                };
            });
  }, function(response) {
    console.log("Error with status code", response.status);
  });

$scope.selected = [];
  $scope.query = {
    order: 'valor',
    limit: 5,
    page: 1
  };

  function formIsValid()
  {
    return true;
  }
  function calcula(){
    var regime = vm.scope.form.regime;
    console.log(regime);
    if(regime == 'lucro'){
      var data = {
        "faturamento": vm.scope.form.faturamento,
        "folha": vm.scope.form.folha
      };
      return calculaLucro(data)
    }else{
       var data = {
        "faturamento":vm.scope.form.faturamento,
        "folha":vm.scope.form.folha,
        "fatanterior":vm.scope.form.fatanterior,
        "codatividade":vm.scope.form.codatividade,
      };
      return calculaSimples(data)

    }
  }

  function calculaLucro(query){

    var account = Restangular.one("imposto/lucropresumido");
    account.get(query).then(function(data) {
      vm.scope.resultado = data;
      vm.scope.resultado.total = {
        'valor': 0,
        'aliquota': 0,
      }

      for(var x in data.objects){
        vm.scope.resultado.total.valor += data.objects[x].valor;
        vm.scope.resultado.total.aliquota += data.objects[x].aliquota;
      }
     
    }, function(response) {
      console.log("Error with status code", response.status);
    });
  }

  function calculaSimples(query){
    var account = Restangular.one("imposto/simples");
    account.get(query).then(function(data) {
      vm.scope.resultado = data;
      vm.scope.resultado.total = {
        'valor': 0,
        'aliquota': 0,
      }

      for(var x in data.objects){
        vm.scope.resultado.total.valor += data.objects[x].valor;
        vm.scope.resultado.total.aliquota += data.objects[x].aliquota;
      }
    }, function(response) {
      console.log("Error with status code", response.status);
    });
  }

  vm.scope.$watch(
                function(){
                  return vm.scope.form.regime
                }, 
                function(newValue) {
                 // if(newValue != '' && newValue != undefined){
                    if(newValue == 'lucro'){
                      appUtils.setFocusTime('faturamento')
                    }else if(newValue == 'simples'){
                      appUtils.setFocusTime('fatanterior')
                    }
                  //}
            }
          );          
}