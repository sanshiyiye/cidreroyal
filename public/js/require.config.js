/**
 * Created by gaojun on 15/11/26.
 */

/**
 * 通过requirejs进行js加载
 * 为方便后期打包剔除多余的js
 * (特别是打包需要使用压缩和混淆后的js)
 * 所有vendor下的js必须通过此文件进行引用
 */
requirejs.config({
  baseUrl: 'js',

  paths: {
    config: './cfg/config',
    lang: './cfg/lang',
    //enums: './enum/Enum',
    sprintf: './util/sprintf',

    tweenMax: '../vendor/gsap/src/minified/TweenMax.min',

    lodash: '../vendor/lodash/lodash',//.min',
    angular: '../vendor/angular/angular',//.min',
    // angularAnimate: '../vendor/angular-animate/angular-animate',//.min',
    angularResource: '../vendor/angular-resource/angular-resource',//.min',
    angularSanitize: '../vendor/angular-sanitize/angular-sanitize',//.min',
    uiRouter: '../vendor/angular-ui-router/release/angular-ui-router',//.min',
    ngCookies: '../vendor/angular-cookies/angular-cookies',//.min',
    ngHttpAuth: '../vendor/angular-http-auth/src/http-auth-interceptor',
    ngLocalStorage: '../vendor/angular-local-storage/dist/angular-local-storage',//.min',
    ngAnimate: '../vendor/angular-animate/angular-animate',//.min',
    ngFx: '../vendor/ngFx/dist/ngFx',//.min',

    jquery: '../vendor/jquery/dist/jquery',//.min',

    wowslider: './components/wowslider',
    wowsliderscript: './components/wowslider-script',
  },

  shim: {
    angular: {
      exports: 'angular'
    },

    wowslider: {
      deps: ['jquery']
    },

    wowsliderscript: {
      deps: ['jquery', 'wowslider']
    },

    // angularAnimate: {
    //   deps: ['angular']
    // },

    angularResource: {
      deps: ['angular']
    },

    angularSanitize: {
      deps: ['angular']
    },

    uiRouter: {
      deps: ['angular']
    },

    ngCookies: {
      deps: ['angular']
    },

    ngHttpAuth: {
      deps: ['angular']
    },

    ngLocalStorage: {
      deps: ['angular']
    },

    ngAnimate: {
      deps: ['angular']
    },

    ngFx: {
      deps: [
        'ngAnimate',
        'tweenMax'
      ]
    },

  },

  priority: [
    'angular',
  ],

  waitSeconds: 60,

  //urlArgs: "bust=" + (new Date()).getTime(),  //防止读取缓存，调试用
});
