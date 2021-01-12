(function(){

    'use strict';

    angular
        .module('inventory')
        .controller('StartController', Controller);

    Controller.$inject = [
        '$state',
        '$filter',
        'CustomerModel',
        'SupplierModel',
        'ItemModel',
        'ItemInventoryModel',
        'ItemInventoryAdjustmentModel',
        'ItemInventoryAdjustmentDetailModel',
        'Dialog',
        'ITEM_INVENTORY_TYPE',
        'TRANSACTOR_TYPE'
    ];

    function Controller(
        $state,
        $filter,
        CustomerModel,
        SupplierModel,
        Model,
        InventoryModel,
        AdjustmentModel,
        AdjustmentDetailModel,
        Dialog,
        ITEM_INVENTORY_TYPE,
        TRANSACTOR_TYPE
    ){

        var vm = this;

        vm.page = 1;
        vm.limit = 20;
        vm.first = 1;
        vm.last = 0;
        vm.next = 0;
        vm.prev = 0;
        vm.records = [];
        vm.order_by = 'name';
        vm.order_type = 'asc';
        vm.searchText = '';
        vm.ITEM_INVENTORY_TYPE = ITEM_INVENTORY_TYPE;
        vm.transactors = [];

        vm.calculateAdjustedTotal = calculateAdjustedTotal;
        vm.viewList = viewList;
        vm.loadRecords = loadRecords;
        vm.setOrder = setOrder;
        vm.searchRecord = searchRecord;
        vm.showHistory = showHistory;
        vm.hideHistory = hideHistory;
        vm.loadHistory = loadHistory;
        vm.editAdjustment = editAdjustment;
        vm.cancelCurrentAdjustment = cancelCurrentAdjustment;
        vm.deleteAdjustment = deleteAdjustment;
        vm.saveAdjustment = saveAdjustment;
        vm.printSummary = printSummary;
        vm.updateSalesInvoice = updateSalesInvoice;

        loadRecords();
        loadTransactors();

        return vm;

        function viewList(page) {

            vm.page = page;
            loadRecords();
        }

        function calculateAdjustedTotal(item) {

            var lastTotal = item.itemInventories[0] ? item.itemInventories[0].lastTotal : 0;
            var adjustment = item.adjustment.in ? parseInt(item.adjustment.in) : item.adjustment.out ? (parseInt(item.adjustment.out) * -1) : 0;

            return lastTotal + adjustment;
        }

        function loadRecords() {

            var params = {
                or: {
                    name: vm.searchText ? '%' + vm.searchText + '%' : '',
                    description: vm.searchText ? '%' + vm.searchText + '%' : '',
                    base_price: vm.searchText ? '%' + vm.searchText + '%' : ''
                },
                page: vm.page,
                per_page: vm.limit,
                order_by: vm.order_by,
                order_type: vm.order_type
            };

            Model.withTotalInventory(params).then(
                function(res){

                    vm.records.length = 0;
                    angular.forEach(res.data, function(data){

                        data.viewHistory = false;
                        data.loadingHistory = false;
                        data.page = 1;
                        data.itemInventories = [];
                        vm.records.push(data);
                    });

                    vm.page = res.current_page;
                    vm.first = vm.page != 1 ? 1 : 0;
                    vm.last = vm.page != res.last_page ? res.last_page : 0;
                    vm.next = res.current_page + 1;
                    vm.next = vm.next < vm.last ? vm.next : 0;
                    vm.prev = res.current_page - 1;
                    vm.prev = vm.prev > vm.first ? vm.prev : 0;
                }
            );
        }

        function loadTransactors() {

          CustomerModel.query({}).then(
            function(res) {

              vm.transactors.length = 0;
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

              vm.transactors.length = 0;
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

        function setOrder(orderBy) {

            if(vm.order.with == orderBy){

                vm.orderObj.isASC = !vm.orderObj.isASC;
            } else {

                vm.orderObj.isASC = true;
            }

            vm.order_by = vm.orderObj.with;
            vm.order_type = vm.orderObj.isASC ? 'asc' : 'desc';

            loadRecords();
        }

        function setOrder(orderObj) {

            vm.order_by = orderObj.with;
            vm.order_type = orderObj.isASC ? 'asc' : 'desc';

            loadRecords();
        }

        function searchRecord() {

            loadRecords();
        }

        function showHistory(item) {
            
            item.viewHistory = true;
            loadHistory(item);
        }

        function hideHistory(item) {
            
            item.viewHistory = false;
            item.itemInventories.length = 0;
        }

        function loadHistory(item) {

            var params = {
                item_id: item.id,
                page: item.page,
                per_page: 10,
                order_by: 'id',
                order_type: 'DESC'
            };

            item.loadingHistory = true;
            InventoryModel.query(params).then(
                function(res){

                    item.loadingHistory = false;
                    var lastTotal = item.itemInventories.length > 0 ? item.itemInventories[item.itemInventories.length - 1].lastTotal : parseInt(item.total_inventory);
                    angular.forEach(res.data, function(data){

                        data.lastTotal = lastTotal;
                        lastTotal = lastTotal - data.qty;
                        data.trans.trans_date = new Date(data.trans.trans_date).toLocaleDateString();
                        item.itemInventories.push(data);
                    });

                    if(res.data.length < 10)
                        item.page = -1;
                    else
                        item.page++;
                },
                function() {
                    
                    item.loadingHistory = false;
                }
            );
        }

        function editAdjustment(itemInventory, item) {
          
          item.adjustment.selectedTransactor = itemInventory.trans.transactor;
          item.adjustment.selectedTransactor.transactorType = itemInventory.trans.transactor_type;
          item.adjustment.in = itemInventory.qty > 0 ? itemInventory.qty : '';
          item.adjustment.out = itemInventory.qty < 0 ? Math.abs(itemInventory.qty) : '';
          item.adjustment.remarks = itemInventory.trans.remarks;
          item.adjustment.currentItemInventory = itemInventory;
        }

        function cancelCurrentAdjustment(item) {
          
          item.adjustment.selectedTransactor = null;
          item.adjustment.searchTransactor = '';
          item.adjustment.in = '';
          item.adjustment.out = '';
          item.adjustment.remarks = '';
          item.adjustment.currentItemInventory = null;
        }

        function deleteAdjustment(itemInventory, item) {
          
          Dialog.confirm('Are you sure you want to delete this record?', function() {

            InventoryModel.remove(itemInventory.id).then(
              function(){

                AdjustmentDetailModel.remove(itemInventory.trans_detail_id).then(
                  function(){

                    Dialog.alert('Record successfully deleted!', {
                      title: 'Success',
                      onOK: function() {

                        var qtyDiff = itemInventory.qty;

                        item.itemInventories.splice(item.itemInventories.indexOf(itemInventory, 1));

                        var lastTotal = item.total_inventory = parseInt(item.total_inventory) - qtyDiff;
                        angular.forEach(item.itemInventories, function(data){

                          data.lastTotal = lastTotal;
                          lastTotal = lastTotal - data.qty;
                        });
                      }
                    });
                  },
                  function(err) {

                    Dialog.alert('An error occured while removing adjustment record! Please try again later...', {
                      title: 'Error'
                    });
                  }
                );
              },
              function(err) {

                Dialog.alert('An error occured while removing item inventory! Please try again later...', {
                  title: 'Error'
                });
              }
            );
          });
        }

        function saveAdjustment(item) {

          var adjustment = item.adjustment.in ? parseInt(item.adjustment.in) : item.adjustment.out ? (parseInt(item.adjustment.out) * -1) : 0;
          if(adjustment == 0) {

            Dialog.alert('Please enter a Quantity(IN/OUT)', {
              title: 'Error'
            });

            return;
          }

          if(item.adjustment.selectedTransactor) {

            saveTransaction(item, item.adjustment.selectedTransactor);
          } else if(item.adjustment.searchTransactor){

            saveTransactor(item);
          } else {

            Dialog.alert('Please enter a Customer/Supplier', {
              title: 'Error'
            });

            return;
          }
        }

        function saveTransactor(item) {

          var transactor = {
            name: item.adjustment.searchTransactor,
            address: '',
            tel_no: ''
          };

          var transactorType = item.adjustment.in > 0 ? TRANSACTOR_TYPE.SUPPLIER : TRANSACTOR_TYPE.CUSTOMER;

          var TransactorModel = transactorType == TRANSACTOR_TYPE.CUSTOMER ? CustomerModel : SupplierModel;

          TransactorModel.save(transactor).then(
            function(transactorObj){

              transactorObj.transactorType = transactorType;

              vm.transactors.push(transactorObj);

              saveTransaction(item, transactorObj);
            },
            function(err) {

              Dialog.alert('An error occured while saving customer! Please try again later...', {
                title: 'Error'
              });
            }
          );
        }

        function saveTransaction(item, transactor) {

          if(!item.adjustment.currentItemInventory) {

            createTransaction(item, transactor);
          } else {

            updateTransaction(item, transactor);
          }
        }

        function createTransaction(item, transactor) {

          var trans = {
            transactor_type: transactor.transactorType,
            transactor_id: transactor.id,
            trans_date: new Date(),
            remarks: item.adjustment.remarks || ''
          };

          AdjustmentModel.save(trans).then(
            function(transObj) {

              var adjustment = item.adjustment.in ? parseInt(item.adjustment.in) : item.adjustment.out ? (parseInt(item.adjustment.out) * -1) : 0;

              var transDetail = {
                trans_id: transObj.id,
                item_id: item.id,
                qty: adjustment
              };

              AdjustmentDetailModel.save(transDetail).then(
                function(transDetailObj) {

                    var itemInventory = {
                      item_id: item.id,
                      qty: adjustment,
                      trans_type: ITEM_INVENTORY_TYPE.ADJUSTMENT,
                      trans_id: transObj.id,
                      trans_detail_id: transDetailObj.id
                    };

                  InventoryModel.save(itemInventory).then(
                    function(itemInventoryObj) {

                      Dialog.alert('Adjustment Successfully Saved!', {
                        title: 'Success'
                      });

                      var newRecord = angular.copy(itemInventoryObj);
                      newRecord.trans = angular.copy(transObj);
                      newRecord.trans.transactor = transactor;
                      newRecord.lastTotal = calculateAdjustedTotal(item);

                      item.itemInventories.unshift(newRecord);

                      cancelCurrentAdjustment(item);
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

        function updateTransaction(item, transactor) {

          var trans = {
            id: item.adjustment.currentItemInventory.trans_id,
            transactor_type: transactor.transactorType,
            transactor_id: transactor.id,
            trans_date: new Date(),
            remarks: item.adjustment.remarks || ''
          };

          AdjustmentModel.update(trans).then(
            function(transObj) {

              var adjustment = item.adjustment.in ? parseInt(item.adjustment.in) : item.adjustment.out ? (parseInt(item.adjustment.out) * -1) : 0;

              var transDetail = {
                id: item.adjustment.currentItemInventory.trans_detail_id,
                trans_id: item.adjustment.currentItemInventory.trans_id,
                item_id: item.id,
                qty: adjustment
              };

              AdjustmentDetailModel.update(transDetail).then(
                function(transDetailObj) {

                  var itemInventory = {
                    id: item.adjustment.currentItemInventory.id,
                    item_id: item.id,
                    qty: adjustment,
                    trans_type: ITEM_INVENTORY_TYPE.ADJUSTMENT,
                    trans_id: item.adjustment.currentItemInventory.trans_id,
                    trans_detail_id: item.adjustment.currentItemInventory.trans_detail_id
                  };

                  InventoryModel.update(itemInventory).then(
                    function(itemInventoryObj) {

                      Dialog.alert('Adjustment Successfully Updated!', {
                        title: 'Success'
                      });

                      var qtyDiff = item.adjustment.currentItemInventory.qty - adjustment;

                      item.adjustment.currentItemInventory.trans.transactor = transactor;
                      item.adjustment.currentItemInventory.qty = adjustment;
                      item.adjustment.currentItemInventory.trans.remarks = item.adjustment.remarks;
                      item.adjustment.currentItemInventory.lastTotal;

                      var lastTotal = item.total_inventory = parseInt(item.total_inventory) - qtyDiff;
                      angular.forEach(item.itemInventories, function(itemInventory){

                        itemInventory.lastTotal = lastTotal;
                        lastTotal = lastTotal - itemInventory.qty;
                      });

                      cancelCurrentAdjustment(item);
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

        function printSummary() {

          $state.go('printout.summary');
        }

        function updateSalesInvoice(itemInventory) {

          console.log(itemInventory);
          $state.go('transaction.sales_invoice', { transactionID: itemInventory.trans_id });
        }
    }

})();
