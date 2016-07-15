/**
 * BlogDao.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseDao = require(config.serverRoot + '/dao/base/BaseDao');

/**
 * blog信息表数据库层操作类
 *
 * @constructor
 */
var BlogDao = function (BlogModel) {
  this.model = BlogModel;

};

// 添加继承
util.inherits(BlogDao, BaseDao);

module.exports = BlogDao;