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
  this.queryCarCount = function (query, relations) {
    var params = {
      where: {},
    };

    // 查询条件
    if (!_.isUndefined(query) && !_.isNull(query) && !_.isEmpty(query)) {
      params.where = query;
    }

    params.include = relations;

    return this.model.count(params);
  };

  /**
   * 根据查询条件查询车辆列表
   *
   * @param query 查询条件
   * @param relations 关联关系
   * @param pageNo 当前查询页
   * @param pageSize 查询页容量
   * @param order 排序key
   * @param orderType 排序类型(1升序 2降序)
   * @return {*}
   */
  this.queryCarList = function (query, relations, pageNo, pageSize, order, orderType) {
    var params = {
      where: {},
    };

    // 查询条件
    if (!_.isUndefined(query) && !_.isNull(query) && !_.isEmpty(query)) {
      params.where = query;
    }

    params.include = relations;

    // 不需要实体
    params.raw = true;

    // 有分页
    if (!_.isUndefined(pageNo) && !_.isNull(pageNo)
      && !_.isUndefined(pageSize) && !_.isNull(pageSize)) {
      params.offset = (pageNo - 1) * pageSize;
      params.limit = pageSize;
    }

    // 有排序
    if (!_.isUndefined(order) && !_.isNull(order) && !_.isEqual(order, '')) {
      var ord = orderType == 1 ? 'ESC' : 'DESC';
      params.order = order + ' ' + ord;
    }

    return this.model.findAll(params);
  };
};

// 添加继承
util.inherits(CarDao, BaseDao);

module.exports = CarDao;