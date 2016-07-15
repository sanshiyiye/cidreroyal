/**
 * Created by gaojun on 16/6/23.
 */

'use strict';

var fs = require('fs');
var exec = require('child_process').exec;

/**
 * 执行命令并且不等待返回结果
 *
 * @param cmd 执行的命令
 * @param ologData 操作日志信息
 * @param params 执行额外参数
 * @param callbackFunc 回调函数
 * @return 操作日志信息
 */
exports.execNoWait = function (cmd, ologData, params, callbackFunc) {
  var options = params || {};
  var filename = ologData.logfile;

  // 创建一个可写流的实例
  var file = fs.createWriteStream(config.logRoot + '/' + filename);

  // 进程结束时的回调
  var callback = function (error, stdout, stderr) {
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);

    // 关闭文件流
    file.end();

    var flag = JF.enums.olog.LOG_SUCCESS;
    if (error || !_.isEqual('', stderr)) {
      flag = JF.enums.olog.LOG_FAIL;
      console.log('Failed! generate log info in ->' + filename);
      console.log('exec error: ' + error);
      console.log('exec error: ' + stderr);
    } else {
      console.log('Success! generate log info in ->' + filename);

      // 根据操作日志类型进行不同的回调处理
      if (callbackFunc) {
        Q.fcall(callbackFunc)
          .catch(JF.util.http.error.bind(null, null));
      }
    }

    // 更新操作日志信息
    var newlog = {
      flag: flag,
      otime: new Date().getTime(),
    };
    // 将操作的cmd 也放入备注中
    var remarkData = JSON.parse(ologData.remark);
    remarkData.cmd = cmd;
    newlog.remark = JSON.stringify(params);
    // 进行更新操作
    JF.ma.GM_OlogManager.updateLog(ologData.id, newlog)
      .catch(JF.util.http.error.bind(null, null));
  };

  // 使用exec运行curl
  var process = exec(cmd, options, callback);

  process.stderr.on('data', function (data) {
    file.write(data);
  });

  process.stdout.on('data', function (data) {
    file.write(data);
  });

  return ologData;
};