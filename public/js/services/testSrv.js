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

    // testService Service
    module.service('testService', function ($scope) {

    });
  });
