/**
 * AddressManager.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseManager = require(config.serverRoot + '/manager/base/BaseManager');

/**
 * 用户地址信息表管理器
 *
 * @constructor
 */
var AddressManager = function () {
  var _this = this;


};

// 添加继承
util.inherits(AddressManager, BaseManager);

module.exports = new AddressManager();