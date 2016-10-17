/**
 * Created by gaojun on 15/11/28.
 */

define(
  [
    'config',
    'lodash',
    'sprintf',
  ],
  function (config, _, sprintf) {
    'use strict';

    return ['$rootScope', 'reqSrv', '$q',
      function ($rootScope, reqSrv, $q) {
        var localize = {
          //  默认语言设置
          language: config.default_language,

          //  翻译字典
          dictionary: undefined,

          //  标识翻译文件是否加载
          resourceFileLoaded: false,

          successCallback: function (data) {
            if (!localize.dictionary) {
              localize.dictionary = data;
            } else {
              _.each(data, function (value, key) {
                localize.dictionary[key] = value;
              });
            }

            // 设置标识为true
            localize.resourceFileLoaded = true;

            // 广播信息给所有子scope
            $rootScope.$broadcast('localizeResourcesUpdates');
          },
          initLocalizedResources: function (lang) {
            var deferred = $q.defer();
            if (lang) {
              localize.language = lang;
            } else {
              // 无入参，直接获取config中翻译信息(app初始化时已经加载了默认语言)
              localize.dictionary = config.lang;
              return;
            }

            // 修改方式，使用js的加载方式而不用json方式
            var path = './cfg/i18n/' + localize.language;
            require([
              path
            ], function (data) {
              localize.successCallback(data);
              deferred.resolve();
            });

            // json加载方式，暂时不使用
            //var promise = reqSrv.getLang(localize.language);
            //promise
            //  .success(localize.successCallback)
            //  .error(function (error) {
            //    //  TODO what happens if this call fails?
            //  });
            return deferred.promise;
          },

          getLocalizedString: function (value) {
            //  Contextualize missing translation
            var translated = '!' + value[0] + '!';

            var transFuc = function () {
              //  make sure the dictionary has valid data
              if (typeof localize.dictionary === "object") {
                var placeholders = [];

                // 特殊参数
                for (var i = 1; i < value.length; i++) {
                  placeholders.push(value[i]);
                }

                var translate = function (value, placeholders) {
                  placeholders = placeholders || null;
                  var translated = localize.dictionary[value];

                  if (_.isUndefined(translated) || _.isNull(translated)) {
                    return sprintf.sprintf(value, placeholders);
                  }

                  return sprintf.sprintf(translated, placeholders);
                };

                var result = translate(value[0], placeholders);
                if ((translated !== null) && (translated != undefined)) {
                  //  set the translated
                  translated = result;
                }
              }
            };

            // 调用翻译
            transFuc();

            return translated;
          }
        };

        // 初始化
        localize.initLocalizedResources();

        return localize;
      }];
  });
