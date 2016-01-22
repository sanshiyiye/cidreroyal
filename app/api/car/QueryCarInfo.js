/**
 * QueryCarInfo逻辑处理
 * Created by auto tool.
 */

'use strict';

// 获取车辆详细信息
module.exports = function (reqData, req, res, next) {
  var msg = new JF.msg.CarQueryCarInfoMsg(reqData);

  JF.ma.CarManager.queryCarInfo(msg, res);
  return null;
};