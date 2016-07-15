/**
 * dao实例类
 * Created by auto tool.
 */

'use strict';

var BlogDao = require(config.serverRoot + '/dao/BlogDao');
var UserInfoDao = require(config.serverRoot + '/dao/UserInfoDao');
var WineDao = require(config.serverRoot + '/dao/WineDao');


module.exports = function (dbs) {
  var dao = {};

  dao.BlogDao = new BlogDao(dbs.Blog);
  dao.UserInfoDao = new UserInfoDao(dbs.UserInfo);
  dao.WineDao = new WineDao(dbs.Wine);
  

  return dao;
};