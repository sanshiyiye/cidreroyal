/**
 * LoadInitData逻辑处理
 * Created by auto tool.
 */

'use strict';

// 获取基础信息
module.exports = function (reqData, req, res, next) {
  var msg = new JF.msg.UserLoadInitDataMsg(reqData);

  JF.ma.UserInfoManager.loadInitData(msg, res);

  return null;
};