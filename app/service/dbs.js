/**
 * 数据库模块service类
 * Created by auto tool.
 */

'use strict';

var Sequelize = require('sequelize');
var Redis = require('ioredis');

var appraiser = require(config.serverRoot + "/model/Appraiser");
var brand = require(config.serverRoot + "/model/Brand");
var brandseries = require(config.serverRoot + "/model/BrandSeries");
var car = require(config.serverRoot + "/model/Car");
var carcolor = require(config.serverRoot + "/model/CarColor");
var carengine = require(config.serverRoot + "/model/CarEngine");
var carmodel = require(config.serverRoot + "/model/CarModel");
var cartype = require(config.serverRoot + "/model/CarType");
var city = require(config.serverRoot + "/model/City");
var tags = require(config.serverRoot + "/model/Tags");
var userinfo = require(config.serverRoot + "/model/UserInfo");


// mysql 连接
function loadMysql() {
  return new Sequelize(config.DB_dbname, config.DB_username, config.DB_password, {
    host: config.DB_host,
    port: config.DB_port,
    dialect: config.DB_dialect,

    pool: {
      max: config.DB_maxpool,
      min: config.DB_minpool,
      idle: 10000
    }
  });
}

// redis 连接
function loadRedis() {
  return new Redis(config.RD_port, config.RD_host);
}

// 加载操作
// redis连接
exports.redis = loadRedis();

// 数据库连接以及连接池
var sequelize = loadMysql();
exports.sequelize = sequelize;

// model映射
exports.Appraiser = appraiser.Appraiser(sequelize);
exports.Brand = brand.Brand(sequelize);
exports.BrandSeries = brandseries.BrandSeries(sequelize);
exports.Car = car.Car(sequelize);
exports.CarColor = carcolor.CarColor(sequelize);
exports.CarEngine = carengine.CarEngine(sequelize);
exports.CarModel = carmodel.CarModel(sequelize);
exports.CarType = cartype.CarType(sequelize);
exports.City = city.City(sequelize);
exports.Tags = tags.Tags(sequelize);
exports.UserInfo = userinfo.UserInfo(sequelize);


// 关联关系
exports.UserInfo.hasMany(exports.Car);
exports.Car.belongsTo(exports.UserInfo, {foreignKey: 'sellId'});

exports.Appraiser.hasMany(exports.Car);
exports.Car.belongsTo(exports.Appraiser, {foreignKey: 'appraiserId'});

exports.CarModel.hasMany(exports.Car);
exports.Car.belongsTo(exports.CarModel, {foreignKey: 'modelId'});

exports.CarColor.hasMany(exports.Car);
exports.Car.belongsTo(exports.CarColor, {foreignKey: 'color'});
