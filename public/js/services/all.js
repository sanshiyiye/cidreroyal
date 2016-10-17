/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    // Standard Libs
    'angular',
    'lodash',
    'config',

    './Enum',
  ],
  function (angular, _, config
    , enums) {
    'use strict';

    var module = angular.module(config.name + ".services", []);

    module.service('enums', enums);
  }
);
