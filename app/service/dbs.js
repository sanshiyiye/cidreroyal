/**
 * 数据库模块service类
 * Created by auto tool.
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
// 捕获redis运行异常
Redis.Promise.onPossiblyUnhandledRejection(function (error) {
  console.log(error);
  logger.error(error);
});

// 加载操作
// redis连接
exports.redis = loadRedis();
// 监听redis连接异常
exports.redis.on('error', function (error) {
  console.log(error);
  logger.error(error);
});

// 数据库连接以及连接池
var sequelize = loadMysql();
exports.sequelize = sequelize;

// 加载所有model
var dbs_ex = require(config.serverRoot + '/service/dbs_ex')(sequelize);
_.forEach(dbs_ex, function (value, key) {
  exports[key] = value;
});