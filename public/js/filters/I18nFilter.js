/**
 * Created by gaojun on 15/11/28.
 */

define(
  [],
  function () {
    'use strict';

    return ['i18nSrv', function (i18nSrv) {
      return function () {
        return i18nSrv.getLocalizedString(arguments) ;
      }
    }];
  });
