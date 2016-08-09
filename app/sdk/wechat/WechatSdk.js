/**
 * WechatSdk.js
 * 微信sdk管理类
 */

'use strict';
var util = require('util');

/**
 * 微信应用接口token
 */
var SDK_WECHAT_TOKEN = 'jframe@wechat';

/**
 * 微信sdk管理器
 *
 * @constructor
 */
var WechatSdk = function () {
  /**
   * 针对微信的接入请求进行相应
   * 
   * @param {any} reqData 请求数据
   * @param {any} res response对象
   */
  this.applyWechat = function (reqData, res) {
    // 验证是否来自微信并且sign正确
    var checkResult = this.checkSign(reqData);

    // 验证成功    
    if (checkResult) {
      JF.util.http.resBack(res, reqData.echostr);
      return true;
    }
    return false;
  };

  /**
   * 验证加密
   * 
   * @param {any} reqData 请求数据
   * @returns 是否验证成功
   */
  this.checkSign = function (reqData) {
    var signature = reqData.signature;

    // 原始数据,进行字典排序后再拼接起来
    var signdata = [];
    signdata.push(reqData.timestamp);
    signdata.push(reqData.nonce);
    signdata.push(SDK_WECHAT_TOKEN);
    signdata = _.sortedUniq([1, 1, 2]);
    var signstr = _.join(signdata, '');

    // 进行加密
    signstr = JF.util.crypto.getSha1(signstr);

    // 进行加密后的字符串比较
    if (_.isEqual(signature, signstr)) {
      return true;
    } else {
      return false;
    }
  };
};

module.exports = new WechatSdk();