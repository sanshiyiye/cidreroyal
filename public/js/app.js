define(
  [
    // Standard Libs
    'lodash',
    'angular',

    'config',
    'lang',

    // Other Standard Libes
    // 'angularAnimate',
    'angularResource',
    'angularSanitize',
    'uiRouter',
    'ngCookies',
    'ngHttpAuth',
    'ngLocalStorage',
    'ngAnimate',
    'ngFx',
  ],
  function (_, angular, config) {
    var depLib = [
      'ngResource',
      'ngCookies',
      'http-auth-interceptor',
      'LocalStorageModule',
      // 'ngAnimate',
      'ngFx',
      'ui.router',
      config.name + '.controllers',
      config.name + '.routes',
      config.name + '.services',
      config.name + '.factories',
      config.name + '.directives',
      config.name + '.filters',
    ];

    //angular.module is a global place for creating, registering and retrieving Angular modules
    //'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    //the 2nd parameter is an array of 'requires'
    //'starter.services' is found in services.js
    //'starter.controllers' is found in controllers.js
    var app = angular.module(config.name, depLib);

    app.run(function ($rootScope) {
      $rootScope.$on('$routeChangeSuccess', function (next, last) {

      });
    });

    // load the core components
    require([
      './routes/routes',
      './controllers/all',
      './directives/all',
      './filters/all',
      './factories/all',
      './services/all'
    ], function () {
      // bootstrap the app
      config.local_url = config.l_web_url;
      $html = angular.element(document.getElementsByTagName('html')[0]);
      //$html.attr('ng-controller', 'appCtrl');
      angular.element().ready(function () {
        try {
          angular.bootstrap(document, [config.name]);
        } catch (e) {
          console.error(e.stack || e.message || e);
        }
      });
    });
  }
);

