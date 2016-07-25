/**
 * WineManager.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseManager = require(config.serverRoot + '/manager/base/BaseManager');

/**
 * 酒类型信息表管理器
 *
 * @constructor
 */
var WineManager = function () {
  var _this = this;

  /**
   * 获取酒类信息列表
   * 
   * @param {any} wineGetWineListMsg 请求获取酒列表消息对象
   * @param {any} res response对象
   */
  this.getWineList = function (wineGetWineListMsg, res) {
    // 消息返回
    var backMsg = new JF.msg.WineGetWineListBackMsg();

    // 获取酒类信息
    var getWines = function () {
      return JF.dao.WineDao.queryList(null, false);
    };

    var buildRes = function (wineList) {
      backMsg.setWinelist(wineList);

      throw new Error(JF.enums.ret.SUCCESS);
    };

    // 逻辑处理
    Q.fcall(getWines)
      .then(buildRes)
      .catch(JF.util.http.error.bind(null, res, backMsg));
  };
};

// 添加继承
util.inherits(WineManager, BaseManager);

module.exports = new WineManager();