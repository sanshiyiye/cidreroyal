/**
 * Created by gaojun on 15/11/19.
 */

define([
  'lodash'
], function (_) {
  "use strict";

  /**
   * To add a setting, you MUST define a default. Also,
   * THESE ARE ONLY DEFAULTS.
   * They are overridden by config.js in the root directory
   * @type {Object}
   */
  var defaults = {
    // name
    name: "JFrame",

    // url
    local_url: "http://" + window.location.hostname + ":3000/",

    // default language
    default_language: "zh_CN",
    // all available language
    languages: ["zh_CN", "en_US"],

    // deafult cookie name
    cookie_user_name: "JFRAME_USER_COOKIE",

    /*
     * default cookie expire time
     * default value : 30 minutes
     */
    cookie_expiration_time: 30 * 60 * 1000,
  };

  // This initializes a new hash on purpose, to avoid adding parameters to
  // config.js without providing sane defaults
  var settings = {};
  _.each(defaults, function (value, key) {
    //settings[key] = typeof options[key] !== 'undefined' ? options[key] : defaults[key];
    settings[key] = defaults[key];
  });

  return settings;
});
