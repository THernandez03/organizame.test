(function(){
    'use strict';

    angular
      .module('app')
      .factory('LoginService', LoginService)
    ;

    LoginService.$inject = ['$http'];
    function LoginService($http) {
      var service = {};

      service.login = Login;

      return service;

      function Login(credentials) {
        return $http.post('/login', credentials).then(handleSuccess, handleError('Error when trying to login'));
      }

      // private functions
      function handleSuccess(res){
        return res.data;
      }

      function handleError(error){
        return function(){
          return { success: false, message: error };
        };
      }
    }
})();
