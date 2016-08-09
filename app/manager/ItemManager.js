/**
 * ItemManager.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseManager = require(config.serverRoot + '/manager/base/BaseManager');

/**
 * 商品信息表管理器
 *
 * @constructor
 */
var ItemManager = function () {
  var _this = this;


};

// 添加继承
util.inherits(ItemManager, BaseManager);

module.exports = new ItemManager();