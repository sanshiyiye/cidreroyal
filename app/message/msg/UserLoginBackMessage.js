/**
 * Created by gaojun on 15/10/27.
 */

'use strict';

module.exports = function (){
  this.init = function(data){
    this.username = data.username || "";
    this.password = data.password || "";
  }
};