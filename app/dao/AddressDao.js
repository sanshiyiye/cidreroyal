/**
 * AddressDao.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseDao = require(config.serverRoot + '/dao/base/BaseDao');

/**
 * 用户地址信息表数据库层操作类
 *
 * @constructor
 */
var AddressDao = function (AddressModel) {
  this.model = AddressModel;

};

// 添加继承
util.inherits(AddressDao, BaseDao);

module.exports = AddressDao;