/**
 * Brand.js
 * Created by auto tool.
 */

'use strict';

var Sequelize = require('sequelize');

function db_init(sequelize) {
  // 用户信息表
  var Brand = sequelize.define('brand', {
    
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true,
        field: "id",
        
        comment: "唯一ID",
        primaryKey: true,
        autoIncrement: true,
      },
    
      brandName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        field: "brandName",
        defaultValue: "",
        comment: "品牌名称",
        
      },
    
      brandDec: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: false,
        field: "brandDec",
        defaultValue: "",
        comment: "品牌描述",
        
      },
    
  }, {
    freezeTableName: true,
    timestamps: true,
    indexes: [
      
    ],
  });

  Brand.sync();

  return Brand;
}

exports.Brand = function (sequelize) {
  return db_init(sequelize);
};