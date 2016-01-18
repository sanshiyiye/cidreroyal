/**
 * Created by gaojun on 15/11/4.
 */

'use strict';

/**
 * 注册验证请求
 */
module.exports = function (reqData, req, res, next) {
  var msg = new JF.msg.UserRegconfirmMsg(reqData);

  // 用户注册验证
  JF.ma.UserInfoManager.regConfirmUser(msg, res);

  //if (!_.isUndefined(result) && !_.isNull(result)) {
  //  // 构造返回消息
  //  var backMsg = new JF.msg.UserRegConfirmBackMsg();
  //  backMsg.setResult(result);
  //
  //  JF.util.http.resBack(res, backMsg);
  //}
};