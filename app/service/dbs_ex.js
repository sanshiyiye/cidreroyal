/**
 * 数据库模块service类
 * Created by auto tool.
 */

'use strict';

var blog = require(config.serverRoot + "/model/Blog");
var userinfo = require(config.serverRoot + "/model/UserInfo");
var wine = require(config.serverRoot + "/model/Wine");



// 数据库model绑定映射
module.exports = function (sequelize) {
  var dbModels = {
    Blog: blog.Blog(sequelize),
    UserInfo: userinfo.UserInfo(sequelize),
    Wine: wine.Wine(sequelize),
    
  };

  // 关联关系

  return dbModels;
};