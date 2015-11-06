/**
 * Created by gaojun on 15/11/4.
 */

'use strict';

module.exports = function (data){
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.uid = data.uid || "";
    this.token = data.token || "";
  }

  this.setUid = function(uid){
    this.uid = uid;
  };

  this.setToken = function(token){
    this.token = token;
  };
};