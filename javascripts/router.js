'use strict';

/**
 * Routes
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('/app/welcome');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'javascripts/app/app.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load([
                          'javascripts/components/sidenav/sidenavDirective.js',
                          'javascripts/components/userAvatar/userAvatarDirective.js',
                          ]);
                    }]
                  }

              })
              .state('app.simulador', {
                  url: '/simulador',
                  templateUrl: 'javascripts/simulador/simulador.html',
                  controller: 'SimuladorController',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load([
                          'javascripts/simulador/simuladorController.js',
                          'javascripts/components/toolbar/toolbarDirective.js',
                          'javascripts/components/formSimulador/formSimuladorDirective.js',
                          'javascripts/components/simuladorResultado/simuladorResultadoDirective.js',
                          'javascripts/components/selectAtividades/selectAtividadesDirective.js'
                          ]);
                    }]
                  }
              })
              .state('app.welcome', {
                  url: '/welcome',
                  templateUrl: 'javascripts/welcome/welcome.html',
                  controller: 'WelcomeController',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load([
                          'javascripts/welcome/welcomeController.js',
                          'javascripts/components/toolbar/toolbarDirective.js'
                          ]);
                    }]
                  }
              })
              
      }
    ]
  );

