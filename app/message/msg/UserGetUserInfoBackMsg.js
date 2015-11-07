/**
 * GetUserInfoBack消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.msgType = data.msgType || 0;
    this.username = data.username || '';
    this.email = data.email || '';
    this.telephone = data.telephone || 0;
    this.nickname = data.nickname || '';
    this.img = data.img || '';
    this.state = data.state || 0;
    
  }

  this.setMsgtype = function(msgType){
    this.msgType = msgType;
  };

  
  this.setUsername = function(username){
    this.username = username;
  };
  
  this.setEmail = function(email){
    this.email = email;
  };
  
  this.setTelephone = function(telephone){
    this.telephone = telephone;
  };
  
  this.setNickname = function(nickname){
    this.nickname = nickname;
  };
  
  this.setImg = function(img){
    this.img = img;
  };
  
  this.setState = function(state){
    this.state = state;
  };
  
};