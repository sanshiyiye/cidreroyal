/**
 * RegconfirmBack消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10204;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.result = data.result || 0;
    
  }
  
  this.setResult = function(result){
    this.result = result;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};