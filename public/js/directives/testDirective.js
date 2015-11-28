/**
 * Created by gaojun on 15/11/20.
 */

define([
    // Standard Libs
    'angular',
    'lodash',
    'config',
  ],
  function (angular, _, config) {
    'use strict';

    var module = angular.module(config.name);

    // testDirective directive
    module.directive('testDirective', function ($scope) {
    });
  });
