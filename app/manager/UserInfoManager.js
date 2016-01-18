/**
 * UserInfoManager.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseManager = require(config.serverRoot + '/manager/base/BaseManager');

/**
 * 用户信息表管理器
 *
 * @constructor
 */
var UserInfoManager = function () {
  var _this = this;

  /**
   * 发送注册激活邮件
   *
   * @param userinfo 用户信息
   * @param token 用户token
   */
  this.sendRegisterMail = function (userinfo, token) {
    var mailOption = {
      from: config.mail_sender,
      to: userinfo.email,
      subject: config.mail_name + '-帐号激活',
      html: JF.util.http.registerTemplate(userinfo.id, userinfo.username, token),
    };

    // 发送验证邮箱
    JF.srv.mail.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  };

  /**
   * 注册账号
   *
   * @param userRegisterMsg 注册消息对象
   * @param res response对象
   */
  this.registerUser = function (userRegisterMsg, res) {
    var pw1 = userRegisterMsg.password;
    var pw2 = userRegisterMsg.password2;
    var username = userRegisterMsg.username;

    // 消息返回
    var backMsg = new JF.msg.UserRegisterBackMsg();

    // 数据检验
    var check = function () {
      // 密码一致验证 并且不超过上限
      if (!JF.util.check.passwordCheck(pw1, pw2)) {
        throw new Error(JF.enums.ret.USER_PW_UNEQUAL);
      }

      // 邮箱规格验证 并且不超过上限
      if (!JF.util.check.emailCheck(username)) {
        throw new Error(JF.enums.ret.USER_EMAIL_REG);
      }

      return JF.dao.UserInfoDao.getByEmail(username);
    };

    // 验证邮箱
    var register = function (userinfo) {
      //console.log(userinfo);

      // 邮箱还未注册
      if (_.isUndefined(userinfo) || _.isNull(userinfo)) {
        // 初始化用户
        return _this.initNewUser(username, pw1, res);
      }
      // 已经被注册
      else {
        throw new Error(JF.enums.ret.USER_EMAIL_EXIST);
      }
    };

    // 发送验证邮件
    var sendMail = function (user) {
      // 成功存储
      if (user) {
        user = user.dataValues;
        //console.log(user);
        var token = _this.buildUserToken(user);
        // 发送注册激活邮件
        _this.sendRegisterMail(user, token);

        throw new Error(JF.enums.ret.SUCCESS);
      } else {
        throw new Error(JF.enums.ret.ERROR);
      }
    };

    // 逻辑处理
    Q.fcall(check)
      .then(register)
      .then(sendMail)
      .catch(JF.util.http.error.bind(null, res, backMsg));
  };

  /**
   * 初始化新用户
   *
   * @param username 用户名
   * @param password 密码
   * @return {*} Promise
   */
  this.initNewUser = function (username, password) {
    var userinfo = JF.dbs.UserInfo.build({
      username: username,
      email: username,
      password: JF.util.crypto.getSha1(password + config.APP_KEY)
    });

    return JF.dao.UserInfoDao.save(userinfo);
  };

  /**
   * 生成用户token
   *
   * @param userinfo 用户对象
   * @returns {*}
   */
  this.buildUserToken = function (userinfo) {
    var sourceStr = userinfo.username + config.APP_KEY + userinfo.password;
    //console.log('sourceStr: ' + sourceStr);
    return JF.util.crypto.getSha1(sourceStr);
  };

  /**
   * 验证注册
   *
   * @param userRegConfirmMsg
   * @param res
   */
  this.regConfirmUser = function (userRegConfirmMsg, res) {
    var uid = userRegConfirmMsg.uid;
    var token = userRegConfirmMsg.token;

    // 消息返回
    var backMsg = new JF.msg.UserRegconfirmBackMsg();

    // 根据id获取数据
    var getData = function () {
      return JF.dao.UserInfoDao.get(uid);
    };

    // 验证唯一性
    var confirm = function (userinfo) {
      //console.log(userinfo);
      // 用户存在
      if (!_.isUndefined(userinfo) && !_.isNull(userinfo)) {

        var newToken = _this.buildUserToken(userinfo);
        // 验证token
        if (_.isEqual(token, newToken)) {
          // 更新状态
          return userinfo.update({state: 1});
        } else {
          throw new Error(JF.enums.ret.USER_TOKEN_ERROR);
        }
      }
      // 用户不存在
      else {
        throw new Error(JF.enums.ret.USER_NO_EXIST);
      }
    };

    // 成功返回
    var sucBack = function (userinfo) {
      throw new Error(JF.enums.ret.SUCCESS);
    };

    // 逻辑处理
    Q.fcall(getData)
      .then(confirm)
      .then(sucBack)
      .catch(JF.util.http.error.bind(null, res, backMsg));
  };

  this.loadInitData = function (msg, res) {
    // 消息返回
    var backMsg = new JF.msg.UserLoadInitDataBackMsg();

    // 获取品牌信息
    var getBrands = function () {
      return JF.dao.BrandDao.queryList(null, false);
    };

    // 获取城市信息
    var getCitys = function () {
      return JF.dao.CityDao.queryList(null, false);
    };

    // 获取汽车类型信息
    var getCarTypes = function () {
      return JF.dao.CarTypeDao.queryList(null, false);
    };

    // 获取汽车颜色信息
    var getCarColors = function () {
      return JF.dao.CarColorDao.queryList(null, false);
    };

    // 获取推荐标签信息
    var getTags = function () {
      return JF.dao.TagsDao.queryList(null, false);
    };

    // 获取品牌系列信息
    var getCarSeries = function () {
      return JF.dao.BrandSeriesDao.queryList(null, false);
    };

    // 结果构建
    var buildRet = function (brands, citys, carTypes, carColors, tags, carSeries) {
      backMsg.setBrandlist(brands);
      backMsg.setCitylist(citys);
      backMsg.setCartypelist(carTypes);
      backMsg.setCarcolorlist(carColors);
      backMsg.setTagslist(tags);
      backMsg.setCarserieslist(carSeries);

      throw new Error(JF.enums.ret.SUCCESS);
    };

    Q.all([getBrands(), getCitys(), getCarTypes()
      , getCarColors(), getTags(), getCarSeries()])
      .spread(buildRet)
      .catch(JF.util.http.error.bind(null, res, backMsg));
  };
};

// 添加继承
util.inherits(UserInfoManager, BaseManager);

module.exports = new UserInfoManager();
