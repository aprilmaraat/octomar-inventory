(function(){

    'use strict';

    angular
        .module('inventory')
        .directive('listingBuilder', Directive);

    Directive.$inject = [];

    function Directive(){

        var directive = {
            templateUrl: 'templates/directives/listing-builder.html',
            restrict: 'E',
            controller: 'ListingBuilderController as builder',
            scope: {
                inputModel: '=',
                list: '=',
                initCallback: '=',
                saveCallback: '=',
                editCallback: '=',
                updateCallback: '=',
                deleteCallback: '=',
                setOrderCallback: '=',
                searchCallback: '=',
                listingOnly: '=',
                additionalOptions: '='
            },
            compile: function(element, attrs){

                if (!attrs.listingOnly) {
                    attrs.listingOnly = false;
                }
            }
        };

        return directive;
    }
})();
