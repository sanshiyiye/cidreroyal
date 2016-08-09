/**
 * ItemDao.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseDao = require(config.serverRoot + '/dao/base/BaseDao');

/**
 * 商品信息表数据库层操作类
 *
 * @constructor
 */
var ItemDao = function (ItemModel) {
  this.model = ItemModel;

};

// 添加继承
util.inherits(ItemDao, BaseDao);

module.exports = ItemDao;