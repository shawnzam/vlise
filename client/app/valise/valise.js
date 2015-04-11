'use strict';

angular.module('valiseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('valise', {
        url: '/valise',
        templateUrl: 'app/valise/valise.html',
        controller: 'ValiseCtrl'
      });
  });