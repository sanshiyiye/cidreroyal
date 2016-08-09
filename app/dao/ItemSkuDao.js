/**
 * ItemSkuDao.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseDao = require(config.serverRoot + '/dao/base/BaseDao');

/**
 * 商品sku信息表数据库层操作类
 *
 * @constructor
 */
var ItemSkuDao = function (ItemSkuModel) {
  this.model = ItemSkuModel;

};

// 添加继承
util.inherits(ItemSkuDao, BaseDao);

module.exports = ItemSkuDao;