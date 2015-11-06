var express = require('express');
var router = express.Router();

var register = require(config.serverRoot + '/api/user/Register');
var regconfirm = require(config.serverRoot + '/api/user/Regconfirm');
var login = require(config.serverRoot + '/api/user/Login');
var logout = require(config.serverRoot + '/api/user/Logout');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/*', function(req, res, next){
  // 开发环境才需要收get请求
  if(JF.util.base.checkDevEnv()){
    next();
  }
});

/**
 * 注册 get method, for dev-environment
 */
router.get('/register', function(req, res, next){
  // 逻辑处理
  register(req.query, res);
});

/**
 * 注册 post method, for pro-environment
 */
router.post('/register', function(req, res, next){
  // 逻辑处理
  register(req.body, res);
});

/**
 * 注册验证 get method, for dev-environment
 */
router.get('/regconfirm', function(req, res, next){
  // 逻辑处理
  regconfirm(req.query, res);
});

/**
 * 注册验证 post method, for pro-environment
 */
router.post('/regconfirm', function(req, res, next){
  // 逻辑处理
  regconfirm(req.body, res);
});

/**
 * 登陆 get method, for dev-environment
 */
router.get('/login', function (req, res, next) {
  // 开发环境才需要收get请求
  if(JF.util.base.checkDevEnv()){

    JF.util.http.sessionInit(req, res, userinfo, void 0);
  }
});

/**
 * 登陆 post method, for pro-environment
 */
router.post('/login', function (req, res, next) {
  JF.util.http.sessionInit(req, res, userinfo, void 0);
});

/**
 * 登出 get method, for dev-environment
 */
router.get('/logout', function (req, res, next) {
  // 开发环境才需要收get请求
  if(JF.util.base.checkDevEnv()){

    JF.util.http.sessionDes(req, res, userinfo, void 0);
  }
});

/**
 * 登出 post method, for pro-environment
 */
router.post('/logout', function (req, res, next) {
  JF.util.http.sessionDes(req, res, userinfo, void 0);
});

module.exports = router;
