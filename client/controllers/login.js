(function(){
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)
  ;

  LoginController.$inject = ['$location', 'LoginService'];
  function LoginController($location, LoginService){
    var vm = this;

    vm.dataLoading = false;

    vm.login = function(){
      vm.dataLoading = true;
      LoginService.login({ user: vm.user, pass: vm.pass }).then(function(data){
        vm.dataLoading = false;
        if(data && data.id){
          localStorage.setItem('logged', true);
          $location.path('/');
        }
      }).catch(function(){
        vm.dataLoading = false;
      });
    }
  }
})();
