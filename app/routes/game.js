var express = require('express');
var router = express.Router();
var msgTypeDic = require(config.serverRoot + '/message/MessageType');
var msgAuthDic = require(config.serverRoot + '/message/MessageAuth');

//router.all('/*', function (req, res, next) {
//  // TODO 登陆session验证
//  if (!req.session.userId) {
//    var err = new Error('need login first!');
//    err.status = 401;
//    return next(err); // handle error
//  }
//
//  next(); // pass control to the next handler
//});
//
///* GET game listen. for dev-environment */
//router.get('/', function (req, res, next) {
//  // 开发环境才需要收get请求
//  if(JF.util.base.checkDevEnv()){
//    // 获取处理类
//    var msgType = (req.query.msgType || "").toString();
//    var src = msgTypeDic[msgType];
//
//    // 加载logic
//    var logic = require(config.serverRoot + '/api/' + src);
//
//    // 逻辑处理
//    var resData = logic(req.query);
//    if (_.isUndefined(resData) || _.isNull(resData)) {
//      resData = {ret: -1}
//    }
//
//    JF.util.http.resBack(res, resData);
//  }
//});

/* POST game listen. for pro-environment */
router.post('/', function (req, res, next) {
  // 获取处理类
  var msgType = (req.body.msgType || "").toString();

  var src = msgTypeDic[msgType] || "";
  // 消息错误，直接抛出异常
  if(_.isUndefined(src) || _.isNull(src) || _.isEqual('', src)){
    var err = new Error('msgType error!');
    err.status = 500;
    return next(err); // handle error
  }

  var needAuth = msgAuthDic[msgType] || false;
  // 需要登陆验证
  if (needAuth){
    // TODO 登陆session验证
    if (!req.session.userId) {
      err = new Error('need login first!');
      err.status = 401;
      return next(err); // handle error
    }
  }

  // 加载logic
  var logic = require(config.serverRoot + '/api/' + src);

  // 逻辑处理
  var resData = logic(req.body);
  //// 如果有直接返回，则返回给客户端(一般logic内都会异步处理)
  //if (!_.isUndefined(resData) && !_.isNull(resData) && !_.isEmpty(resData)) {
  //  JF.util.http.resBack(res, resData);
  //}
});

module.exports = router;
