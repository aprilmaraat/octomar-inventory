(function() {

    'use strict';

    angular
        .module('inventory')
        .directive('formBuilder', Directive);

    Directive.$inject = [

    ];

    function Directive(

    ) {

        var directive = {
            templateUrl: 'templates/directives/form-builder.html',
            restrict: 'E',
            scope: {
                inputModel: '=',
                model: '='
            }
        };

        return directive;

    }

})();
