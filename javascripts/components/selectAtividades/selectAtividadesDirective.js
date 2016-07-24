angular.module('app')
	.directive('selectAtividades', selectAtividadesDirective)

function selectAtividadesDirective() {
    return {
  	    controller : selectAtividadesController,
  	    controllerAs : 'ctrl',
        restrict: 'AE',
        replace: 'true',
        scope: {
        	atividade : '=?atividade'
        },
        templateUrl: 'javascripts/components/selectAtividades/selectAtividadesTemplate.html',
        link: function(scope, elem, attrs) { 
        	scope.construct()
        },

    };
}



angular.module('app')
	.controller('selectAtividadesController', '$scope', 'Restangular', '$q', selectAtividadesController );


	function selectAtividadesController($scope, Restangular, $q) {
		var vm = this;
		vm.scope = $scope;
		vm.scope.construct = construct;

		vm.scope.searchTextChange = searchTextChange
		vm.scope.selectedItemChange = selectedItemChange
		vm.scope.createFilterFor = createFilterFor
		vm.scope.querySearch = querySearch
		vm.scope.loadElements = loadElements
		vm.scope.elements = [];

		function construct()
		{
			loadElements();
		}
		function loadElements() {
			/*ClientesActiveRecord.getClientesForSearchWithoutCpf().then(function (data, err) {

	                  //Aplicar a tratativa de erros, estudar como manipular as promisses
                if(vm.scope.somenteNome == true){
                	 vm.scope.elements = data.map( function (state) {
	                    return {
	                        value: state.nomeCliente.toLowerCase()+' '+state.cpf,
	                        display: state.nomeCliente,
	                        idCliente: state.idCliente
	                    };
	                });
                }else{
	                 vm.scope.elements = data.map( function (state) {
	                    return {
	                        value: state.nomeCliente.toLowerCase()+' '+state.cpf,
	                        display: state.nomeCliente+' - '+state.cpf,
	                        idCliente: state.idCliente
	                    };
	                });
	            }
	                 
	        }).catch(function (err){
	              vm.scope.showErrorDialog(err);
	        });*/
	         Restangular.all("atividades").getList().then(function(data) {
			    console.log(data);
			    //vm.scope.atividades = data.objects;
			    vm.scope.elements = data.objects.map( function (state) {
			    	console.log(state);
	                    return {
	                        value: state.cod+' - '+state.descricao,
	                        display: state.cod+' - '+state.descricao,
	                        cod: state.cod
	                    };
	                });
			  }, function(response) {
			    console.log("Error with status code", response.status);
			  });
		}

        function querySearch (query) {
        	console.log('query')
          	var  deferred;
            deferred = $q.defer();
              var results = query ?  vm.scope.elements.filter( createFilterFor(query) ) :  vm.scope.elements
              deferred.resolve( results ); 
            return deferred.promise;
          
        }

		function searchTextChange(text) {
          //$log.info('Text changed to ' + text);
        }
        function selectedItemChange(item) {
        	console.log('Item changed to ' + JSON.stringify(item));
        	vm.scope.atividade = item;
        	/*if(vm.scope.somenteNome != true){
				if(item !== undefined){
					selectCliente(item.idCliente);
					appUtils.setValue('acForSearch', '');
					appUtils.setFocus('hiddenToSkip');
					//vm.scope.ctrl.searchText = '';
				}
			}else{
				if(item !== undefined){
					selectCliente(item.idCliente);
					appUtils.setFocus('telefone1');
					//vm.scope.ctrl.searchText = '';
				}
				appUtils.setFocus('telefone1');
			}*/

        }
 
        /**
         * Create filter function for a query string
         */
        function splitQuery(query){
          return [{value:query}];
          return query.split(" ").map( function (word) {
                  return {
                    value: word,
                  };
                });
        }
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);
          return function filterFn(state) {
                var arrS = splitQuery(lowercaseQuery);
                for(var x in arrS){

                  if(state.value.indexOf(arrS[x].value) >= 0){
                      return true
                  }
                }
                return false;
          };
        }
      	


	}

