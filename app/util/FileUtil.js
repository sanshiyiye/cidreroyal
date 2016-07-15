/**
 * Created by gaojun on 16/6/15.
 */

'use strict';

var fs = require('fs');

/**
 * 请求读取文件，异步方法，返回一个promise
 *
 * @param filePath 文件路径
 * @param encoding 编码格式
 * @return {*}
 */
exports.readFile = function (filePath, encoding) {
  var deferred = Q.defer();

  encoding = encoding || 'utf-8';

  fs.readFile(filePath, encoding,
    function (err, data) {
      if (!err) {
        deferred.resolve(data);
      } else {
        deferred.reject(err);
      }
    });

  return deferred.promise;
};

/**
 * 请求读取文件，同步方法，返回文件信息
 *
 * @param filePath 文件路径
 * @param encoding 编码格式
 * @return {*}
 */
exports.readFileSync = function (filePath, encoding) {
  encoding = encoding || 'utf-8';
  return fs.readFileSync(filePath, encoding);
};

/**
 * 重命名或移动文件，异步方法，返回一个promise
 * 
 * @param {any} oldPath 旧的文件路径
 * @param {any} newPath 新的文件路径
 * @returns promise
 */
exports.renameFile = function (oldPath, newPath) {
  var deferred = Q.defer();

  fs.rename(oldPath, newPath,
    function (err, data) {
      if (!err) {
        deferred.resolve(data);
      } else {
        deferred.reject(err);
      }
    });

  return deferred.promise;
};

/**
 * 删除文件，异步方法，返回一个promise
 * 
 * @param {any} npath 删除文件的路径
 * @returns promise
 */
exports.deleteFile = function (npath) {
  var deferred = Q.defer();

  fs.unlink(npath,
    function (err, data) {
      if (!err) {
        deferred.resolve(data);
      } else {
        deferred.reject(err);
      }
    });

  return deferred.promise;
};
