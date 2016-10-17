/**
 * 客户端消息接口集合
 * Created by auto tool.
 */

define(
  [
    'config',
    'lodash',
  ],
  function (config, _) {
    'use strict';

    return function ($http) {
      var host = config.local_url;
      return {
        // 获取博客信息 request
        getBlogList: function (data) {
          var msgData = {};
          msgData.msgType = 10401;
          var attrs = {};
          

          return $http.post(host + 'game', msgData, attrs);
        },
        // 注册 request
        register: function (data) {
          var msgData = {};
          msgData.msgType = 10201;
          // 目前为邮箱
          msgData.username = data.username;
          // 密码
          msgData.password = data.password;
          // 再次密码
          msgData.password2 = data.password2;
          var attrs = {};
          attrs.ignoreAuthModule = true;

          return $http.post(host + 'register', msgData, attrs);
        },
        // 注册验证 request
        regconfirm: function (data) {
          var msgData = {};
          msgData.msgType = 10203;
          // 用户id
          msgData.uid = data.uid;
          // 用户token
          msgData.token = data.token;
          var attrs = {};
          attrs.ignoreAuthModule = true;

          return $http.post(host + 'regconfirm', msgData, attrs);
        },
        // 登陆 request
        login: function (data) {
          var msgData = {};
          msgData.msgType = 10205;
          // 用户名
          msgData.username = data.username;
          // 密码
          msgData.password = data.password;
          var attrs = {};
          attrs.ignoreAuthModule = true;

          return $http.post(host + 'login', msgData, attrs);
        },
        // 登出 request
        logout: function (data) {
          var msgData = {};
          msgData.msgType = 10207;
          var attrs = {};
          attrs.ignoreAuthModule = true;

          return $http.post(host + 'logout', msgData, attrs);
        },
        // 获取玩家信息 request
        getUserInfo: function (data) {
          var msgData = {};
          msgData.msgType = 10209;
          var attrs = {};
          

          return $http.post(host + 'game', msgData, attrs);
        },
        // 获取酒类信息 request
        getWineList: function (data) {
          var msgData = {};
          msgData.msgType = 10301;
          var attrs = {};
          

          return $http.post(host + 'game', msgData, attrs);
        },
      }
    };
  }
);