/**
 * QueryCarList消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10303;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.queryList = data.queryList || 0;
    this.pageNo = data.pageNo || 0;
    this.pageSize = data.pageSize || 0;
    this.order = data.order || '';
    this.orderType = data.orderType || 0;
    
  }
  
  this.setQuerylist = function(queryList){
    this.queryList = queryList;
  };
  this.setPageno = function(pageNo){
    this.pageNo = pageNo;
  };
  this.setPagesize = function(pageSize){
    this.pageSize = pageSize;
  };
  this.setOrder = function(order){
    this.order = order;
  };
  this.setOrdertype = function(orderType){
    this.orderType = orderType;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};