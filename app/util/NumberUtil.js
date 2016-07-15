/**
 * Created by gaojun on 16/6/15.
 */

'use strict';

/**
 * 查表法(过程式版本)
 */
exports.pad = function (tbl) {
  return function (num, n) {
    return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(0))) + num;
  }
}([]);