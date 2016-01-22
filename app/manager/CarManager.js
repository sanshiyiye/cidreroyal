/**
 * CarManager.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseManager = require(config.serverRoot + '/manager/base/BaseManager');

/**
 * 出售车辆信息表管理器
 *
 * @constructor
 */
var CarManager = function () {
  var _this = this;

  var buildCarQueryParams = function (queryList) {
    var query = {};
    var relations = [];

    // 车型关联
    var modelRe = {
      model: JF.dao.CarModelDao.model,
      where: {id: JF.dbs.sequelize.col('car.modelId')}
    };
    relations.push(modelRe);

    // 颜色关联
    var colorRe = {
      model: JF.dao.CarColorDao.model,
      where: {id: JF.dbs.sequelize.col('car.color')}
    };
    relations.push(colorRe);

    // 处理查询条件
    _.forEach(queryList, function (data) {
      var oper = data.oper || JF.enums.db.e;
      // 根据操作符进行条件拼写
      var param = JF.util.db.buildQueryParam(data.value, oper, data.key);
      if (!_.isUndefined(param) && !_.isNull(param) && !_.isEqual('', param)) {
        // 特殊字段处理
        if (_.isEqual('carType', data.key)) {
          modelRe.where[data.key] = param;
        } else {
          query[data.key] = param;
        }
      }
    });

    return [query, relations];
  };

  /**
   * 查询数量条数
   *
   * @param msgData 消息实体
   * @param res response对象
   */
  this.queryCarNum = function (msgData, res) {
    // 消息返回
    var backMsg = new JF.msg.CarQueryCarNumBackMsg();

    // 构建查询条件并查询
    var buildQuey = function () {
      var queryData = buildCarQueryParams(msgData.queryList);

      return JF.dao.CarDao.queryCarCount(queryData[0], queryData[1]);
    };

    // 构建查询结构
    var buildResult = function (num) {
      backMsg.setQuerynum(num);

      throw new Error(JF.enums.ret.SUCCESS);
    };

    // 逻辑处理
    Q.fcall(buildQuey)
      .then(buildResult)
      .catch(JF.util.http.error.bind(null, res, backMsg));
  };

  /**
   * 查询车辆数据
   *
   * @param msgData 消息实体
   * @param res response对象
   */
  this.queryCarList = function (msgData, res) {
    // 消息返回
    var backMsg = new JF.msg.CarQueryCarListBackMsg();
    var queryData = buildCarQueryParams(msgData.queryList);

    // 构建查询条件并查询
    var buildNumQuery = function () {
      return JF.dao.CarDao.queryCarCount(queryData[0], queryData[1]);
    };

    // 构建查询条件并查询
    var buildQuery = function () {
      return JF.dao.CarDao.queryCarList(queryData[0], queryData[1],
        msgData.pageNo, msgData.pageSize, msgData.order, msgData.orderType);
    };

    // 构建查询结构
    var buildResult = function (carList, totalNum) {
      var list = [];
      _.forEach(carList, function (carData) {
        var data = {
          id: carData.id,
          modelId: carData['carmodel.id'],
          modelName: carData['carmodel.name'],
          seriesId: carData['carmodel.brandSeriesId'],
          brandId: carData.brandId,
          price: carData.price,
          startTime: carData.startTime,
          distance: carData.distance,
          tag: carData.tag,
          showImg: config.carImgPath + carData.showImg,
        };

        list.push(data);
      });

      backMsg.setCarlist(list);
      backMsg.setPageno(msgData.pageNo);
      backMsg.setPagesize(msgData.pageSize);
      backMsg.setTotalnum(totalNum);

      throw new Error(JF.enums.ret.SUCCESS);
    };

    // 逻辑处理
    Q.all([buildQuery(), buildNumQuery()])
      .spread(buildResult)
      //fcall(buildQuery)
      //.then(buildResult)
      .catch(JF.util.http.error.bind(null, res, backMsg));
  };

  /**
   * 查询车辆详细数据
   *
   * @param msgData 消息实体
   * @param res response对象
   */
  this.queryCarInfo = function (msgData, res) {
    // 消息返回
    var backMsg = new JF.msg.CarQueryCarInfoBackMsg();
    var car = null;

    var queryCar = function () {
      return JF.dao.CarDao.get(msgData.carId);
    };

    var querySeller = function (sellId) {
      return JF.dao.UserInfoDao.get(sellId);
    };

    var queryAppraiser = function (appraiserId) {
      return JF.dao.AppraiserDao.get(appraiserId);
    };

    var queryCarModel = function (modelId) {
      return JF.dao.CarModelDao.get(modelId);
    };

    var queryCarImgs = function (carId) {
      return JF.dao.CarImgDao.queryList({carId: carId}, false);
    };

    var queryCarBack = function (carData) {
      // 没有查到数据
      if (_.isUndefined(carData) || _.isNull(carData)) {
        throw new Error(JF.enums.ret.CAR_NOT_EXIST);
      }

      // 处理车辆信息
      backMsg.setId(carData.id);
      backMsg.setSellid(carData.sellId);
      backMsg.setSelldesc(carData.sellDesc);
      backMsg.setAppraiserid(carData.appraiserId);
      backMsg.setAppraiserdesc(carData.appraiserDesc);
      backMsg.setBrandid(carData.brandId);
      backMsg.setPrice(carData.price);
      backMsg.setDistance(carData.distance);
      backMsg.setCity(carData.city);
      backMsg.setStarttime(carData.startTime);
      backMsg.setColor(carData.color);
      backMsg.setTag(carData.tag);

      return Q.all([
        queryCarModel(carData.modelId),
        queryCarImgs(carData.id),
        querySeller(carData.sellId),
        queryAppraiser(carData.appraiserId)
      ]);
    };

    var buildResult = function (carModel, carImgs, seller, appraiser) {
      // 车辆型号
      if (!_.isUndefined(carModel) && !_.isNull(carModel)) {
        backMsg.setSeriesid(carModel.brandSeriesId);
        backMsg.setModelid(carModel.id);
        backMsg.setModelname(carModel.name);
        backMsg.setCartype(carModel.carType);
        backMsg.setTransmission(carModel.transmission);
      }

      // 展示图片
      if (!_.isUndefined(carImgs) && !_.isNull(carImgs)) {
        var imgs = [];

        _.forEach(carImgs, function (carImg) {
          var data = {
            id: carImg.id,
            imgUrl: config.carImgPath + carImg.imgName,
            imgType: carImg.imgType,
          };

          imgs.push(data);
        });

        backMsg.setImglist(imgs);
      }

      // 出售人
      if (!_.isUndefined(seller) && !_.isNull(seller)) {
        backMsg.setSelltelephone(appraiser.telephone);
        backMsg.setSellnickname(appraiser.nickname);
        backMsg.setSellimg(config.sellImgPath + seller.img);
      }

      // 评估人
      if (!_.isUndefined(appraiser) && !_.isNull(appraiser)) {
        backMsg.setApprtitle(appraiser.title);
        backMsg.setApprtelephone(appraiser.telephone);
        backMsg.setApprnickname(appraiser.nickname);
        backMsg.setApprimg(config.apprImgPath + appraiser.img);
      }

      throw new Error(JF.enums.ret.SUCCESS);
    };


    // 逻辑处理
    Q.fcall(queryCar)
      .then(queryCarBack)
      .spread(buildResult)
      .catch(JF.util.http.error.bind(null, res, backMsg));
  };
};

// 添加继承
util.inherits(CarManager, BaseManager);

module.exports = new CarManager();