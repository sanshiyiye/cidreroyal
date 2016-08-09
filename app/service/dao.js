/**
 * dao实例类
 * Created by auto tool.
 */

'use strict';

var AddressDao = require(config.serverRoot + '/dao/AddressDao');
var BlogDao = require(config.serverRoot + '/dao/BlogDao');
var BrandDao = require(config.serverRoot + '/dao/BrandDao');
var CartDao = require(config.serverRoot + '/dao/CartDao');
var CityDao = require(config.serverRoot + '/dao/CityDao');
var ItemDao = require(config.serverRoot + '/dao/ItemDao');
var ItemSkuDao = require(config.serverRoot + '/dao/ItemSkuDao');
var UserInfoDao = require(config.serverRoot + '/dao/UserInfoDao');
var WineDao = require(config.serverRoot + '/dao/WineDao');


module.exports = function (dbs) {
  var dao = {};

  dao.AddressDao = new AddressDao(dbs.Address);
  dao.BlogDao = new BlogDao(dbs.Blog);
  dao.BrandDao = new BrandDao(dbs.Brand);
  dao.CartDao = new CartDao(dbs.Cart);
  dao.CityDao = new CityDao(dbs.City);
  dao.ItemDao = new ItemDao(dbs.Item);
  dao.ItemSkuDao = new ItemSkuDao(dbs.ItemSku);
  dao.UserInfoDao = new UserInfoDao(dbs.UserInfo);
  dao.WineDao = new WineDao(dbs.Wine);
  

  return dao;
};