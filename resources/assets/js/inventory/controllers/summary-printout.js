(function() {

  'use strict';

  angular
    .module('inventory')
    .controller('SummaryPrintoutController', Controller);

  Controller.$inject = [
  	'ItemModel',
  ];

  function Controller(
  	Model
  ) {

    var vm = this;

    vm.items = [];
    vm.printoutDate = new Date().toLocaleDateString();

    loadItems();

    return vm;

    function loadItems() {

        Model.withTotalInventory({
        	page: 1,
        	per_page: 9999,
        	order_by: 'name',
        	order_type: 'asc'
        }).then(
            function(res){

                vm.items.length = 0;
                angular.forEach(res.data, function(data){

                    vm.items.push(data);
                });
            }
        );
    }

  }

})();
