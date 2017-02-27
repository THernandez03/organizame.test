(function(){
    'use strict';

    angular
      .module('app')
      .factory('LicensesService', LicensesService)
    ;

    LicensesService.$inject = ['$http'];
    function LicensesService($http) {
      var service = {};

      service.getAll = GetAll;
      service.getById = GetById;
      service.create = Create;
      service.update = Update;
      service.delete = Delete;

      return service;

      function GetAll() {
        return $http.get('/licenses').then(handleSuccess, handleError('Error getting all licenses'));
      }
      function GetById(id) {
        return $http.get('/licenses/'+id).then(handleSuccess, handleError('Error getting license by id'));
      }
      function Create(license) {
        return $http.post('/licenses', license).then(handleSuccess, handleError('Error creating license'));
      }
      function Update(id, license) {
        return $http.put('/licenses/'+id, license).then(handleSuccess, handleError('Error updating license'));
      }
      function Delete(id) {
        return $http.delete('/licenses/'+id).then(handleSuccess, handleError('Error deleting license'));
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
