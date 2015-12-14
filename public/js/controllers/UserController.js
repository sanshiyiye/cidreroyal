/**
 * Created by gaojun on 15/11/23.
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

    // appController controller
    module.controller('userController', function ($scope, $rootScope, authSrv) {
      /**
       * user's login information
       * @type {{userName: string, password: string, isLogin: boolean}}
       */
      $scope.user = {
        userName: "",
        isLogin: false
      };

      /**
       * init userinfo
       */
      $scope.userInit = function(){
        if (authSrv.isLogin()) {
          $scope.user.isLogin = true;
//          user_load("true");
        } else {
          $rootScope.loginPage()
        }
      };

      /**
       * if the response matches user's input
       * then place the response data to $rootScope
       * and redirect to the user's view page
       *
       * @param data:boolean  the response status
       */
      $rootScope.loginPage = function(data){
        // data match
        if (data === "true") {
          $scope.user.userName = authSrv.getUserInfo().userName;
          $scope.user.isLogin = true;

          $location.path("/page/logstat/logmanage");
        }
        // data not match
        else {
          // show user that the input password is wrong
          //alertSrv.set("ALERT.ERROR", "ALERT.USER.USERNAME_PASSWORD_ERROR", 'error');
        }
      }
    });
  });
