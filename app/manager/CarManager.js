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

    // 处理查询条件
    _.forEach(queryList, function (data) {
      var oper = data.oper | JF.enums.db.e;
      // 根据操作符进行条件拼写
      var param = JF.util.db.buildQueryParam(data.value, oper, data.key);
      if (!_.isUndefined(param) && !_.isNull(param) && !_.isEqual('', param)) {
        query[data.key] = param;
      }
    });

    // 车型关联
    relations.push({
      model: JF.dao.CarModelDao.model,
      where: {id: JF.dbs.sequelize.col('car.modelId')}
    });

    // 颜色关联
    relations.push({
      model: JF.dao.CarColorDao.model,
      where: {id: JF.dbs.sequelize.col('car.color')}
    });

    return [query, relations];
  };

  /**
   * 查询数量条数
   *
   * @param msgData
   * @param res
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
};

// 添加继承
util.inherits(CarManager, BaseManager);

module.exports = new CarManager();