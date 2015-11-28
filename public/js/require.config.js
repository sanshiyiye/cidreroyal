/**
 * Created by gaojun on 15/11/17.
 */

'use strict';

require.config({
  baseUrl: './',

  paths: {
    config: '/cfg/config',
    lang: '/cfg/lang',

    vendor: '/vendor',
    angular: '/vendor/angular/angular',
    'angular-route': '/vendor/angular-route/angular-route',
    'angular-cookies': '/vendor/angular-cookies/angular-cookies',
    'angular-bootstrap': '/vendor/angular-bootstrap/ui-bootstrap',

    lodash: '/js/components/lodash.extended',
    'lodash-src': '/vendor/lodash/lodash',
    bootstrap: '/vendor/bootstrap/dist/js/bootstrap',

    jquery: '/vendor/jquery/dist/jquery',
  },
  shim: {
    angular: {
      deps: ['jquery', 'config'],
      exports: 'angular'
    },

    'angular-route': {
      deps: ['angular'],
      exports: 'angular-route'
    },

    'angular-bootstrap': {
      deps: ['angular'],
      exports: 'angular-bootstrap'
    },

    'angular-cookies': {
      deps: ['angular'],
      exports: 'angular-cookies'
    },

    bootstrap: {
      deps: ['jquery']
    },

    jquery: {
      exports: 'jQuery'
    },
  },
  waitSeconds: 60,
  //urlArgs: "bust=" + (new Date()).getTime(),  //防止读取缓存，调试用
});