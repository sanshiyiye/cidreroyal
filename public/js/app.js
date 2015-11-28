/**
 * Created by gaojun on 15/11/17.
 */

define([
  // Standard Libs
  'jquery',
  'lodash',
  'angular',

  'config',
  'lang',

  // routing
  'js/routes/routes',

  // Other Standard Libes
  'angular-route',
  'angular-cookies',
  'angular-bootstrap',
], function ($, _, angular, config, lang, routes) {
  "use strict";

  var apps_deps = [
    //'localization',
    'ngCookies',
    'ngRoute',
  ];

  var app = angular.module(config.name, apps_deps);

  // hook up routing
  app.config(function ($routeProvider) {
    _.each(routes, function (value, key) {
      $routeProvider.when(
        value.route, {
          templateUrl: value.templateUrl,
          controller: value.controller,
          title: value.title,
        }
      );
    });
    $routeProvider.otherwise({redirectTo: routes.login.route});
  });
  app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (next, last) {

    });
  });

  // load the core components
  require([
    'js/controllers/all',
    'js/directives/all',
    'js/filters/all',
    'js/factories/all',
    'js/services/all'
  ], function () {
    //angular.bootstrap(document, [config.name]);
    // bootstrap the app
    angular
      .element(document)
      .ready(function () {
        $('html').attr('ng-controller', 'appController');
        angular.bootstrap(document, [config.name]);
      });
  });
});
