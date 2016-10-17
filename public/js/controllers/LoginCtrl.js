/**
 * Created by gaojun on 15/11/26.
 */

define(
  [],
  function () {
    'use strict';

    return ['$scope', '$state', 'authSrv',
      function ($scope, $state, authSrv) {
        /**
         * 用户信息
         * @type {{username: string, password: string, lslogin: boolean}}
         */
        $scope.user = {
          username: "",
          password: "",
          lslogin: false,
        };

        $scope.message = "";

        $scope.login = function () {
          authSrv.login($scope.user);
          //$state.go("signup",{});
        };
      }
    ];
  }
);
