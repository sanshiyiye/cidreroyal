/**
 * GetBlogListBack消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10402;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.blogList = data.blogList || 0;
    
  }
  
  this.setBloglist = function(blogList){
    this.blogList = blogList;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};