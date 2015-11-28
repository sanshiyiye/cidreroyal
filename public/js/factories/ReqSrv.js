/**
 * Created by gaojun on 15/11/23.
 */

define([
    'angular',
    'lodash',
    'config'
  ],
  function (angular, _, config) {
    'use strict';

    var module = angular.module(config.name);
    module.factory('reqSrv', function ($http) {
      return {
        // login request
        login: function (username, password) {
          return $http.post('/login', {username: username, password: password});
        },
        // logout request
        logout: function (username, accesstoken) {
          return $http.post('/login', {username: username, accesstoken: accesstoken});
        },
      }
    });
  });