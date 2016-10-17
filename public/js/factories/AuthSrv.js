/**
 * Created by gaojun on 15/11/30.
 */

define(
  [],
  function () {
    'use strict';

    return ['$rootScope', '$http', 'authService', 'localStorageService', 'reqSrv', '$state',
      function ($rootScope, $http, authService, localStorageService, reqSrv, $state) {
        var login = function (user) {
          var promise = reqSrv.login(user);

          promise.success(function (data, status, headers, config) {
            $http.defaults.headers.common.Authorization = data.authToken;  // Step 1
            // A more secure approach would be to store the token in SharedPreferences for Android, and Keychain for iOS
            localStorageService.set('authorizationToken', data.authToken);

            // Need to inform the http-auth-interceptor that
            // the user has logged in successfully.  To do this, we pass in a function that
            // will configure the request headers with the authorization token so
            // previously failed requests(aka with status == 401) will be resent with the
            // authorization token placed in the header
            authService.loginConfirmed(data, function (config) {  // Step 2 & 3
              config.headers.Authorization = data.authToken;
              return config;
            });
          })
            .error(function (data, status, headers, config) {
              $rootScope.$broadcast('event:auth-login-failed', status);
            });
        };

        var logout = function () {
          var promise = reqSrv.logout();
          promise.finally(function (data) {
            localStorageService.remove('authorizationToken');
            delete $http.defaults.headers.common.Authorization;
            $rootScope.$broadcast('event:auth-logout-complete');
          });
        };

        var loginCancelled = function () {
          authService.loginCancelled();
        };

        return {
          login: login,
          logout: logout,
          loginCancelled: loginCancelled,
        };
      }
    ];
  }
);
