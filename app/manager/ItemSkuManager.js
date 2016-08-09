/**
 * ItemSkuManager.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseManager = require(config.serverRoot + '/manager/base/BaseManager');

/**
 * 商品sku信息表管理器
 *
 * @constructor
 */
var ItemSkuManager = function () {
  var _this = this;


};

// 添加继承
util.inherits(ItemSkuManager, BaseManager);

module.exports = new ItemSkuManager();