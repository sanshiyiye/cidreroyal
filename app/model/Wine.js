/**
 * Wine.js
 * Created by auto tool.
 */

'use strict';

var Sequelize = require('sequelize');

function db_init(sequelize) {
  // 用户信息表
  var Wine = sequelize.define('wine', {
    
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true,
        field: "id",
        
        comment: "唯一ID",
        primaryKey: true,
        autoIncrement: true,
      },
    
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: false,
        field: "name",
        defaultValue: "0",
        comment: "酒名称",
        
      },
    
      content: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: false,
        field: "content",
        defaultValue: "",
        comment: "含量信息",
        
      },
    
      desc: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: false,
        field: "desc",
        defaultValue: "",
        comment: "描述",
        
      },
    
      img: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: false,
        field: "img",
        defaultValue: "",
        comment: "图片名称",
        
      },
    
      norm: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: false,
        field: "norm",
        defaultValue: "",
        comment: "容量规格(多个规格用半角逗号,分隔)",
        
      },
    
  }, {
    freezeTableName: true,
    timestamps: true,
    indexes: [
      
    ],
  });

  Wine.sync();

  return Wine;
}

exports.Wine = function (sequelize) {
  return db_init(sequelize);
};