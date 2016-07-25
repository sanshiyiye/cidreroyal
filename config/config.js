/**
 * Created by gaojun on 15/10/26.
 */

'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  environment: 'development',
  host: 'http://192.168.111.103:3000',

  // 项目基础路径定义
  root: rootPath,
  serverRoot: rootPath + '/app',
  clientRoot: rootPath + '/public',

  sellImgPath: '/files/seller/',
  apprImgPath: '/files/appraiser/',
  carImgPath: '/files/car/',

  // 价格基础单位(万)
  priceUnit: 10000,

  // 贷款 加成，首付比，月供总次数
  loanUpPercent: 1.2,
  loanFirstPrice: 0.3,
  loanMonthCount: 36,

  // 服务费比例
  srvPricePercent: 0.03,

  // 数据库相关参数
  DB_dbname: 'cidreroyal',
  DB_username: 'root',
  DB_password: '',
  DB_host: 'localhost',
  DB_port: 3306,
  DB_dialect: 'mysql',
  DB_maxpool: 5,
  DB_minpool: 0,

  // redis相关参数
  RD_host: 'localhost',
  RD_port: 14001,
  RD_data_expire: 5 * 60, // 5分钟
  RD_sessiong_expire: 30 * 60, // 30分钟(session保存时间)

  // app key
  APP_KEY: '5D31521F4BC986B0192A0ACFA3E1D354',

  // 邮件服务配置
  mail_base: '', //邮件基础服务，会影响邮件服务的初始化方式
  mail_service: 'Gmail',
  mail_host: 'smtp.163.com',
  mail_port: 25,
  mail_user: 'rajay2015@163.com',
  mail_pwd: 'cpdhtpjfxmnybrfg',

  mail_mailgun_key: 'key-74f6bc9717c2f67e0cce4b5e76d5dd86',
  mail_mailgun_domain: 'sandboxc47a484f71974546a51755d42e70ecbf.mailgun.org',

  mail_sendcloud_user: 'gaojunohyeah_test_aC7pDb',
  mail_sendcloud_key: 'CPATWsXIWeBtPl0R',

  mail_name: 'JFrame',
  mail_sender: 'JFrame <rajay2015@163.com>',

};