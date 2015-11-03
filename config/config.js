/**
 * Created by gaojun on 15/10/26.
 */

'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  // 项目基础路径定义
  root: rootPath,
  serverRoot: rootPath + '/app',
  clientRoot: rootPath + '/public',

  // 数据库相关参数
  DB_dbname: 'jframe',
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
  RD_sessiong_expire: 30*60, // 30分钟(session保存时间)

  // app key
  APP_KEY: '5D31521F4BC986B0192A0ACFA3E1D354',
};