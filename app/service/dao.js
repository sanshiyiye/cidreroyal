/**
 * dao实例类
 * Created by auto tool.
 */

'use strict';

var BrandDao = require(config.serverRoot + '/dao/BrandDao');
var CarDao = require(config.serverRoot + '/dao/CarDao');
var CarModelDao = require(config.serverRoot + '/dao/CarModelDao');
var CarTypeDao = require(config.serverRoot + '/dao/CarTypeDao');
var CityDao = require(config.serverRoot + '/dao/CityDao');
var UserInfoDao = require(config.serverRoot + '/dao/UserInfoDao');


module.exports = function (dbs) {
  var dao = {};

  dao.BrandDao = new BrandDao(dbs.BrandDao);
  dao.CarDao = new CarDao(dbs.CarDao);
  dao.CarModelDao = new CarModelDao(dbs.CarModelDao);
  dao.CarTypeDao = new CarTypeDao(dbs.CarTypeDao);
  dao.CityDao = new CityDao(dbs.CityDao);
  dao.UserInfoDao = new UserInfoDao(dbs.UserInfoDao);
  

  return dao;
};