/**
 * WineDao.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseDao = require(config.serverRoot + '/dao/base/BaseDao');

/**
 * 酒类型信息表数据库层操作类
 *
 * @constructor
 */
var WineDao = function (WineModel) {
  this.model = WineModel;

};

// 添加继承
util.inherits(WineDao, BaseDao);

module.exports = WineDao;