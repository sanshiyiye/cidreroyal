/**
 * Created by gaojun on 15/10/26.
 */

'use strict';

var routes = require('../routes/index');
var game = require('../routes/game');

module.exports = function (app, dbs) {
  app.use('/', routes);

  app.use('/game', game);
};