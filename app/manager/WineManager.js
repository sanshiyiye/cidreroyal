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


};

// 添加继承
util.inherits(WineManager, BaseManager);

module.exports = new WineManager();