/**
 * CartManager.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseManager = require(config.serverRoot + '/manager/base/BaseManager');

/**
 * 用户购物车信息表管理器
 *
 * @constructor
 */
var CartManager = function () {
  var _this = this;


};

// 添加继承
util.inherits(CartManager, BaseManager);

module.exports = new CartManager();