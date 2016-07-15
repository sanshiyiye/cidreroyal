/**
 * Created by gaojun on 16/06/15.
 */

'use strict';

var util = require('util');
var moment = require('moment');

/**
 * 获取m-n之间的一个随机整数，n>=m
 *
 * @param m 随机区域下限值
 * @param n 随机区域上限值
 * @returns number
 */
exports.rand = function (m, n) {
  return _.random(m, n);
};

/**
 * 生成一个日志文件的随机串，使文件名不重复
 *
 * @return {*}
 */
exports.getRndFileTag = function (filekey) {
  var now = moment().format("YYYYMMDDHHmm");

  // 从1-10000中获取一个随机数
  var rndnum = JF.util.random.rand(1, 10000);
  var numStr = _.padLeft(rndnum, 5, '0');//JF.util.num.pad(rndnum, 5);

  return util.format("%s.%s-%s.%s", filekey, now, numStr, 'log');
};
