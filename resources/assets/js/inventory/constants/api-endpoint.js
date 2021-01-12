(function(){

    'use strict';


    angular
        .module('inventory')
        .value('API_ENDPOINT', {
            baseUrl: BASE_URL,
            url: BASE_URL + 'api/'
        });

})();
