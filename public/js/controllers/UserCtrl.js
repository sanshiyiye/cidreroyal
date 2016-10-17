/**
 * Created by gaojun on 15/11/26.
 */

define([],
  function () {
    'use strict';

    return ['$scope', '$state', 'authSrv',
      function ($scope, $state, authSrv) {

        $scope.logout = function () {
          authSrv.logout();
        };

        /**
         * 显示车详情页面
         * @param id 车辆id
         */
        $scope.showCarDetail = function (id) {
          $state.go('carDetail', {id: id});
        };
      }
    ];
  });
