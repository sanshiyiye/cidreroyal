/**
 * CartDao.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseDao = require(config.serverRoot + '/dao/base/BaseDao');

/**
 * 用户购物车信息表数据库层操作类
 *
 * @constructor
 */
var CartDao = function (CartModel) {
  this.model = CartModel;

};

// 添加继承
util.inherits(CartDao, BaseDao);

module.exports = CartDao;