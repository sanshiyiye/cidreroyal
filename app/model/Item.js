/**
 * Item.js
 * Created by auto tool.
 */

'use strict';

var Sequelize = require('sequelize');

function db_init(sequelize) {
  // 用户信息表
  var Item = sequelize.define('item', {
    
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true,
        field: "id",
        
        comment: "唯一ID",
        primaryKey: true,
        autoIncrement: true,
      },
    
      itemName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        field: "itemName",
        defaultValue: "",
        comment: "商品名称",
        
      },
    
      itemDec: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: false,
        field: "itemDec",
        defaultValue: "",
        comment: "商品描述",
        
      },
    
      flag: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
        unique: false,
        field: "flag",
        defaultValue: 0,
        comment: "当前状态(1正常 2下架)",
        
      },
    
      brandId: {
        type: Sequelize.DOUBLE(20, 3),
        allowNull: false,
        unique: false,
        field: "brandId",
        defaultValue: 0,
        comment: "关联品牌id",
        
      },
    
  }, {
    freezeTableName: true,
    timestamps: true,
    indexes: [
      {
        unique: false,
        fields: ['brandId',]
      },
      
    ],
  });

  Item.sync();

  return Item;
}

exports.Item = function (sequelize) {
  return db_init(sequelize);
};