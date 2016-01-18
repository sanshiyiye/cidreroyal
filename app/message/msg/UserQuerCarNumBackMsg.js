/**
 * QuerCarNumBack消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10302;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.queryNum = data.queryNum || 0;
    
  }
  
  this.setQuerynum = function(queryNum){
    this.queryNum = queryNum;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};