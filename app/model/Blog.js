/**
 * Blog.js
 * Created by auto tool.
 */

'use strict';

var Sequelize = require('sequelize');

function db_init(sequelize) {
  // 用户信息表
  var Blog = sequelize.define('blog', {
    
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
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        field: "name",
        defaultValue: "",
        comment: "blog名称",
        
      },
    
      fpart: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: false,
        field: "fpart",
        defaultValue: "",
        comment: "blog第一段信息",
        
      },
    
      bpart: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false,
        field: "bpart",
        defaultValue: "",
        comment: "blog正文",
        
      },
    
      img: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: false,
        field: "img",
        defaultValue: "",
        comment: "图片名称",
        
      },
    
  }, {
    freezeTableName: true,
    timestamps: true,
    indexes: [
      
    ],
  });

  Blog.sync();

  return Blog;
}

exports.Blog = function (sequelize) {
  return db_init(sequelize);
};