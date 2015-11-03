/**
 * Created by gaojun on 15/10/26.
 */

'use strict';

var Sequelize = require('sequelize');
var Redis = require('ioredis');

// mysql 连接
function loadMysql() {
  return new Sequelize(config.DB_dbname, config.DB_username, config.DB_password, {
    host: config.DB_host,
    port: config.DB_port,
    dialect: config.DB_dialect,

    pool: {
      max: config.DB_maxpool,
      min: config.DB_minpool,
      idle: 10000
    }
  });
}

// redis 连接
function loadRedis() {
  return new Redis(config.RD_port, config.RD_host);
}

// 加载操作
// redis连接
exports.redis = loadRedis();

// 数据库连接以及连接池
var sequelize = loadMysql();
exports.sequelize = sequelize;

// model映射
exports.db_userinfo = require(config.serverRoot + "/model/userinfo")(sequelize);
