/**
 * BlogManager.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseManager = require(config.serverRoot + '/manager/base/BaseManager');

/**
 * blog信息表管理器
 *
 * @constructor
 */
var BlogManager = function () {
  var _this = this;



  /**
   * 获取博客信息列表
   * 
   * @param {any} blogGetBlogListMsg 请求获取博客列表消息对象
   * @param {any} res response对象
   */
  this.getBlogList = function (blogGetBlogListMsg, res) {
    // 消息返回
    var backMsg = new JF.msg.BlogGetBlogListBackMsg();

    // 获取博客信息
    var getBlogs = function () {
      return JF.dao.BlogDao.queryList(null, false);
    };

    var buildRes = function (blogList) {
      backMsg.setBloglist(blogList);

      throw new Error(JF.enums.ret.SUCCESS);
    };

    // 逻辑处理
    Q.fcall(getBlogs)
      .then(buildRes)
      .catch(JF.util.http.error.bind(null, res, backMsg));
  };
};

// 添加继承
util.inherits(BlogManager, BaseManager);

module.exports = new BlogManager();