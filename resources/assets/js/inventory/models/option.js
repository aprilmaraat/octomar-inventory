(function() {

    'use strict';

    angular
        .module('inventory')
        .service('OptionModel', Service);

    Service.$inject = [
        'OptionResource'
    ];

    function Service(
        Resource
    ) {
        
        this.getOptions = getOptions;
        this.saveOption = saveOption;
        this.setAutoIncrement = setAutoIncrement;

        return this;

        function getOptions() {
            return Resource
                .get()
                .$promise;
        }

        function saveOption(key, value) {
            return Resource
                .save({ 
                    key: key,
                    value: value
                })
                .$promise;
        }

        function setAutoIncrement(increment) {
            return Resource
                .setAutoIncrement({ increment: increment })
                .$promise;
        }

    }

})();
