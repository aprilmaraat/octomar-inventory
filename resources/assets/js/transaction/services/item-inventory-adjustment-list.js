(function(){

    'use strict';

    angular
        .module('inventory.transaction')
        .service('Transaction.InventoryAdjustmentListService', Service);

    Service.$inject = [];

    function Service() {

        var vm = this;

        vm.inputModel = [
            {
                name: 'id',
                label: 'ID',
                type: 'text'
            },
            {
                name: 'transactor_name',
                label: 'Customer/Supplier',
                type: 'text'
            },
            {
                name: 'trans_date',
                label: 'Date',
                type: 'text'
            },
            {
                name: 'ref_no',
                label: 'DR#',
                type: 'text'
            },
            {
                name: 'remarks',
                label: 'Remarks',
                type: 'textarea'
            },
        ];

        return vm;
    }

})();
