/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    // Standard Libs
    'angular',
    'lodash',
    'config',

    './I18nFilter',
  ],
  function (angular, _, config
    , i18nFilter) {
    'use strict';

    var module = angular.module(config.name + '.filters', []);

    module.filter('i18n', i18nFilter);
  }
);
