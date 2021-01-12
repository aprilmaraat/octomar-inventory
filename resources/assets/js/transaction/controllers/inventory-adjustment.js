(function() {

  'use strict';

  angular
    .module('inventory.transaction')
    .controller('Transaction.InventoryAdjustmentController', Controller);

  Controller.$inject = [
    '$state',
    '$stateParams',
    'CustomerModel',
    'SupplierModel',
    'ItemModel',
    'ItemInventoryModel',
    'ItemInventoryAdjustmentModel',
    'ItemInventoryAdjustmentDetailModel',
  	'Dialog',
    'ITEM_INVENTORY_TYPE',
    'TRANSACTOR_TYPE',
    'CMDM_DETAILS_LIMIT',
    'OPTION'
  ];

  function Controller(
    $state,
    $stateParams,
    CustomerModel,
    SupplierModel,
    ItemModel,
    ItemInventoryModel,
    AdjustmentModel,
  	AdjustmentDetailModel,
  	Dialog,
    ITEM_INVENTORY_TYPE,
    TRANSACTOR_TYPE,
    CMDM_DETAILS_LIMIT,
    OPTION
  ) {

    var vm = this;

    vm.searchText = '';
    vm.searchTransactor = '';
    vm.selectedTransactor = null;
    vm.transactor = {};
    vm.transaction = {
      prepared_by: OPTION.DEFAULT_PREPARED_BY,
      noted_by: OPTION.DEFAULT_NOTED_BY,
      trans_date: new Date()
    };
    vm.transactionDetails = [];
    vm.currentDetail = { adjustment: 'Add' };
    vm.currentDetailIdx = -1;
    vm.items = [];
    vm.transactors = [];
    vm.adjustments = [
      'Add',
      'Minus'
    ];
    vm.transactionID = 0;
    vm.printDate = '';
    vm.printTotal = 0;

    vm.selectedTransactorChange = selectedTransactorChange;
    vm.save = save;
    vm.addDetail = addDetail;
    vm.updateDetail = updateDetail;
    vm.editDetail = editDetail;
    vm.deleteDetail = deleteDetail;
    vm.clear = clear;
    vm.gotoPrintout = gotoPrintout;

    loadTransactors();
    loadItems();

    if($stateParams.transactionID)
      loadSalesInvoice($stateParams.transactionID);

    return vm;

    function loadSalesInvoice(transId){

      AdjustmentModel.get(transId).then(
        function(transObj) {

          vm.transactionID = transObj.id;
          vm.transaction = transObj;
          vm.transaction.trans_date = new Date(transObj.trans_date);
          vm.selectedTransactor = vm.transactor = transObj.transactor;
          vm.selectedTransactor.transactorType = vm.transaction.transactor_type;

          AdjustmentDetailModel.query({ trans_id: transId }).then(
            function(detailsList) {

              detailsList.data.forEach(function(detail){

                vm.transactionDetails.push(detail);
              });
            }
          );
        }
      );
    }

    function loadItems() {

      ItemModel.withTotalInventory({
        page: 1,
        per_page: 9999
      }).then(
        function(res) {

          vm.items.length = 0;
          angular.forEach(res.data, function(data){

              vm.items.push(data);
          });
        },
        function(err) {

          Dialog.alert('An error occured while retrieving items! Please try again later...', {
              title: 'Error'
          });
        }
      );
    }

    function loadTransactors() {

      vm.transactors.length = 0;
      CustomerModel.query({}).then(
        function(res) {

          angular.forEach(res.data, function(data){

            data.transactorType = TRANSACTOR_TYPE.CUSTOMER;

            vm.transactors.push(data);
          });
        },
        function(err) {

          Dialog.alert('An error occured while retrieving customers! Please try again later...', {
              title: 'Error'
          });
        }
      );

      SupplierModel.query({}).then(
        function(res) {

          angular.forEach(res.data, function(data){

            data.transactorType = TRANSACTOR_TYPE.SUPPLIER;

            vm.transactors.push(data);
          });
        },
        function(err) {

          Dialog.alert('An error occured while retrieving customers! Please try again later...', {
              title: 'Error'
          });
        }
      );
    }

    function selectedTransactorChange(transactor){

      if(transactor) {
        vm.transactor.tel_no = transactor.tel_no;
        vm.transactor.address = transactor.address;
      } else {
        vm.transactor.tel_no = '';
        vm.transactor.address = '';
      }
    }

    function save(adjustmentForm) {

      if(adjustmentForm.$invalid){

        Dialog.alert('Please complete required information!', {
          title: 'Error'
        });

        return;
      }

      if(vm.transactionDetails.length == 0) {

        Dialog.alert('Please add atleast 1 detail!', {
          title: 'Error'
        });

        return;
      }

      if(vm.selectedTransactor) {

        if(!vm.transactionID) {
          saveAdjustment(vm.selectedTransactor.id, vm.selectedTransactor.transactorType);
        } else {
          updateAdjustment(vm.selectedTransactor.id, vm.selectedTransactor.transactorType);
        }
      } else {

        saveTransactor();
      }
    }

    function saveTransactor() {

      var transactor = vm.transactor;
      transactor.name = vm.searchTransactor;

      var transactorType = vm.transactionDetails[0].adjustment == vm.adjustments[1] ? TRANSACTOR_TYPE.CUSTOMER : TRANSACTOR_TYPE.SUPPLIER;

      var TransactorModel = transactorType == TRANSACTOR_TYPE.CUSTOMER ? CustomerModel : SupplierModel;

      TransactorModel.save(transactor).then(
        function(transactorObj){

          saveAdjustment(transactorObj.id, transactorType);
        },
        function(err) {

          Dialog.alert('An error occured while saving customer! Please try again later...', {
            title: 'Error'
          });
        }
      );
    }

    function saveAdjustment(transactorId, transactorType) {

      vm.transaction.transactor_id = transactorId;
      vm.transaction.transactor_type = transactorType;
      vm.transaction.remarks = vm.transaction.remarks || '';
      vm.transaction.ref_no = vm.transaction.ref_no || '';

      AdjustmentModel.save(vm.transaction).then(
        function(transObj) {

          vm.transactionID = transObj.id;
          var processedDetails = [];
          vm.transactionDetails.forEach(function(detail){

            processedDetails.push({
              trans_id: transObj.id,
              item_id: detail.item.id,
              qty: detail.qty
            });
          });

          AdjustmentDetailModel.storeBatch({ details: processedDetails }).then(
            function(detailsList) {

              var itemInventoryList = [];
              detailsList.forEach(function(detailsObj){

                itemInventoryList.push({
                  item_id: detailsObj.item_id,
                  qty: detailsObj.qty,
                  trans_type: ITEM_INVENTORY_TYPE.ADJUSTMENT,
                  trans_id: transObj.id,
                  trans_detail_id: detailsObj.id
                });
              });

              ItemInventoryModel.storeBatch({ items: itemInventoryList }).then(
                function(inventoryDetailList) {

                  vm.printDate = vm.transaction.trans_date.toLocaleDateString();
                  
                  $('#mdlPrintout').modal('show');
                }, 
                function(err) {

                  Dialog.alert('An error occured while saving inventory details! Please try again later...', {
                    title: 'Error'
                  });
                }
              );
            }, 
            function(err) {

              Dialog.alert('An error occured while saving transaction details! Please try again later...', {
                title: 'Error'
              });
            }
          );
        },
        function(err) {

          Dialog.alert('An error occured while saving transaction! Please try again later...', {
            title: 'Error'
          });
        }
      );
    }

    function updateAdjustment(transactorId, transactorType) {

      vm.transaction.transactor_id = transactorId;
      vm.transaction.transactor_type = transactorType;
      vm.transaction.remarks = vm.transaction.remarks || '';
      vm.transaction.ref_no = vm.transaction.ref_no || '';

      AdjustmentDetailModel.deleteByTransaction(vm.transactionID).then(
        function(){

          ItemInventoryModel.deleteByTransaction(ITEM_INVENTORY_TYPE.ADJUSTMENT, vm.transactionID).then(
            function(){

              AdjustmentModel.update(vm.transaction).then(
                function(transObj) {

                  vm.transactionID = vm.transactionID;
                  var processedDetails = [];
                  vm.transactionDetails.forEach(function(detail){

                    processedDetails.push({
                      trans_id: vm.transactionID,
                      item_id: detail.item.id,
                      qty: detail.qty
                    });
                  });

                  AdjustmentDetailModel.storeBatch({ details: processedDetails }).then(
                    function(detailsList) {

                      var itemInventoryList = [];
                      detailsList.forEach(function(detailsObj){

                        itemInventoryList.push({
                          item_id: detailsObj.item_id,
                          qty: detailsObj.qty,
                          trans_type: ITEM_INVENTORY_TYPE.ADJUSTMENT,
                          trans_id: vm.transactionID,
                          trans_detail_id: detailsObj.id
                        });
                      });

                      ItemInventoryModel.storeBatch({ items: itemInventoryList }).then(
                        function(inventoryDetailList) {

                          vm.printDate = vm.transaction.trans_date.toLocaleDateString();
                          
                          $('#mdlPrintout').modal('show');
                        }, 
                        function(err) {

                          Dialog.alert('An error occured while saving inventory details! Please try again later...', {
                            title: 'Error'
                          });
                        }
                      );
                    }, 
                    function(err) {

                      Dialog.alert('An error occured while saving transaction details! Please try again later...', {
                        title: 'Error'
                      });
                    }
                  );
                },
                function(err) {

                  Dialog.alert('An error occured while saving transaction! Please try again later...', {
                    title: 'Error'
                  });
                }
              );
            },
            function(err) {

              Dialog.alert('An error occured while saving transaction! Please try again later...', {
                title: 'Error'
              });
            }
          );
        },
        function(err) {

          Dialog.alert('An error occured while saving transaction! Please try again later...', {
            title: 'Error'
          });
        }
      );
    }

    function addDetail() {

      if(!vm.currentDetail.item){

        Dialog.alert('Enter an Item', {
          title: 'Error'
        });

        return;
      }

      if(!vm.currentDetail.qty){

        Dialog.alert('Enter a quantity', {
          title: 'Error'
        });

        return;
      }

      if(vm.transactionDetails.length >= CMDM_DETAILS_LIMIT){

        Dialog.alert('CMDM printout limit is ' + CMDM_DETAILS_LIMIT, {
          title: 'Error'
        });

        return;
      }
    	
      vm.transactionDetails.push(angular.copy(vm.currentDetail));
      vm.currentDetail = { adjustment: 'Add' };
    }

    function updateDetail() {
    	
      vm.transactionDetails[vm.currentDetailIdx] = angular.copy(vm.currentDetail);
      vm.currentDetailIdx = -1;
      vm.currentDetail = { adjustment: 'Add' };
    }

    function editDetail(detail) {
    	
      vm.currentDetailIdx = vm.transactionDetails.indexOf(detail);
      vm.currentDetail = angular.copy(detail);
    }

    function deleteDetail(detail) {
    	
      vm.transactionDetails.splice(vm.transactionDetails.indexOf(detail), 1);
    }
    
    function clear(adjustmentForm) {

      vm.searchText = '';
      vm.searchTransactor = '';
      vm.selectedTransactor = null;
      vm.transaction = {
        prepared_by: OPTION.DEFAULT_PREPARED_BY,
        noted_by: OPTION.DEFAULT_NOTED_BY,
        trans_date: new Date()
      };
      vm.transactionDetails = [];
      vm.currentDetail = { adjustment: 'Add' };
      vm.currentDetailIdx = -1;
      vm.transactionID = 0;
      vm.printDate = '';
      vm.printTotal = 0;

      adjustmentForm.$setPristine();
    }

    function gotoPrintout() {

      $('#mdlPrintout').modal('hide');
      $('.modal-open').removeClass('modal-open');
      $state.go('printout.inventory_adjustment', { transactionID: vm.transactionID });
    }

  }

})();
