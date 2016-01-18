/**
 * Created by gaojun on 15/11/3.
 */

'use strict';
var ejs = require('ejs');
var fs = require('fs');

// 加载模板
var reg_tmp = fs.readFileSync(config.serverRoot + '/views/template/mail/register_tmp.ejs', 'utf8');


/**
 * 创建玩家session
 *
 * @param req request对象
 * @param res response对象
 * @param userinfo 玩家信息
 * @param callback 回调函数
 */
exports.sessionInit = function (req, res, userinfo, callback) {
  //session创建
  req.session.regenerate(function () {
    var userId = 10000;
    req.session.userId = userId;
    req.session.save();  //保存一下修改后的Session
    var user = {
      userId: userId,
      authToken: req.session.id,
    };

    exports.resBack(res, user);
  });
};

/**
 * 销毁玩家session
 *
 * @param req request对象
 * @param res response对象
 * @param callback 回调函数
 */
exports.sessionDes = function (req, res, callback) {
  // 清除cookie
  res.clearCookie('connect.sid');
  req.session.userId = null;

  // session移除
  req.session.destroy(function () {
    //移除session之后后续的处理

    exports.resBack(res, {});
  })
};

/**
 * 客户端请求返回统一接口
 * 用于封装一些统一行为，例如压缩，加密等
 *
 * @param res response对象
 * @param backData 返回数据
 * @param backPage 返回页面
 */
exports.resBack = function (res, backData, backPage) {
  // 页面不存在,只返回数据
  if (_.isUndefined(backPage) || _.isNull(backPage)) {
    res.send(backData);
  }
  // 返回数据不存在，则重定向
  else if (_.isUndefined(backData) || _.isNull(backData)) {
    res.redirect(backPage);
  }
  // 需要渲染页面
  else {
    res.render(backPage, backData);
  }
};

/**
 * 注册激活邮件html模板渲染
 * ejs模板
 *
 * @param uid 用户id
 * @param username 用户名
 * @param token 用户token
 * @returns {String} 渲染后的模板
 */
exports.registerTemplate = function (uid, username, token) {
  var data = {
    name: config.mail_name,
    host: config.host,
    uid: uid,
    username: username,
    token: token,
  };

  return ejs.render(reg_tmp, data);
};

/**
 * 检查参数
 *
 * @param reqData request对象入参参数
 * @param res response对象
 * @param params 需要检查的参数数组
 */
exports.checkParam = function (reqData, res, params) {
  _.forEach(params, function (param) {
    // 参数不存在
    if (_.isUndefined(reqData[param])
      || _.isNull(reqData[param])) {
      JF.util.http.resBack(res, {ret: JF.enums.ret.PARAM_ERROR});
      return false;
    }
  });

  return true;
};

/**
 * http处理异常处理
 * 如果在promise中调用时，必须手动传入res对象
 * :: promise.catch(...error.bind(null,res,msgData))
 * @param res response对象
 * @param msgData 返回消息对象
 * @param error 异常信息对象
 */
exports.error = function (res, msgData, error) {
  var errorCode = JF.util.base.errorFilter(error);

  if (JF.enums.ret.INNER_ERROR === errorCode) {
    console.error(error);
    //logger.error(error);
  }
  msgData.setResult(errorCode);
  JF.util.http.resBack(res, msgData);
};