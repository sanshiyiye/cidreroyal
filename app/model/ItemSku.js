/**
 * ItemSku.js
 * Created by auto tool.
 */

'use strict';

var Sequelize = require('sequelize');

function db_init(sequelize) {
  // 用户信息表
  var ItemSku = sequelize.define('itemsku', {
    
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true,
        field: "id",
        
        comment: "唯一ID",
        primaryKey: true,
        autoIncrement: true,
      },
    
      oldPrice: {
        type: Sequelize.DOUBLE(10, 3),
        allowNull: false,
        unique: false,
        field: "oldPrice",
        defaultValue: 0,
        comment: "商品原价",
        
      },
    
      price: {
        type: Sequelize.DOUBLE(10, 3),
        allowNull: false,
        unique: false,
        field: "price",
        defaultValue: 0,
        comment: "商品现价",
        
      },
    
      size: {
        type: Sequelize.DOUBLE(10, 3),
        allowNull: false,
        unique: false,
        field: "size",
        defaultValue: 0,
        comment: "商品尺寸",
        
      },
    
      stock: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        unique: false,
        field: "stock",
        defaultValue: 0,
        comment: "商品库存",
        
      },
    
      simimg: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        field: "simimg",
        defaultValue: "",
        comment: "商品缩略图",
        
      },
    
      img: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        field: "img",
        defaultValue: "",
        comment: "商品原图",
        
      },
    
      flag: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
        unique: false,
        field: "flag",
        defaultValue: 0,
        comment: "当前状态(1正常 2下架)",
        
      },
    
      default: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
        unique: false,
        field: "default",
        defaultValue: 0,
        comment: "是否默认关联商品(0否，1是)",
        
      },
    
      brandId: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: false,
        field: "brandId",
        defaultValue: 0,
        comment: "关联品牌id",
        
      },
    
      itemId: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: false,
        field: "itemId",
        defaultValue: 0,
        comment: "关联商品id",
        
      },
    
  }, {
    freezeTableName: true,
    timestamps: true,
    indexes: [
      {
        unique: false,
        fields: ['brandId',]
      },
      {
        unique: false,
        fields: ['itemId',]
      },
      
    ],
  });

  ItemSku.sync();

  return ItemSku;
}

exports.ItemSku = function (sequelize) {
  return db_init(sequelize);
};