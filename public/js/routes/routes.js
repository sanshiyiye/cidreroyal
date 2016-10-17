define([
  'angular',
  'config',
],
  function (angular, config) {
    var module = angular.module(config.name + '.routes', []);

    module.config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('main', {
            cache: false,
            url: '/main',
            templateUrl: 'views/mobile/main.html',
            controller: 'mainCtrl'
          })
          .state('main/home', {
            parent: 'main',
            url: '/home',
            templateUrl: 'views/mobile/home.html',
            controller: 'homeCtrl',
            params: {},
          })
          ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/main');
      }]);
  }
);


