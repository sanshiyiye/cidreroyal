'use strict';

var express = require('express');

var app = express();

// 部分公共函数库
global._ = require('lodash');

// 基础配置参数加载
global.config = require('./config/config');

// 中间件加载
require(config.serverRoot + '/lib/express')(app, config);

// JFrame 初始化
global.JF = require(config.serverRoot + '/core/JFrame');
//console.log(JF);

// 路由模块加载
require(config.serverRoot + '/lib/routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
