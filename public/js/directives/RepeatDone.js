/**
 * Created by gaojun on 16/1/22.
 */

define(
  [],
  function () {
    'use strict';

    return function () {
      return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered
          scope.$eval(attrs.repeatDone);
        }
      };
    };
  }
);
