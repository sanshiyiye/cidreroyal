/**
 * Login消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.msgType = data.msgType || 0;
    this.username = data.username || '';
    this.password = data.password || '';
    
  }

  this.setMsgtype = function(msgType){
    this.msgType = msgType;
  };

  
  this.setUsername = function(username){
    this.username = username;
  };
  
  this.setPassword = function(password){
    this.password = password;
  };
  
};