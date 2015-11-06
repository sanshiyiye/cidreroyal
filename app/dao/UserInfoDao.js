/**
 * Created by gaojun on 15/11/3.
 */

'use strict';
var util = require('util');
var BaseDao = require(config.serverRoot + '/dao/base/BaseDao');

/**
 * 用户信息数据库层操作类
 *
 * @constructor
 */
var UserInfoDao = function (userInfoModel) {
  this.model = userInfoModel;

  /**
   * 根据邮箱id获取用户
   *
   * @param email 邮箱
   * @return {*} promise
   */
  this.getByEmail = function (email) {
    return this.model.findOne({
      where: {email: email}
    });
  };
};

// 添加继承
util.inherits(UserInfoDao, BaseDao);

module.exports = UserInfoDao;