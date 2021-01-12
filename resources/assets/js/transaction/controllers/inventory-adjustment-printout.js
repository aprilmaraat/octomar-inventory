(function() {

  'use strict';

  angular
    .module('inventory.transaction')
    .controller('Transaction.InventoryAdjustmentPrintoutController', Controller);

  Controller.$inject = [
  	'$stateParams',
    'ItemInventoryAdjustmentModel',
    'ItemInventoryAdjustmentDetailModel',
    'CMDM_DETAILS_LIMIT'
  ];

  function Controller(
  	$stateParams,
    Model,
    DetailModel,
    CMDM_DETAILS_LIMIT
  ) {

    var vm = this;

    vm.transactionID = $stateParams.transactionID;
    vm.transaction = {};
    vm.transactionDetails = [];
    vm.printDate = new Date();

    loadDetails();

    return vm;

    function loadDetails() {

		Model.get(vm.transactionID).then(
			function(transObj){

				vm.transaction = transObj;
				vm.printDate = new Date(transObj.trans_date).toLocaleDateString();

				vm.transactionDetails.length = 0;
				DetailModel.query({
					trans_id: vm.transactionID,
					per_page: 9999
				}).then(
					function(res){

						angular.forEach(res.data, function(detailObj){

              detailObj.adjustment = detailObj.qty > 0 ? 'Add' : 'Minus';
              detailObj.qty = Math.abs(detailObj.qty);

							vm.transactionDetails.push(detailObj);
						});

            for(var i = 0; i < CMDM_DETAILS_LIMIT - res.data.length; i++) {

              vm.transactionDetails.push(false);
            }
					}
				);
			}
		);

    }
  }

})();
