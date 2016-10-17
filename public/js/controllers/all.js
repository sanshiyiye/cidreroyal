/**
 * Created by gaojun on 15/11/26.
 */

define(
  [
    // Standard Libs
    'angular',
    'lodash',
    'config',

    // controllers
    './AppCtrl',
    './LoginCtrl',
    './SignupCtrl',
    './MainCtrl',
    './HomeCtrl',
    './HeaderCtrl',
    './FooterCtrl',
    './UserCtrl',
  ],
  function (angular, _, config
    , appCtrl, loginCtrl, signupCtrl, mainCtrl, homeCtrl, headerCtrl, footerCtrl
    , userCtrl) {
    'use strict';

    var module = angular.module(config.name + '.controllers', []);

    module.controller('appCtrl', appCtrl);
    module.controller('loginCtrl', loginCtrl);
    module.controller('signupCtrl', signupCtrl);
    module.controller('mainCtrl', mainCtrl);
    module.controller('homeCtrl', homeCtrl);
    module.controller('headerCtrl', headerCtrl);
    module.controller('footerCtrl', footerCtrl);
    module.controller('userCtrl', userCtrl);
  }
);
