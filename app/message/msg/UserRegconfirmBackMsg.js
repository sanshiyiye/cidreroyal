/**
 * RegconfirmBack消息
 * Created by auto tool.
 */

'use strict';

module.exports = function (){
  this.init = function(data){
    this.result = data.result || 0;
    
  };

  
  this.setResult = function(result){
    this.result = result;
  };
  
};