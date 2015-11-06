/**
 * Created by gaojun on 15/11/3.
 */

'use strict';

var UserInfoDao = require(config.serverRoot + '/dao/UserInfoDao');

module.exports = function (dbs) {
  var dao = {};

  dao.UserInfoDao = new UserInfoDao(dbs.UserInfo);

  return dao;
};