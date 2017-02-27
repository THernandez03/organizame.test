(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController)
  ;

  HomeController.$inject = ['$scope', 'LicensesService'];
  function HomeController($scope, LicensesService) {
    var vm = this;

    vm.selectedId = '';
    vm.licencias = [];
    vm.licencia = {};

    vm.fetchItems = function(){
      LicensesService.getAll().then(function(data){
        if(data){
          vm.licencias = data;
        }
      });
    }

    vm.selectItem = function(id){
      vm.selectedId = id;
      LicensesService.getById(id)
        .then(function(data){
          if(data){
            Object.keys(data).forEach(function(dataKey){
              vm.licencia[dataKey] = data[dataKey];
            });
          }
        })
      ;
    }
    vm.unselectItem = function(){
      vm.selectedId = '';
      vm.licencia = {};
    }

    vm.addItem = function(){
      LicensesService.create({
        nombre: vm.licencia.nombre,
        descripcion: vm.licencia.descripcion,
        tipo: vm.licencia.tipo,
        precio: vm.licencia.precio,
        numeroUsuarios: vm.licencia.numeroUsuarios,
        numeroRegistros: vm.licencia.numeroRegistros,
        duracion: vm.licencia.duracion,
        publicado: vm.licencia.publicado,
        imagen: vm.licencia.imagen,
        precioMes: vm.licencia.precioMes,
        numeroRegistroMes: vm.licencia.numeroRegistroMes,
        llamadaAccion: vm.licencia.llamadaAccion,
        descripcionAdicional: vm.licencia.descripcionAdicional
      }).then(function(data){
        if(data){
          vm.fetchItems();
          vm.unselectItem();
        }
      });
    }
    vm.updateItem = function(id){
      LicensesService.update(id, {
        nombre: vm.licencia.nombre,
        descripcion: vm.licencia.descripcion,
        tipo: vm.licencia.tipo,
        precio: vm.licencia.precio,
        numeroUsuarios: vm.licencia.numeroUsuarios,
        numeroRegistros: vm.licencia.numeroRegistros,
        duracion: vm.licencia.duracion,
        publicado: vm.licencia.publicado,
        imagen: vm.licencia.imagen,
        precioMes: vm.licencia.precioMes,
        numeroRegistroMes: vm.licencia.numeroRegistroMes,
        llamadaAccion: vm.licencia.llamadaAccion,
        descripcionAdicional: vm.licencia.descripcionAdicional
      }).then(function(data){
        if(data){
          vm.fetchItems();
          vm.unselectItem();
        }
      });
    }
    vm.deleteItem = function(id){
      LicensesService.delete(id).then(function(data){
        if(data){
          vm.licencias = vm.licencias.filter(function(licencia){
            return !(licencia.id === id);
          });
          if(vm.selectedId === id){
            vm.unselectItem();
          }
        }
      });
    }

    vm.fetchItems();
  }
})();
