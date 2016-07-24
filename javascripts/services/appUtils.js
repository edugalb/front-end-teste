   angular.module('app')
       .service('appUtils', ['$timeout', '$mdDialog', appUtils]);

   function appUtils($timeout, $mdDialog) {
       return {
           //getCustomers: getCustomers,
           setFocusTime: setFocusTime,
           setValue: setValue,
           getValue: getValue,
           setFocus: setFocus,
           getYear: getYear,
           getDataHora: getDataHora,
           getData: getData,
           arrumaData: arrumaData,
           trataNome: trataNome,
           showErrorDialog: showErrorDialog,
           showCalculandoDialog: showCalculandoDialog,
           valueFormat: valueFormat
       };

       function setFocusTime(idElemento) {
           $timeout(function() {
               angular.element(document.querySelector('#' + idElemento)).focus();
           }, 500)
       }

       function setValue(idElemento, value) {
           angular.element(document.querySelector('#' + idElemento)).val(value);
       }

       function getValue(idElemento) {
           return angular.element(document.querySelector('#' + idElemento)).val();
       }

       function setFocus(idElemento) {
           angular.element(document.querySelector('#' + idElemento)).focus()
       }

       function getYear() {
           var td = new Date();
           var today = td.getFullYear();
           return today
       }

       function getDataHora() {
           var td = new Date();
           var today = td.getFullYear() + '-' + (td.getMonth() + 1) + '-' + td.getDate() + ' ' + td.getHours() + ':' + td.getMinutes() + ':' + td.getSeconds();
           return today
       }

       function getData() {
           var td = new Date();
           var today = td.getFullYear() + '-' + (td.getMonth() + 1) + '-' + td.getDate();
           return today
       }

       function arrumaData(date) {
           return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
       }

       function trataNome(str) {
           str_acento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
           str_sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
           var nova = "";
           for (var i = 0; i < str.length; i++) {
               if (str_acento.indexOf(str.charAt(i)) != -1) {
                   nova += str_sem_acento.substr(str_acento.search(str.substr(i, 1)), 1);
               } else {
                   nova += str.substr(i, 1);
               }
           }
           nova = nova.toUpperCase();
           return nova;
       }

       function showErrorDialog(msg, errors) {

           var dialog = $mdDialog;
           console.log(errors);
           var str = '<ul>';
           for (var x in errors) {
               str += '<li>' + errors[x] + '</li>'
           }
           str += '</ul>';

           var customTemplate = '<md-dialog style="max-width:30%;" flex>' +
               '  <md-dialog-content class="md-padding open-file-dialog">' +
               '   Erro ao processar a requisição<br> ' +
               ' <h4>' + msg + '</h4>' +
               str +
               '    </md-dialog-content>' +
               '  <md-dialog-actions>' +
               '    <md-button ng-click="closeDialog();" class="md-primary">' +
               '     FECHAR' +
               '    </md-button>' +
               '  </md-dialog-actions>' +
               '</md-dialog>';
           dialog.show({
               clickOutsideToClose: true,
               template: customTemplate,
               controller: function DialogController($scope, $mdDialog) {
                   $scope.closeDialog = function() {
                       $mdDialog.hide();
                   }
               }
           });

       }

       function showCalculandoDialog() {
           var dialog = $mdDialog;

           var customTemplate = '<md-dialog style="max-width:45%;" flex>' +
               '  <md-dialog-content class="md-padding open-file-dialog">' +
               '   Calculando...<br> ' +
               '  <md-progress-linear md-mode="indeterminate"></md-progress-linear>' +
               '    </md-dialog-content>' +
               '  <md-dialog-actions>' +
               '    <md-button ng-click="closeDialog();" class="md-primary">' +
               '     FECHAR' +
               '    </md-button>' +
               '  </md-dialog-actions>' +
               '</md-dialog>';
           dialog.show({
               clickOutsideToClose: true,
               template: customTemplate,
               controller: function DialogController($scope, $mdDialog) {
                   $scope.closeDialog = function() {
                       $mdDialog.hide();
                   }
               }
           });
           return dialog;

       }

       function valueFormat(value) {
           value = value.replace("R$ ", "");
           value = value.replace(/\./g, "");
           value = value.replace(",", ".");
           return value;
       }


   }