(function() {

  'use strict';

  angular
    .module('inventory')
    .controller('OptionController', Controller);

  Controller.$inject = [
  		'Dialog',
        'OptionModel',
        'OPTION'
  ];

  function Controller(
  		Dialog,
        OptionModel,
        OPTION
  ) {

    var vm = this;

    vm.new_autoincrement = '';
    vm.new_prepared_by = OPTION.DEFAULT_PREPARED_BY;
    vm.new_noted_by = OPTION.DEFAULT_NOTED_BY;

    vm.saveAutoIncrement = saveAutoIncrement;
    vm.saveDefaultValues = saveDefaultValues;

    return vm;

    function saveAutoIncrement() {

    	if(!vm.new_autoincrement) {

	        Dialog.alert('Please enter a number!', {
	          title: 'Error'
	        });

    		return;
    	}

		Dialog.confirm('The number must be greater than the last current DR# on the system. Are you sure you want to continue?', function(){

			OptionModel.setAutoIncrement(vm.new_autoincrement).then(
		        function() {

			        Dialog.alert('Start Number Successfully Updated', {
			          title: 'Success'
			        });
		        },
	            function(err) {

	              Dialog.alert('An error occured while saving option! Please try again later...', {
	                title: 'Error'
	              });
	            }
	        );
		});
    }

    function saveDefaultValues() {

    	if(!vm.new_prepared_by) {

	        Dialog.alert('Please enter a name for prepared by input!', {
	          title: 'Error'
	        });

    		return;
    	}

    	if(!vm.new_noted_by) {

	        Dialog.alert('Please enter a name for noted by input!', {
	          title: 'Error'
	        });

    		return;
    	}

		OptionModel.saveOption('prepared_by', vm.new_prepared_by).then(
	        function() {

				OptionModel.saveOption('noted_by', vm.new_noted_by).then(
			        function() {

				        Dialog.alert('Default Values Successfully Updated', {
				          title: 'Success'
				        });

				    	OPTION.DEFAULT_PREPARED_BY = vm.new_prepared_by;
				    	OPTION.DEFAULT_NOTED_BY = vm.new_noted_by;
			        },
		            function(err) {

		              Dialog.alert('An error occured while saving option! Please try again later...', {
		                title: 'Error'
		              });
		            }
		        );
	        },
            function(err) {

              Dialog.alert('An error occured while saving option! Please try again later...', {
                title: 'Error'
              });
            }
        );
    }

  }

})();
