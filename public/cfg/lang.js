/**
 * Created by gaojun on 15/11/20.
 */

define([
  'config',
], function (config) {
  var langtext = {};

  // 遍历所有语言，获取语言配置
  _.forEach(config.languages, function (key) {
    var path = './cfg/i18n/' + key;
    require([
      path
    ], function (text) {
      langtext[key] = text;

      config.lang = langtext;
    });
  });
});