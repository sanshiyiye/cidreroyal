/**
 * Created by gaojun on 15/12/2.
 */

define(
  [
    '../enum/Enum_Base',
    '../enum/Enum_MsgType',
    '../enum/Enum_Ret',
  ],
  function (base, msgType, ret) {
    'use strict';

    return [
      function () {
        this.base = base;
        this.msgType = msgType;
        this.ret = ret;
      }
    ];
  }
);
