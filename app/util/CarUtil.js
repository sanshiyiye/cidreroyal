/**
 * Created by gaojun on 16/1/25.
 */

'use strict';

/**
 * 计算服务费
 */
exports.calSrvPrice = function (price) {
  var total = price * config.priceUnit;

  return Math.ceil(total * config.srvPricePercent);
};

/**
 * 计算贷款首付和月供
 */
exports.calLoanPrice = function (price) {
  var total = price * config.priceUnit * config.loanUpPercent;

  var first = Math.ceil(total * config.loanFirstPrice);
  var month = Math.ceil((total - first) / config.loanMonthCount);

  return [first, month];
};

