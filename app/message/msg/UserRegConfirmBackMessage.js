/**
 * Created by gaojun on 15/11/4.
 */

'use strict';

module.exports = function (data){
  if(!_.isUndefined(data) && !_.isNull(data)){
    this.result = data.result || "";
  }

  this.setResult = function(result){
    this.result = result;
  };
};