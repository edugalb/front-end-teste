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
              .otherwise('/app/dashboard');
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
              .state('app.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'javascripts/dashboard/dashboard.html',
                  controller: 'DashboardController',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load([
                          'javascripts/dashboard/dashboardController.js',
                          'javascripts/components/toolbar/toolbarDirective.js'
                          ]);
                    }]
                  }
              })
              .state('app.welcome', {
                  url: '/welcome',
                  templateUrl: 'javascripts/welcome/welcome.html',
                  controller: 'DashboardController',
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
              .state('app.lancamentos', {
                  url: '/lancamentos',
                  templateUrl: 'javascripts/lancamentos/lancamentos.html',
                  controller: 'LancamentosController',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load([
                          'javascripts/lancamentos/lancamentosController.js',
                          'javascripts/components/toolbar/toolbarDirective.js',
                          'javascripts/components/selectAtividades/selectAtividadesDirective.js'
                          ]);
                    }]
                  }
              })
             /* .state('app.impostolucro', {
                  url: '/impostoslucro',
                  templateUrl: 'javascripts/impostoslucro/dashboard.html',
                  controller: 'DashboardController',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load([
                          'javascripts/welcome/dashboardController.js',
                          'javascripts/components/toolbar/toolbarDirective.js'
                          ]);
                    }]
                  }
              })*/
              
      }
    ]
  );

