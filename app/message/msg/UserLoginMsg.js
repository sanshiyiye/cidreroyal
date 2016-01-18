/**
 * Login消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10205;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.username = data.username || '';
    this.password = data.password || '';
    
  }
  
  this.setUsername = function(username){
    this.username = username;
  };
  this.setPassword = function(password){
    this.password = password;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};