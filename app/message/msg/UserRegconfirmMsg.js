/**
 * Regconfirm消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10203;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.uid = data.uid || 0;
    this.token = data.token || '';
    
  }
  
  this.setUid = function(uid){
    this.uid = uid;
  };
  this.setToken = function(token){
    this.token = token;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};