/**
 * Created by gaojun on 15/10/27.
 */

'use strict';

// 数据库模块加载
var dbs = require(config.serverRoot + '/lib/dbs');

// 消息模块
var message = require(config.serverRoot + '/message/Message');

// 定时器模块加载
var schedule = require(config.serverRoot + '/lib/schedule');

// 单例实体集合
function SingleInstance() {
  this.dbs = dbs;
  this.message = message;
  this.schedule = schedule;
}

module.exports = new SingleInstance();