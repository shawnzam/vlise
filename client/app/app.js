'use strict';

angular.module('valiseApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'jsbn.BigInteger',
  'currencyMask',
  'nvd3'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }).constant("config", {
    dollar: 0.0689,
    //denominations: [1,5,10,20,100],
    denominations: [
      {label: 'Benjamins ($100)', value: 100},
      {label: 'Andrew Jacksons ($20)', value: 20},
      {label: 'Alexander Hamiltons ($10)', value: 10},
      {label: 'Abraham Lincolns ($5)', value: 5},
      {label: 'George Washingtons ($1)', value: 1}
    ],
    valises: [
      {label: 'Wallet', value: 5},
      {label: 'Money Bag', value: 500},
      {label: 'Attache', value: 918.75},
      {label: 'Duffle', value: 6000},
      {label: '10\' UHAUL truck', value: 694656},
      {label: '15\' UHAUL truck', value: 1266624},
      {label: '17\' UHAUL truck', value: 1494720},
      {label: '20\' UHAUL truck', value: 1753920},
      {label: '24\' UHAUL truck', value: 2450304},
      {label: '27\' UHAUL truck', value: 2783808},


    ]
  });
