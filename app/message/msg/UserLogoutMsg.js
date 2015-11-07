/**
 * Logout消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.msgType = data.msgType || 0;
    
  }

  this.setMsgtype = function(msgType){
    this.msgType = msgType;
  };

  
};