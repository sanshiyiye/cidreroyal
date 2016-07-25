/**
 * GetWineListBack消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (data){
  this.msgType = 10302;
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.wineList = data.wineList || 0;
    
  }
  
  this.setWinelist = function(wineList){
    this.wineList = wineList;
  };

  this.setResult = function(result) {
    this.ret = result;
  }
};