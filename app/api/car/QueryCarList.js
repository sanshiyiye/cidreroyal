/**
 * QueryCarList逻辑处理
 * Created by auto tool.
 */

'use strict';

// 根据条件查询车辆数量
module.exports = function (reqData, req, res, next) {
  var msg = new JF.msg.CarQueryCarListMsg(reqData);

  JF.ma.CarManager.queryCarList(msg, res);
  return null;
};