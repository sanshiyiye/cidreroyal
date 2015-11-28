/**
 * Created by gaojun on 15/11/19.
 */

define([
    // Standard Libs
    'angular',
    'lodash',
    'config',

    // routing
    'js/routes/routes',
  ],
  function (angular, _, config, routes) {
    'use strict';

    var module = angular.module(config.name);

    // appController controller
    module.controller('appController', function ($scope) {
      $scope.navigation = routes;

    });
  });
