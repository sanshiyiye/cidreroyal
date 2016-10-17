/**
 * AliSdk.js
 * 阿里sdk管理类
 */

'use strict';
var util = require('util');

TopClient = require(config.serverRoot + '/sdk/ali/smslib/topClient').TopClient;

/**
 * 阿里大于 应用key 和 秘钥
 * 阿里大于 的sdk地址(正式、测试)
 */
var ALI_CIDER_SIGNNAME = '西打酒';
var ALI_CIDER_KEY = '23438421';
var ALI_CIDER_SECRET = '93d307651bba1c4d07bbe1be6e78fd7e';
var ALI_CIDER_HOST = 'http://gw.api.taobao.com/router/rest';
var ALI_CIDER_HOST_TEST = 'http://gw.api.tbsandbox.com/router/rest';

/**
 * 阿里大于 短信验证码模板1
 * 注册/登陆
 * 尊敬的用户您好，本次验证码为${code}，10分钟内有效，感谢使用本网站。
 */
var ALI_CIDER_SMSID1 = 'SMS_13226057';

/**
 * 初始化client对象
 */
var client = new TopClient({
  'format': 'json',
  'appkey': ALI_CIDER_KEY,
  'appsecret': ALI_CIDER_SECRET,
  'REST_URL': ALI_CIDER_HOST,
});

/**
 * 阿里sdk管理器
 *
 * @constructor
 */
var AliSdk = function() {
  /**
   * 向指定手机号发送短信验证码
   * 
   * @param {string} smsTemId 短信模板id
   * @param {number} recPhone 接收人手机号
   * @param {any} params 短信变量参数信息
   * @param {string} extinfos 额外信息
   */
  this.smsVerfyCode = function(smsTemId, recPhone, params, extinfos) {
    client.execute('alibaba.aliqin.fc.sms.num.send', {
      'extend': extinfos,
      'sms_type': 'normal',
      'sms_free_sign_name': ALI_CIDER_SIGNNAME,
      'sms_param': JSON.stringify(params),
      'rec_num': recPhone,
      'sms_template_code': smsTemId
    }, function(error, response) {
      if (!error) {
        console.log(response);
      } else {
        console.log(error);
      }
    });
  };

};

module.exports = new AliSdk();