/**
 * QueryCarNum消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10301;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.queryList = data.queryList || 0;
    
  }
  
  this.setQuerylist = function(queryList){
    this.queryList = queryList;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};