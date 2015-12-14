var express = require('express');
var router = express.Router();
var msgTypeDic = require(config.serverRoot + '/message/MessageType');

router.all('/*', function (req, res, next) {
  // TODO 登陆session验证
  if (!req.session.userId) {
    var err = new Error('need login first!');
    err.status = 401;
    return next(err); // handle error
  }

  next(); // pass control to the next handler
});

/* GET game listen. for dev-environment */
router.get('/', function (req, res, next) {
  // 开发环境才需要收get请求
  if(JF.util.base.checkDevEnv()){
    // 获取处理类
    var msgType = (req.query.msgType || "").toString();
    var src = msgTypeDic[msgType];

    // 加载logic
    var logic = require(config.serverRoot + '/api/' + src);

    // 逻辑处理
    var resData = logic(req.query);
    if (_.isUndefined(resData) || _.isNull(resData)) {
      resData = {ret: -1}
    }

    JF.util.http.resBack(res, resData);
  }
});

/* POST game listen. for pro-environment */
router.post('/', function (req, res, next) {
  // 获取处理类
  var msgType = (req.query.msgType || "").toString();
  var src = msgTypeDic[msgType];

  // 加载logic
  var logic = require(config.serverRoot + '/api/' + src);

  // 逻辑处理
  var resData = logic(req.body);
  if (_.isUndefined(resData) || _.isNull(resData)) {
    resData = {ret: -1}
  }

  JF.util.http.resBack(res, resData);
});

module.exports = router;
