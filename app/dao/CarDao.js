/**
 * CarDao.js
 * Created by auto tool.
 */

'use strict';
var util = require('util');
var BaseDao = require(config.serverRoot + '/dao/base/BaseDao');

/**
 * 出售车辆信息表数据库层操作类
 *
 * @constructor
 */
var CarDao = function (CarModel) {
  this.model = CarModel;

  /**
   * 根据查询条件查询车辆数量
   *
   * @param query 查询条件
   * @param relations 关联结构
   */
  this.queryCarCount = function(query, relations){
    var params = {
      where: {},
    };

    // 查询条件
    if (!_.isUndefined(query) && !_.isNull(query) && !_.isEmpty(query)) {
      params.where = query;
    }

    params.include = relations;
    //include: [{
    //  model: Task,
    //  where: { state: Sequelize.col('project.state') }
    //}]

    return this.model.count(params);
  };
};

// 添加继承
util.inherits(CarDao, BaseDao);

module.exports = CarDao;