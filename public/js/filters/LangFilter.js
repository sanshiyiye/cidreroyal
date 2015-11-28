/**
 * Created by gaojun on 15/11/20.
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

    // i18nFilter filter, use for i18n lang translate
    module.filter('i18n', ['localizedTexts', '$rootScope', function (localizedTexts, $rootScope) {
      // translate filter function
      return function (text, label) {
        if (!_.isUndefined(label)
          && !_.isNull(label)
          && label.toString().length > 0) {
          var curLang = $rootScope.language || config.default_language;

          // 验证key是否存在
          if (localizedTexts[curLang][label].hasOwnProperty(text)) {
            return localizedTexts[curLang][label][text];
          }
        }
        return text;
      };
    }]);

    // 加载语言配置
    module.value('localizedTexts', config.lang);
  });
