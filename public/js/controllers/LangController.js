/**
 * Created by gaojun on 15/11/19.
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

    // langController controller
    module.controller('langController', function ($rootScope) {
      $rootScope.language = config.default_language;

      /**
       * 切换语言
       * @param key 语言key
       */
      $rootScope.changeLang = function (key) {
        if (_.includes(config.languages, key)) {
          $rootScope.language = key;
        }
      }
    });
  });
