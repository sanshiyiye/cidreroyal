/**
 * Created by gaojun on 15/12/18.
 */

define(
  [
    'lodash',
  ],
  function (_) {
    'use strict';

    return ['$rootScope', 'localStorageService', 'reqSrv', 'enums',
      function ($rootScope, localStorageService, reqSrv, enums) {
        var brands;

        var getBrands = function () {
          return brands;
        };

        var buildBrands = function (brandList) {
          var list = {};

          // 处理品牌
          _.forEach(brandList, function (brand) {
            list["" + brand.id] = {
              id: brand.id,
              name: brand.name,
              letter: brand.letter,
            };
          });

          return list;
        };

        /**
         * 加载初始数据
         */
        var init = function () {
          // var promise = reqSrv.loadInitData();

          // promise.then(function (result) {
          //   if (200 === result.status
          //     && enums.ret.SUCCESS === result.data.ret) {

          //     brands = buildBrands(result.data.brandlist);

          //     // 缓存到本地
          //     localStorageService.set('init_brands', brands);
          //   } else {
          //     // 从本地缓存获取
          //     loadInitDataLocal();
          //   }
          // }, function (error) {
          //   // 从本地缓存获取
          //   loadInitDataLocal();
          // });
        };

        /**
         * 从本地历史缓存获取初始化数据(从服务端获取失败之后)
         */
        var loadInitDataLocal = function () {
          brands = localStorageService.get('init_brands') || {};
        };

        return {
          init: init,
          getBrands: getBrands,
        };
      }
    ];
  }
);
