(function() {

    'use strict';

    angular
        .module('inventory')
        .factory('OptionResource', Factory);

    Factory.$inject = [
        '$resource',
        'API_ENDPOINT'
    ];

    function Factory(
        $resource,
        API_ENDPOINT
    ) {

        var endPoint = 'option';
        var url = API_ENDPOINT.url + endPoint;

        return $resource(url + '/:id', {
            id: '@id',
        }, {
            setAutoIncrement: {
                method: 'POST',
                url: url + '/auto_increment'
            }
        });

    }

})();
