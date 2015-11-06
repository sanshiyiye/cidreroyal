/**
 * Regconfirm消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (){
  this.init = function(data){
    this.uid = data.uid || 0;
    this.token = data.token || '';
    
  };

  
  this.setUid = function(uid){
    this.uid = uid;
  };
  
  this.setToken = function(token){
    this.token = token;
  };
  
};