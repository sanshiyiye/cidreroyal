var express = require('express');
var router = express.Router();
var msgTypeDic = require(config.serverRoot + '/message/MessageType');
var login = require(config.serverRoot + '/api/user/login');
//var logout = require(config.serverRoot + '/api/user/logout');

/* GET game listen. for dev-environment */
router.get('/', function (req, res, next) {
  // TODO 登陆session验证
  console.log(req.session);
  if (!req.session.userId) {
    return next(new Error('oh no')); // handle error
  }

  // 获取处理类
  var msgType = (req.query.msgType || "").toString();
  var src = msgTypeDic[msgType];

  // 加载logic
  var logic = require('../api/' + src);

  // 逻辑处理
  var resData = logic(req.query);
  if (null === resData) {
    resData = {ret: -1}
  }

  res.send(resData);
});

/* POST game listen. for pro-environment */
router.post('/', function (req, res, next) {
  // TODO 登陆session验证
  if (!req.session.userId) {
    return next(new Error('oh no')); // handle error
  }

  // 获取处理类
  var msgType = (req.query.msgType || "").toString();
  var src = msgTypeDic[msgType];

  // 加载logic
  var logic = require('../api/' + src);

  // 逻辑处理
  var resData = logic(req.body);
  if (null === resData) {
    resData = {ret: -1}
  }

  res.send(resData);
});

/*
登陆 get method, for dev-environment
 */
router.get('/login', function (req, res, next) {
  sessionInit(req, res, next);
});

/*
 登陆 post method, for pro-environment
 */
router.post('/login', function (req, res, next) {
  sessionInit(req, res, next);
});

/*
session 创建
 */
function sessionInit(req, res, next){
  //session创建
  req.session.regenerate(function () {
    req.session.userId = 10000;
    req.session.save();  //保存一下修改后的Session

    res.send("SUCCESS");
  });
}

/*
登出 get method, for dev-environment
 */
router.get('/logout', function (req, res, next) {
  sessionDes(req, res, next);
});

/*
 登出 post method, for pro-environment
 */
router.post('/logout', function (req, res, next) {
  sessionDes(req, res, next);
});

/*
 session 摧毁
 */
function sessionDes(req, res, next){
  // 清除cookie
  res.clearCookie('connect.sid');

  // session移除
  req.session.destroy(function () {
    //重新生成session之后后续的处理
    res.send("SUCCESS");
  })
}


module.exports = router;
