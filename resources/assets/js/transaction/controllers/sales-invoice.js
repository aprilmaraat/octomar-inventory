(function() {

  'use strict';

  angular
    .module('inventory.transaction')
    .controller('Transaction.SalesInvoiceController', Controller);

  Controller.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'CustomerModel',
    'ItemModel',
    'ItemInventoryModel',
    'SalesInvoiceModel',
    'SalesInvoiceDetailModel',
  	'Dialog',
    'ITEM_INVENTORY_TYPE',
    'TRANSACTOR_TYPE',
    'DR_DETAILS_LIMIT',
    'OPTION'
  ];

  function Controller(
    $scope,
    $state,
    $stateParams,
    CustomerModel,
    ItemModel,
    ItemInventoryModel,
    InvoiceModel,
  	InvoiceDetailModel,
  	Dialog,
    ITEM_INVENTORY_TYPE,
    TRANSACTOR_TYPE,
    DR_DETAILS_LIMIT,
    OPTION
  ) {

    var vm = this;

    vm.searchText = '';
    vm.searchCustomer = '';
    vm.selectedCustomer = null;
    vm.customer = {};
    vm.transaction = {
      transactor_type: TRANSACTOR_TYPE.CUSTOMER,
      trans_date: new Date(),
      prepared_by: OPTION.DEFAULT_PREPARED_BY
    };
    vm.transactionDetails = [];
    vm.currentDetail = {
      trans_price: 0,
      discount: {
        amount: 0,
        type: '-'
      }
    };
    vm.currentDetailIdx = -1;
    vm.items = [];
    vm.customers = [];
    vm.transactionID = 0;
    vm.printDate = '';
    vm.printTotal = 0;

    vm.save = save;
    vm.selectedCustomerChange = selectedCustomerChange;
    vm.selectedItemChange = selectedItemChange;
    vm.getTotal = getTotal;
    vm.getDiscountAmount = getDiscountAmount;
    vm.checkDetailQty = checkDetailQty;
    vm.checkDetailDiscount = checkDetailDiscount;
    vm.clearDetail = clearDetail;
    vm.addDetail = addDetail;
    vm.updateDetail = updateDetail;
    vm.editDetail = editDetail;
    vm.deleteDetail = deleteDetail;
    vm.clear = clear;
    vm.gotoPrintout = gotoPrintout;

    loadCustomers();
    loadItems();

    if($stateParams.transactionID)
      loadSalesInvoice($stateParams.transactionID);

    return vm;

    function loadSalesInvoice(transId){

      InvoiceModel.get(transId).then(
        function(transObj) {

          vm.transactionID = transObj.id;
          vm.transaction = transObj;
          vm.transaction.trans_date = new Date(transObj.trans_date);
          vm.selectedCustomer = vm.customer = transObj.transactor;

          InvoiceDetailModel.query({ trans_id: transId }).then(
            function(detailsList) {

              detailsList.data.forEach(function(detail){

                detail.discount = {
                  type: detail.discount > 0 ? '+' : '-',
                  amount: Math.abs(detail.discount)
                };

                vm.transactionDetails.push(detail);
              });

              ItemInventoryModel.query({ 
                trans_type: ITEM_INVENTORY_TYPE.INVOICE,
                trans_id: transId 
              }).then(
                function(itemInventoryList){

                }
              );
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

    function loadCustomers() {

      CustomerModel.query({}).then(
        function(res) {

          vm.customers.length = 0;
          angular.forEach(res.data, function(data){

            vm.customers.push(data);
          });
        },
        function(err) {

          Dialog.alert('An error occured while retrieving customers! Please try again later...', {
              title: 'Error'
          });
        }
      );
    }

    function save(invoiceForm) {

      if(invoiceForm.$invalid){

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

      if(vm.selectedCustomer) {

        if(!vm.transactionID) {
          saveSalesInvoice(vm.selectedCustomer.id);
        } else {
          updateSalesInvoice(vm.selectedCustomer.id);
        }
      } else {

        saveCustomer();
      }
    }

    function saveCustomer() {

      var customer = vm.customer;
      customer.name = vm.searchCustomer;

      CustomerModel.save(customer).then(
        function(customerObj){

          if(!vm.transactionID) {
            saveSalesInvoice(customerObj.id);
          } else {
            updateSalesInvoice(customerObj.id);
          }
        },
        function(err) {

          Dialog.alert('An error occured while saving customer! Please try again later...', {
            title: 'Error'
          });
        }
      );
    }

    function saveSalesInvoice(customerId) {

      vm.transaction.transactor_id = customerId;
      vm.transaction.remarks = vm.transaction.remarks || '';
      vm.transaction.ref_no = vm.transaction.ref_no || '';

      InvoiceModel.save(vm.transaction).then(
        function(transObj) {

          vm.transactionID = transObj.id;
          var processedDetails = [];
          vm.transactionDetails.forEach(function(detail){

            var discount = detail.discount.amount;

            if(detail.discount.type != '+') {

              discount *= -1;
            }

            processedDetails.push({
              trans_id: transObj.id,
              item_id: detail.item.id,
              qty: detail.qty,
              discount: discount,
              trans_price: detail.trans_price
            });
          });

          InvoiceDetailModel.storeBatch({ details: processedDetails }).then(
            function(detailsList) {

              var itemInventoryList = [];
              detailsList.forEach(function(detailsObj){

                itemInventoryList.push({
                  item_id: detailsObj.item_id,
                  qty: detailsObj.qty * -1,
                  trans_type: ITEM_INVENTORY_TYPE.INVOICE,
                  trans_id: transObj.id,
                  trans_detail_id: detailsObj.id
                });
              });

              ItemInventoryModel.storeBatch({ items: itemInventoryList }).then(
                function(inventoryDetailList) {

                  vm.printDate = vm.transaction.trans_date.toLocaleDateString();
                  vm.printTotal = vm.getTotal();

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

    function updateSalesInvoice(customerId) {

      vm.transaction.transactor_id = customerId;
      vm.transaction.remarks = vm.transaction.remarks || '';
      vm.transaction.ref_no = vm.transaction.ref_no || '';

      InvoiceDetailModel.deleteByTransaction(vm.transactionID).then(
        function(){

          ItemInventoryModel.deleteByTransaction(ITEM_INVENTORY_TYPE.INVOICE, vm.transactionID).then(
            function(){

              InvoiceModel.update(vm.transaction).then(
                function(transObj) {

                  var processedDetails = [];
                  vm.transactionDetails.forEach(function(detail){

                    var discount = detail.discount.amount;

                    if(detail.discount.type != '+') {

                      discount *= -1;
                    }

                    processedDetails.push({
                      trans_id: vm.transactionID,
                      item_id: detail.item.id,
                      qty: detail.qty,
                      discount: discount,
                      trans_price: detail.trans_price
                    });
                  });

                  InvoiceDetailModel.storeBatch({ details: processedDetails }).then(
                    function(detailsList) {

                      var itemInventoryList = [];
                      detailsList.forEach(function(detailsObj){

                        itemInventoryList.push({
                          item_id: detailsObj.item_id,
                          qty: detailsObj.qty * -1,
                          trans_type: ITEM_INVENTORY_TYPE.INVOICE,
                          trans_id: vm.transactionID,
                          trans_detail_id: detailsObj.id
                        });
                      });

                      ItemInventoryModel.storeBatch({ items: itemInventoryList }).then(
                        function(inventoryDetailList) {

                          vm.printDate = vm.transaction.trans_date.toLocaleDateString();
                          vm.printTotal = vm.getTotal();

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

    function selectedCustomerChange(customer){

      if(customer) {
        vm.customer.tel_no = customer.tel_no;
        vm.customer.address = customer.address;
      } else {
        vm.customer.tel_no = '';
        vm.customer.address = '';
      }
    }

    function selectedItemChange(item) {

      if(item) {

        vm.currentDetail.trans_price = parseFloat(item.base_price);
      }
    }

    function getTotal() {

      var result = 0;
      vm.transactionDetails.forEach(function(detail){

        result += (detail.qty * detail.trans_price);
      });

      return result;
    }

    function getDiscountAmount(detail) {

      if(detail.item == null)
        return;

      var basePrice = parseFloat(detail.item.base_price);
      var result = basePrice;
      var percentage = detail.discount.amount / 100;

      if(detail.discount.type == '+') {

        result = basePrice + (basePrice * percentage);
      } else {

        result = basePrice - (basePrice * percentage);
      }

      return result;
    }

    function checkDetailQty(){

      if(vm.currentDetail.qty > vm.currentDetail.item.total_inventory){

        vm.currentDetail.qty = parseInt(vm.currentDetail.item.total_inventory);
      } else if(vm.currentDetail.qty < 0) {

        vm.currentDetail.qty = 0;
      }
    }

    function checkDetailDiscount(){

      if(vm.currentDetail.discount.amount > 100){

        vm.currentDetail.discount.amount = 100;
      } else if(vm.currentDetail.discount.amount < 0) {

        vm.currentDetail.discount.amount = 0;
      }
    }

    function clearDetail() {

      vm.currentDetailIdx = -1;
      vm.currentDetail = {
        trans_price: 0,
        discount: {
          amount: 0,
          type: '-'
        }
      };
    }

    function addDetail() {

      var detail = angular.copy(vm.currentDetail);

      if(!detail.item){

        Dialog.alert('Enter an Item', {
          title: 'Error'
        });

        return;
      }

      if(!detail.qty){

        Dialog.alert('Enter a quantity', {
          title: 'Error'
        });

        return;
      }

      if(vm.transactionDetails.length >= DR_DETAILS_LIMIT){

        Dialog.alert('DR printout limit is ' + DR_DETAILS_LIMIT, {
          title: 'Error'
        });

        return;
      }

      detail.trans_price = detail.discount.amount > 0 ? getDiscountAmount(detail) : detail.trans_price;
    	
      vm.transactionDetails.push(detail);
      clearDetail();
    }

    function updateDetail() {
    	
      var detail = angular.copy(vm.currentDetail);

      detail.trans_price = detail.discount.amount > 0 ? getDiscountAmount(detail) : detail.trans_price;

      vm.transactionDetails[vm.currentDetailIdx] = detail;
      vm.currentDetailIdx = -1;
      clearDetail();
    }

    function editDetail(detail) {
    	
      vm.currentDetailIdx = vm.transactionDetails.indexOf(detail);
      vm.currentDetail = angular.copy(detail);
      if(vm.currentDetail.discount.amount == 0) {

      vm.currentDetailIdx = vm.transactionDetails.indexOf(detail);
        vm.currentDetail.trans_price = vm.currentDetail.trans_price;
      }
    }

    function deleteDetail(detail) {
    	
      vm.transactionDetails.splice(vm.transactionDetails.indexOf(detail), 1);
    }

    function clear(invoiceForm) {

      vm.searchText = '';
      vm.searchCustomer = '';
      vm.selectedCustomer = null;
      vm.customer = {};
      vm.transaction = {
        prepared_by: OPTION.DEFAULT_PREPARED_BY,
        transactor_type: TRANSACTOR_TYPE.CUSTOMER,
        trans_date: new Date()
      };
      vm.transactionDetails = [];
      vm.currentDetail = {
        trans_price: 0,
        discount: {
          amount: 0,
          type: '-'
        }
      };
      vm.currentDetailIdx = -1;
      vm.transactionID = 0;
      vm.printDate = '';
      vm.printTotal = 0;

      invoiceForm.$setPristine();
    }

    function gotoPrintout() {

      $('#mdlPrintout').modal('hide');
      $('.modal-open').removeClass('modal-open');
      $state.go('printout.sales_invoice', { transactionID: vm.transactionID });
    }

  }

})();
