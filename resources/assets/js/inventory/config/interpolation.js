(function() {

    'use strict';

    angular
        .module('inventory')
        .config(Configuration);

    Configuration.$inject = [
        '$interpolateProvider'
    ];

    function Configuration(
        $interpolateProvider
    ) {
        $interpolateProvider.startSymbol('{!');
        $interpolateProvider.endSymbol('!}');
    }

})();
