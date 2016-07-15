/**
 * Created by gaojun on 16/6/22.
 */

'use strict';

var Client = require('svn-spawn');

exports.getClient = function (path) {
  return new Client({
    cwd: path,
    // optional if authentication not required or is already saved
    username: config.SVN_USER,
    // optional if authentication not required or is already saved
    password: config.SVN_PWD,
    // optional, if true, username does not become the logged in user on the machine
    noAuthCache: config.SVN_NO_AUTH_CACHE,
  });
};