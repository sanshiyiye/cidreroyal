/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    // Standard Libs
    'angular',
    'lodash',
    'config',

    './RepeatDone',
  ],
  function (angular, _, config
    , repeatDone) {
    'use strict';

    var module = angular.module(config.name + '.directives', []);

    module.directive('repeatDone', repeatDone);
  }
);
