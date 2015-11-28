/**
 * Created by gaojun on 15/11/20.
 */

define([
    'angular',
    'lodash',
    'config'
  ],
  function (angular, _, config) {
    'use strict';

    var module = angular.module(config.name);
    module.factory('authSrv', function ($http, $q, $window, alertSrv, reqSrv) {
      var userInfo;

      function getUserInfo() {
        return userInfo;
      }

      function isLogin() {
        return (!_.isUndefined(userInfo) && null != userInfo && "" != userInfo)
      }

      /**
       * login function
       * @param userName: login username
       * @param password: login password
       */
      function login(userName, password) {
        var deferred = $q.defer();

        // 登陆请求
        var promise = reqSrv.login(userName, password);

        promise.then(function (result) {
          if (200 === result.status) {
            userInfo = {
              accessToken: result.data.accessToken,
              userName: result.data.userName
            };
            $window.sessionStorage[config.cookie_user_name] = JSON.stringify(userInfo);
            deferred.resolve(userInfo);
          } else {
//            alertSrv.set("ALERT.ERROR", "ALERT.ES.UNABLE_CONTACT", 'error');
            deferred.reject("error: http response status :" + result.status);
          }
        }, function (error) {
          deferred.reject(error);
        });

        return deferred.promise;
      }


      /**
       * logout function
       */
      function logout() {
        var deferred = $q.defer();

        // 登陆请求
        var promise = reqSrv.logout(userInfo.userName, userInfo.accessToken);

        promise.then(function (result) {
          if (200 === result.status) {
            $window.sessionStorage[config.cookie_user_name] = null;
            userInfo = null;
            deferred.resolve(result);
          } else {
            deferred.reject("error: http response status :" + result.status);
          }
        }, function (error) {
          deferred.reject(error);
        });

        return deferred.promise;
      }

      /**
       * get cookie
       * @param key       cookie's key
       * @returns {*}
       */
      function getCookie(key) {
        if (document.cookie.length > 0) {
          var c_start = document.cookie.indexOf(key + "=");
          if (c_start != -1) {
            c_start = c_start + key.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
              c_end = document.cookie.length;

            return unescape(document.cookie.substring(c_start, c_end));
          }
        }
        return "";
      }

      /**
       * set cookie
       * @param key       cookie's key
       * @param value     cookie's value
       */
      function setCookie(key, value) {
        var expirationDate = new Date().getTime() + config.cookie_expiration_time;
        var exdate = new Date(expirationDate);
        document.cookie = key + "=" + escape(value) + "; expires=" + exdate.toGMTString() + ";path=/";
      }

      /**
       * remove cookie
       * @param key       cookie's key
       */
      function removeCookie(key) {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() - 1);
        document.cookie = key + "=;expires=" + exdate.toGMTString() + ";path=/";
      }

      function init() {
        if ($window.sessionStorage[config.cookie_user_name]) {
          userInfo = JSON.parse($window.sessionStorage[config.cookie_user_name]);
        }
      }

      init();

      return {
        getUserInfo: getUserInfo,
        isLogin: isLogin,
        login: login,
        logout: logout
      };
    });

  });