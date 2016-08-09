/**
 * 数据库模块service类
 * Created by auto tool.
 */

'use strict';

var address = require(config.serverRoot + "/model/Address");
var blog = require(config.serverRoot + "/model/Blog");
var brand = require(config.serverRoot + "/model/Brand");
var cart = require(config.serverRoot + "/model/Cart");
var city = require(config.serverRoot + "/model/City");
var item = require(config.serverRoot + "/model/Item");
var itemsku = require(config.serverRoot + "/model/ItemSku");
var userinfo = require(config.serverRoot + "/model/UserInfo");
var wine = require(config.serverRoot + "/model/Wine");



// 数据库model绑定映射
module.exports = function (sequelize) {
  var dbModels = {
    Address: address.Address(sequelize),
    Blog: blog.Blog(sequelize),
    Brand: brand.Brand(sequelize),
    Cart: cart.Cart(sequelize),
    City: city.City(sequelize),
    Item: item.Item(sequelize),
    ItemSku: itemsku.ItemSku(sequelize),
    UserInfo: userinfo.UserInfo(sequelize),
    Wine: wine.Wine(sequelize),
    
  };

  // 关联关系
  dbModels.UserInfo.hasMany(dbModels.Cart, {foreignKey: 'userId', constraints: false});
  dbModels.Cart.belongsTo(dbModels.UserInfo, {foreignKey: 'userId', constraints: false});
  
  dbModels.Item.hasMany(dbModels.Cart, {foreignKey: 'itemId', constraints: false});
  dbModels.Cart.belongsTo(dbModels.Item, {foreignKey: 'itemId', constraints: false});
  
  dbModels.Brand.hasMany(dbModels.Item, {foreignKey: 'brandId', constraints: false});
  dbModels.Item.belongsTo(dbModels.Brand, {foreignKey: 'brandId', constraints: false});
  
  dbModels.Brand.hasMany(dbModels.ItemSku, {foreignKey: 'brandId', constraints: false});
  dbModels.ItemSku.belongsTo(dbModels.Brand, {foreignKey: 'brandId', constraints: false});
  
  dbModels.Item.hasMany(dbModels.ItemSku, {foreignKey: 'itemId', constraints: false});
  dbModels.ItemSku.belongsTo(dbModels.Item, {foreignKey: 'itemId', constraints: false});
  

  return dbModels;
};