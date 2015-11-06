/**
 * Created by gaojun on 15/10/27.
 */

'use strict';

// 登陆请求
module.exports = function (reqData) {
  var msg = new JF.msg.UserLoginMessage();
  msg.init(reqData);



  return null;
};