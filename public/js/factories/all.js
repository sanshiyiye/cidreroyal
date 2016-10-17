/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    // Standard Libs
    'angular',
    'lodash',
    'config',

    './ReqSrv',
    './I18nSrv',
    './AuthSrv',
    './DataSrv',
  ],
  function (angular, _, config
    , reqSrv, i18nSrv, authSrv, dataSrv) {
    'use strict';

    var module = angular.module(config.name + '.factories', []);

    module.factory('reqSrv', reqSrv);
    module.factory('i18nSrv', i18nSrv);
    module.factory('authSrv', authSrv);
    module.factory('dataSrv', dataSrv);
  }
);
