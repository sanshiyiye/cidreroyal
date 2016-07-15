/**
 * BlogManager.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseManager = require(config.serverRoot + '/manager/base/BaseManager');

/**
 * blog信息表管理器
 *
 * @constructor
 */
var BlogManager = function () {
  var _this = this;


};

// 添加继承
util.inherits(BlogManager, BaseManager);

module.exports = new BlogManager();