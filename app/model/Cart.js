/**
 * Cart.js
 * Created by auto tool.
 */

'use strict';

var Sequelize = require('sequelize');

function db_init(sequelize) {
  // 用户信息表
  var Cart = sequelize.define('cart', {
    
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
        comment: "用户id",
        
      },
    
      itemId: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: false,
        field: "itemId",
        defaultValue: 0,
        comment: "商品id",
        
      },
    
      itemName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        field: "itemName",
        defaultValue: "",
        comment: "商品名称",
        
      },
    
      num: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        unique: false,
        field: "num",
        defaultValue: 0,
        comment: "商品数量",
        
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

  Cart.sync();

  return Cart;
}

exports.Cart = function (sequelize) {
  return db_init(sequelize);
};