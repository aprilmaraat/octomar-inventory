(function() {

  'use strict';

  angular
    .module('inventory.transaction')
    .controller('Transaction.SalesInvoicePrintoutController', Controller);

  Controller.$inject = [
  	'$stateParams',
    '$anchorScroll',
    'SalesInvoiceModel',
    'SalesInvoiceDetailModel',
    'DR_DETAILS_LIMIT'
  ];

  function Controller(
  	$stateParams,
    $anchorScroll,
    Model,
    DetailModel,
    DR_DETAILS_LIMIT
  ) {

    var vm = this;

    vm.transactionID = $stateParams.transactionID;
    vm.transaction = {};
    vm.transactionDetails = [];
    vm.printTotal = 0;
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

						vm.printTotal = 0;
						angular.forEach(res.data, function(detailObj){

							detailObj.discount = {
								type: detailObj.discount > 0 ? '+' : '-',
								amount: Math.abs(detailObj.discount)
							};

							vm.transactionDetails.push(detailObj);
							
							vm.printTotal += (detailObj.qty * detailObj.trans_price);
						});

            for(var i = 0; i < DR_DETAILS_LIMIT - res.data.length; i++) {

              vm.transactionDetails.push(false);
            }
					}
				);
			}
		);

    }
  }

})();
