/**
 * GetBlogList逻辑处理
 * Created by auto tool.
 */

'use strict';

// 获取博客信息
module.exports = function (reqData, req, res, next) {
  var msg = new JF.msg.BlogGetBlogListMsg(reqData);

  // 用户注册验证
  JF.ma.BlogManager.getBlogList(msg, res);
};