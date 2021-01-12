(function() {

  'use strict';

  angular
    .module('inventory')
    .value('TRANSACTOR_TYPE', {
    	CUSTOMER: 'App\\Models\\Customer',
    	SUPPLIER: 'App\\Models\\Supplier'
    });

})();
