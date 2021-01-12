(function() {

    'use strict';

    angular
        .module('inventory')
        .factory('ItemResource', Factory);

    Factory.$inject = [
        '$resource',
        'API_ENDPOINT'
    ];

    function Factory(
        $resource,
        API_ENDPOINT
    ) {

        var endPoint = 'item';
        var url = API_ENDPOINT.url + endPoint;

        return $resource(url + '/:id', {
            id: '@id',
        }, {
            update: {
                method: 'PUT'
            },
            withTotalInventory: {
                method: 'GET',
                url: url + '/with_total_inventory'
            }
        });

    }

})();
