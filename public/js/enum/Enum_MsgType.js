/**
 * 消息类型集合
 * Created by auto tool.
 */

'use strict';

define(
  [],
  function () {
    return {
      
      // 获取博客信息
      BLOG_GETBLOGLIST : 10401,
      
      // 获取博客信息返回
      BLOG_GETBLOGLISTBACK : 10402,
      
      // 注册
      USER_REGISTER : 10201,
      
      // 登陆返回
      USER_REGISTERBACK : 10202,
      
      // 注册验证
      USER_REGCONFIRM : 10203,
      
      // 注册验证返回
      USER_REGCONFIRMBACK : 10204,
      
      // 登陆
      USER_LOGIN : 10205,
      
      // 登陆返回
      USER_LOGINBACK : 10206,
      
      // 登出
      USER_LOGOUT : 10207,
      
      // 登出返回
      USER_LOGOUTBACK : 10208,
      
      // 获取玩家信息
      USER_GETUSERINFO : 10209,
      
      // 获取玩家信息返回
      USER_GETUSERINFOBACK : 10210,
      
      // 获取酒类信息
      WINE_GETWINELIST : 10301,
      
      // 获取酒类信息返回
      WINE_GETWINELISTBACK : 10302,
      
    }
  }
);