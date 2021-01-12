(function(){

    'use strict';


    angular
        .module('inventory')
        .run(Run);

    Run.$inject = [
        'OptionModel',
        'OPTION'
    ];

    function Run(
        OptionModel,
        OPTION
    	){

        OptionModel.getOptions().then(function(res){

            OPTION.DEFAULT_PREPARED_BY = res.prepared_by;
            OPTION.DEFAULT_NOTED_BY = res.noted_by;
        });
    } 

})();