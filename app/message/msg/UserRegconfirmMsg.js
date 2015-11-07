/**
 * Regconfirm消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.msgType = data.msgType || 0;
    this.uid = data.uid || 0;
    this.token = data.token || '';
    
  }

  this.setMsgtype = function(msgType){
    this.msgType = msgType;
  };

  
  this.setUid = function(uid){
    this.uid = uid;
  };
  
  this.setToken = function(token){
    this.token = token;
  };
  
};