/**
 * GetBlogList消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10401;
  if(!_.isUndefined(data) && !_.isNull(data)){
    
  }
  

  this.setResult = function(result) {
    this.ret = result;
  }
};