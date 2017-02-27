(function(){
  'use strict';

  angular
    .module('app', ['ngRoute'])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$routeProvider'];
  function config($routeProvider){
    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'views/home.html',
        controllerAs: 'vm'
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'views/login.html',
        controllerAs: 'vm'
      })
      .otherwise({ redirectTo: '/login' });
  }

  run.$inject = ['$rootScope', '$location'];
  function run($rootScope, $location){
    $rootScope.$on('$locationChangeStart', function(event, next){
      // Check if the user is in a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
      // TODO: Make it work with session, tokens and some secure methods
      // Check if the user has entered successfully on /crud
      var loggedIn = localStorage.getItem('logged');
      if(restrictedPage && !loggedIn){
        $location.path('/login');
      }
    });
  }
})();
