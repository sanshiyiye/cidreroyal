/**
 * Created by gaojun on 15/10/27.
 */

'use strict';

// 建立继承关系
exports.extend = function (Child, Parent) {
  var F = function(){};
  F.prototype = Parent.prototype;
  var f = new F();
  Child.prototype = new F();
  console.log(F.prototype);
  console.log(f);
  console.log(Child.prototype);
  Child.prototype.constructor = Child;
  //Child.uber = Parent.prototype;
};