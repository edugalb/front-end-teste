// Config

    angular.module('app') 
      .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  ) 
      .config(function($mdThemingProvider) {
  var customBlueMap =     $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
})
       .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
         angular.module('app').controller = $controllerProvider.register;
         angular.module('app').directive  = $compileProvider.directive;
         angular.module('app').filter     = $filterProvider.register;
         angular.module('app').factory    = $provide.factory;
         angular.module('app').service    = $provide.service;
         angular.module('app').constant   = $provide.constant;
         angular.module('app').value      = $provide.value;
    }
  ])
.config(function(RestangularProvider) {

  RestangularProvider.setBaseUrl('https://app-dot-contabilizei-jobs.appspot.com/rest/simulador/');

   // add a response interceptor
  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData = [];
      extractedData.objects = [];
      extractedData.errors = [];
      if (operation === "getList") {
        // .. and handle the data and meta data
        extractedData.objects = data.objects;
        extractedData.errors = data.errors;
        extractedData.success = data.success;
        //extractedData.meta = data.data.meta;
      } else {
        extractedData = data;
      }
      return extractedData;
    });
 })

 .directive('nextOnEnter', function() {
      return {
        restrict: 'AE',
        link: function($scope,elem,attrs) {

          elem.bind('keydown', function(e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
              e.preventDefault();
              document.querySelector('#'+attrs.nextOnEnter).focus();         
            }
          });
        }
      }
    })
.filter('currencyBRL', function() {
  return function(input) {
    var tmp = input+'';
    var res = tmp.replace('.','');
    tmp = res.replace(',','');
    var neg = false;
    if(tmp.indexOf('-') === 0){
      neg = true;
      tmp = tmp.replace('-','');
    }
    if(tmp.length === 1) {
      tmp = '0'+tmp;
    }
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    if( tmp.length > 6){
      tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    }
    if( tmp.length > 9){
      tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,'.$1.$2,$3');
    }
    if( tmp.length > 12){
      tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,'.$1.$2.$3,$4');
    }
    if(tmp.indexOf('.') === 0){
      tmp = tmp.replace('.','');
    }
    if(tmp.indexOf(',') === 0){
      tmp = tmp.replace(',','0,');
    }
    return (neg ? '-'+tmp : tmp);
  };
})
.directive('format', ['$filter', function ($filter) {
   return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            var format = {
                    prefix: 'R$ ',
                    centsSeparator: ',',
                    thousandsSeparator: '.'
                };

            ctrl.$parsers.unshift(function (value) {
               $('#'+elem[0].id).priceFormat(format);

                return elem[0].value;
            });

            ctrl.$formatters.unshift(function (value) {
                elem[0].value = ctrl.$modelValue * 100 ;
                $('#'+elem[0].id).priceFormat(format);
                return elem[0].value;
            })
        }
    };
}])
        // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  true,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      '../bower_components/ng-grid/build/ng-grid.min.js',
                      '../bower_components/ng-grid/ng-grid.min.css',
                      '../bower_components/ng-grid/ng-grid.bootstrap.css'
                  ]
              },
              {
                  name: 'ui.grid',
                  files: [
                      '../bower_components/angular-ui-grid/ui-grid.min.js',
                      '../bower_components/angular-ui-grid/ui-grid.min.css',
                      '../bower_components/angular-ui-grid/ui-grid.bootstrap.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      '../bower_components/angular-ui-select/dist/select.min.js',
                      '../bower_components/angular-ui-select/dist/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    '../bower_components/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['../bower_components/angular-ui-calendar/src/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      '../bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
                      '../bower_components/ngImgCrop/compile/minified/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      '../bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                      '../bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      '../bower_components/angularjs-toaster/toaster.js',
                      '../bower_components/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      '../bower_components/textAngular/dist/textAngular-sanitize.min.js',
                      '../bower_components/textAngular/dist/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      '../bower_components/venturocket-angular-slider/build/angular-slider.min.js',
                      '../bower_components/venturocket-angular-slider/build/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      '../bower_components/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      '../bower_components/videogular-controls/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      '../bower_components/videogular-buffering/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      '../bower_components/videogular-overlay-play/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      '../bower_components/videogular-poster/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      '../bower_components/videogular-ima-ads/ima-ads.min.js'
                  ]
              },
              {
                  name: 'xeditable',
                  files: [
                      '../bower_components/angular-xeditable/dist/js/xeditable.min.js',
                      '../bower_components/angular-xeditable/dist/css/xeditable.css'
                  ]
              },
              {
                  name: 'smart-table',
                  files: [
                      '../bower_components/angular-smart-table/dist/smart-table.min.js'
                  ]
              }
          ]
      });
  }])



