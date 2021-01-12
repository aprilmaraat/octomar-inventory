(function() {

    'use strict';

    angular
        .module('inventory')
        .factory('SalesInvoiceDetailResource', Factory);

    Factory.$inject = [
        '$resource',
        'API_ENDPOINT'
    ];

    function Factory(
        $resource,
        API_ENDPOINT
    ) {

        var endPoint = 'sales_invoice_detail';
        var url = API_ENDPOINT.url + endPoint;

        return $resource(url + '/:id', {
            id: '@id',
        }, {
            update: {
                method: 'PUT'
            },
            storeBatch: {
                url: url + '/store_batch',
                method: 'POST',
                isArray: true
            },
            deleteByTransaction: {
                url: url + '/transaction',
                method: 'DELETE'
            }
        });

    }

})();
