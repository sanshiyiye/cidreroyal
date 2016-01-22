/**
 * QueryCarListBack消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10304;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.carList = data.carList || 0;
    this.pageNo = data.pageNo || 0;
    this.pageSize = data.pageSize || 0;
    this.totalNum = data.totalNum || 0;
    
  }
  
  this.setCarlist = function(carList){
    this.carList = carList;
  };
  this.setPageno = function(pageNo){
    this.pageNo = pageNo;
  };
  this.setPagesize = function(pageSize){
    this.pageSize = pageSize;
  };
  this.setTotalnum = function(totalNum){
    this.totalNum = totalNum;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};