(function(){

    'use strict';

    angular
        .module('inventory.transaction')
        .service('Transaction.SalesInvoiceListService', Service);

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
                name: 'customer_name',
                label: 'Customer',
                type: 'text'
            },
            {
                name: 'trans_date',
                label: 'Date',
                type: 'text'
            },
            {
                name: 'ref_no',
                label: 'PO#',
                type: 'text'
            },
            {
                name: 'remarks',
                label: 'Terms',
                type: 'textarea'
            },
        ];

        return vm;
    }

})();
