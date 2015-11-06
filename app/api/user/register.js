/**
 * Created by gaojun on 15/11/3.
 */

'use strict';

/**
 * 注册请求
 */
module.exports = function (reqData, res) {
  var msg = new JF.msg.UserRegisterMessage(reqData);

  JF.ma.UserInfoManager.registerUser(msg, res);
  //// 用户注册
  //var result = JF.ma.UserInfoManager.registerUser(msg, res);
  //
  //if (!_.isUndefined(result) && !_.isNull(result)) {
  //  // 构造返回消息
  //  var backMsg = new JF.msg.UserRegisterBackMessage();
  //  backMsg.setResult(result);
  //
  //  JF.util.http.resBack(res, backMsg);
  //}
};