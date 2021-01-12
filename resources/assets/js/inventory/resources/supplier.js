(function() {

    'use strict';

    angular
        .module('inventory')
        .factory('SupplierResource', Factory);

    Factory.$inject = [
        '$resource',
        'API_ENDPOINT'
    ];

    function Factory(
        $resource,
        API_ENDPOINT
    ) {

        var endPoint = 'supplier';
        var url = API_ENDPOINT.url + endPoint;

        return $resource(url + '/:id', {
            id: '@id',
        }, {
            update: {
                method: 'PUT'
            }
        });

    }

})();
