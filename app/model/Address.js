/**
 * Address.js
 * Created by auto tool.
 */

'use strict';

var Sequelize = require('sequelize');

function db_init(sequelize) {
  // 用户信息表
  var Address = sequelize.define('address', {
    
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true,
        field: "id",
        
        comment: "唯一ID",
        primaryKey: true,
        autoIncrement: true,
      },
    
      userId: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: false,
        field: "userId",
        defaultValue: 0,
        comment: "用户Id",
        
      },
    
      city: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true,
        field: "city",
        defaultValue: 0,
        comment: "城市id",
        
      },
    
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        field: "address",
        defaultValue: "",
        comment: "详细地址",
        
      },
    
      zip: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        unique: false,
        field: "zip",
        defaultValue: 0,
        comment: "邮编",
        
      },
    
      receiver: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: false,
        field: "receiver",
        defaultValue: "",
        comment: "收件人名称",
        
      },
    
      telephone: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: false,
        field: "telephone",
        defaultValue: 0,
        comment: "联系电话",
        
      },
    
      default: {
        type: Sequelize.INTEGER(5),
        allowNull: true,
        unique: false,
        field: "default",
        defaultValue: 0,
        comment: "是否默认(0否,1是)",
        
      },
    
  }, {
    freezeTableName: true,
    timestamps: true,
    indexes: [
      {
        unique: false,
        fields: ['userId',]
      },
      
    ],
  });

  Address.sync();

  return Address;
}

exports.Address = function (sequelize) {
  return db_init(sequelize);
};