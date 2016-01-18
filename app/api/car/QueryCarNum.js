/**
 * QueryCarNum逻辑处理
 * Created by auto tool.
 */

'use strict';

// 根据条件查询车辆数量
module.exports = function (reqData, req, res, next) {
  var msg = new JF.msg.CarQueryCarNumMsg(reqData);

  JF.ma.CarManager.queryCarNum(msg, res);

  return null;
};