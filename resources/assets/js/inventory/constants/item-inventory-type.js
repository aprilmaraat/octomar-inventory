(function() {

  'use strict';

  angular
    .module('inventory')
    .value('ITEM_INVENTORY_TYPE', {
    	INVOICE: 'App\\Models\\SalesInvoice',
    	ADJUSTMENT: 'App\\Models\\ItemInventoryAdjustment'
    });

})();
