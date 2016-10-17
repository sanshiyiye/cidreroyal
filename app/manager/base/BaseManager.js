/**
 * Created by gaojun on 15/12/14.
 */

'use strict';

var BaseManager = function () {
};

/**
 * 查询时的特殊参数处理
 * @type {{}}
 * :: key 参数键值
 * :: opt 参数操作符 eg: queryParam = {'startTime':'$gte'}
 */
BaseManager.prototype.queryParam = {};

/**
 * 查询条件处理
 * 各个manager可以重写此方法,达到特殊数据修改的目的
 *
 * @param query 查询条件数据
 * @return {{}}
 */
BaseManager.prototype.getListPre = function (query) {
  return query;
};

/**
 * 查询列表接口
 *
 * @param res response对象
 * @param query 查询条件
 * @param mname 模块名称
 * @param _page 查询页
 * @param _perPage 每页条数
 * @param _sort 排序key
 * @param _order 排序方式
 */
BaseManager.prototype.getList = function (res, query, mname, _page, _perPage, _sort, _order) {
  var _this = this;
  var mdao = JF.dao[mname + "Dao"];

  // 查询条件处理
  var qp = {};
  _.forEach(query, function (value, key) {
    var opt = JF.enums.db.e;
    if (!_.isUndefined(_this.queryParam[key]) && !_.isNull(_this.queryParam[key])) {
      opt = _this.queryParam[key];
    }

    // 根据操作符进行条件拼写
    var param = JF.util.db.buildQueryParam(value, opt);
    if (!_.isUndefined(param) && !_.isNull(param) && !_.isEqual('', param)) {
      qp[key] = param;
    }
  });

  // 根据条件查询数据
  var queryList = function (count) {
    res.setHeader('Total_Count', count);
    return mdao.queryList(qp, false, _page, _perPage, _sort, _order);
  };

  // 根据条件查询数据
  var queryCount = function (newQuery) {
    qp = newQuery;
    return mdao.queryCount(qp);
  };

  var buildList = function (list) {
    JF.util.http.resBack(res, list);
  };

  Q.fcall(this.getListPre.bind(null, qp))
    .then(queryCount)
    .then(queryList)
    .then(buildList)
    .catch(JF.util.http.error.bind(null, res));
};

/**
 * 入参数据处理，新增数据前的数据处理方法
 * 各个manager可以重写此方法,达到特殊数据修改的目的
 *
 * @param newData 请求数据
 * @return {{}}
 */
BaseManager.prototype.addNewPre = function (newData) {
  return newData;
};

/**
 * 新增数据接口
 *
 * @param res response对象
 * @param reqData 请求入参数据
 * @param mname 模块名称
 */
BaseManager.prototype.addNew = function (res, reqData, mname) {
  var model = JF.dbs[mname];
  var mdao = JF.dao[mname + "Dao"];

  // 入参对象数据处理
  var newData = {};
  _.forEach(reqData, function (value, key) {
    if (!_.isUndefined(value) && !_.isNull(value)) {
      newData[key] = value;
    }
  });

  // 新增数据
  var addNew = function (ndata) {

    var entity = model.build(ndata);

    // 保存
    return mdao.save(entity);
  };

  var addRes = function (entity) {

    JF.util.http.resBack(res, entity.dataValues);
  };

  Q.fcall(this.addNewPre.bind(null, newData))
    .then(addNew)
    .then(addRes)
    .catch(JF.util.http.error.bind(null, res));
};

/**
 * 查询数据处理，查询出数据后的处理方法
 * 各个manager可以重写此方法,达到特殊数据修改的目的
 *
 * @param reData
 * @return {*}
 */
BaseManager.prototype.getByIdSuf = function (reData) {
  return reData;
};

/**
 * 根据id获取entity数据
 *
 * @param res response对象
 * @param mname 模块名称
 * @param id 数据唯一id
 */
BaseManager.prototype.getById = function (res, mname, id) {
  var _this = this;
  var mdao = JF.dao[mname + "Dao"];

  var getById = function () {
    return mdao.get(id);
  };

  var buildRes = function (entity) {
    var reData = {};
    if (!_.isUndefined(entity) && !_.isNull(entity)) {
      reData = entity.dataValues;
    }

    return _this.getByIdSuf(reData);
  };

  var reBack = function (reData) {
    JF.util.http.resBack(res, reData);
  };

  Q.fcall(getById)
    .then(buildRes)
    .then(reBack)
    .catch(JF.util.http.error.bind(null, res));
};

/**
 * 入参数据处理，更新数据前的数据处理方法
 * 各个manager可以重写此方法,达到特殊数据修改的目的
 *
 * @param upData 更新数据
 * @return {{}}
 */
BaseManager.prototype.updatePre = function (upData) {
  return upData;
};

/**
 * 根据id更新entity数据
 *
 * @param res response对象
 * @param reqData 请求数据
 * @param mname 模块名称
 * @param id 实体数据id
 */
BaseManager.prototype.update = function (res, reqData, mname, id) {
  var _this = this;
  var mdao = JF.dao[mname + "Dao"];

  var getById = function (qData) {
    reqData = qData;
    return mdao.get(id);
  };

  var modifyEntity = function (entity) {
    if (!_.isUndefined(entity) || !_.isNull(entity)) {
      // 更新
      return mdao.update(entity, reqData);
    } else {
      throw new Error(JF.enums.ret.ERROR);
    }
  };

  var sucUpdate = function (entity) {
    JF.util.http.resBack(res, entity);
  };

  Q.fcall(this.updatePre.bind(null, reqData))
    .then(getById)
    .then(modifyEntity)
    .then(sucUpdate)
    .catch(JF.util.http.error.bind(null, res));
};

/**
 * 删除数据处理，删除数据后的数据处理方法
 * 各个manager可以重写此方法,达到特殊数据修改的目的
 *
 * @param delData 删除数据
 * @return {{}}
 */
BaseManager.prototype.delByIdSuf = function (delData) {
  return delData;
};

/**
 * 根据id删除entity数据
 *
 * @param res response对象
 * @param mname 模块名称
 * @param id 数据唯一id
 */
BaseManager.prototype.delById = function (res, mname, id) {
  var _this = this;
  var mdao = JF.dao[mname + "Dao"];

  var getById = function () {
    return mdao.get(id);
  };

  var delEntry = function (entry) {
    return mdao.delete(entry);
  };

  var buildRes = function (entity) {
    var reData = {};
    if (!_.isUndefined(entity) && !_.isNull(entity)) {
      reData = entity.dataValues;
    }

    return _this.delByIdSuf(reData);
  };

  var reBack = function (reData) {
    JF.util.http.resBack(res, reData);
  };

  Q.fcall(getById)
    .then(delEntry)
    .then(buildRes)
    .then(reBack)
    .catch(JF.util.http.error.bind(null, res));
};


module.exports = BaseManager;