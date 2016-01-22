/**
 * QueryCarInfo消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10305;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.carId = data.carId || 0;
    
  }
  
  this.setCarid = function(carId){
    this.carId = carId;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};