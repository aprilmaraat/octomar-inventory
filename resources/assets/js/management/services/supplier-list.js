(function(){

    'use strict';

    angular
        .module('inventory.management')
        .service('Management.SupplierListService', Service);

    Service.$inject = [];

    function Service() {

        var vm = this;

        vm.inputModel = [
            {
                name: 'name',
                label: 'Name',
                type: 'text',
                required: true
            },
            {
                name: 'address',
                label: 'Address',
                type: 'textarea'
            },
            {
                name: 'tel_no',
                label: 'Tel#',
                type: 'text'
            },
        ];

        return vm;
    }

})();
