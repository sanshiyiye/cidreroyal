/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    'lodash',
  ],
  function (_) {
    'use strict';

    return ['$scope', 'reqSrv', '$state', '$rootScope',
      function ($scope, reqSrv, $state, $rootScope) {

        // controller 加载完成后再加载 幻灯片的js文件，否则可能取不到页面幻灯片对象
        require([
          'wowslider',
          'wowsliderscript'
        ], function () { });

        $scope.home = {

        };
      }];
  });
