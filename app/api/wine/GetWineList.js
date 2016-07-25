/**
 * GetWineList逻辑处理
 * Created by auto tool.
 */

'use strict';

// 获取酒类信息
module.exports = function (reqData, req, res, next) {
  var msg = new JF.msg.WineGetWineListMsg(reqData);

  // 用户注册验证
  JF.ma.WineManager.getWineList(msg, res);
};