/**
 * GetUserInfo逻辑处理
 * Created by auto tool.
 */

'use strict';

// 获取玩家信息
module.exports = function (reqData) {
  var msg = new JF.msg.UserGetUserInfoMsg();
  msg.init(reqData);

  return null;
};