/**
 * Created by gaojun on 15/11/23.
 */

define(
  [
    'config',
    'lodash',

    '../util/reqMsg',
  ],
  function (config, _, reqMsg) {
    'use strict';

    return ['$http', function ($http) {
      var host = config.local_url;

      var msgData = reqMsg($http);

      // get i18n lang file
      msgData.getLang = function (lang) {
        return $http.post('/js/cfg/i18n/' + lang + '.json');
      };

      return msgData;
    }];
  }
);
