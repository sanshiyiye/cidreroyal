/**
 * Created by gaojun on 15/11/20.
 */

define([
  'config',
], function (config) {
  // 加载默认语言
  var path = './cfg/i18n/' + config.default_language;
  require([
    path
  ], function (text) {
    config.lang = text;
  });
});
