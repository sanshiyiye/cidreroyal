/**
 * Created by gaojun on 15/10/26.
 */

'use strict';

var Sequelize = require('sequelize');

function db_init(sequelize) {
  // 用户信息表
  var userinfo = sequelize.define('userinfo', {
    uid: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      unique: true,
      primaryKey: true,
      field: "uid",
      comment: "玩家唯一ID"
    },

    nickname: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "",
      field: "nickname",
      comment: "玩家昵称"
    },

    img: {
      type: Sequelize.STRING(30),
      defaultValue: "",
      comment: "玩家头像"
    },

    level: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      comment: "玩家等级"
    },

    updatetime: {
      type: Sequelize.BIGINT(13),
      defaultValue: 0,
      comment: "最后更新时间"
    },

  }, {
    freezeTableName: true,
    timestamps: false
  });

  userinfo.sync();

  return userinfo;
}

module.exports = function (sequelize) {
  return db_init(sequelize);
};