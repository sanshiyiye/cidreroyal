/**
 * Created by gaojun on 15/10/27.
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