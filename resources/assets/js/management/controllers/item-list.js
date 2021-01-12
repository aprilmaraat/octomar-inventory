(function(){

    'use strict';

    angular
        .module('inventory.management')
        .controller('Management.ItemListController', Controller);

    Controller.$inject = [
        '$filter',
        'ItemModel',
        'ItemInventoryModel',
        'ItemInventoryAdjustmentModel',
        'ItemInventoryAdjustmentDetailModel',
        'Dialog',
        'ITEM_INVENTORY_TYPE',
        'TRANSACTOR_TYPE',
        'DEFAULT_SUPPLIER'
    ];

    function Controller(
        $filter,
        Model,
        ItemInventoryModel,
        AdjustmentModel,
        AdjustmentDetailModel,
        Dialog,
        ITEM_INVENTORY_TYPE,
        TRANSACTOR_TYPE,
        DEFAULT_SUPPLIER
    ) {

        var vm = this;

        vm.page = 1;
        vm.limit = 10;
        vm.first = 1;
        vm.last = 0;
        vm.next = 0;
        vm.prev = 0;
        vm.records = [];
        vm.order_by = 'id';
        vm.order_type = 'asc';
        vm.searchText = '';
        vm.currentItem = {};
        vm.newItemInventory = 0;

        vm.viewList = viewList;
        vm.loadRecords = loadRecords;
        vm.newRecord = newRecord;
        vm.saveModel = saveModel;
        vm.copyDetails = copyDetails;
        vm.addRecord = addRecord;
        vm.editRecord = editRecord;
        vm.updateRecord = updateRecord;
        vm.deleteRecord = deleteRecord;
        vm.setOrder = setOrder;
        vm.searchRecord = searchRecord;

        vm.loadRecords();

        return vm;

        function viewList(page) {

            vm.page = page;
            loadRecords();
        }

        function loadRecords() {

            var params = {
                or: {
                    name: vm.searchText ? '%' + vm.searchText + '%' : '',
                    description: vm.searchText ? '%' + vm.searchText + '%' : '',
                    base_price: vm.searchText ? '%' + vm.searchText + '%' : '',
                    unit: vm.searchText ? '%' + vm.searchText + '%' : ''
                },
                page: vm.page,
                per_page: vm.limit,
                order_by: vm.order_by,
                order_type: vm.order_type
            };

            Model.query(params).then(
                function(res){

                    vm.records.length = 0;
                    angular.forEach(res.data, function(data){

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

        function newRecord(){
            
            vm.currentItem = {};
            $('#mdlForm').modal('show');
        }

        function saveModel(itemForm) {

            if(itemForm.$invalid)
                return;

            itemForm.$setPristine();

            if(vm.currentItem.id > 0) {

                updateRecord();
            } else {

                addRecord();
            }
        }

        function copyDetails(item) {

            vm.currentItem = {};
            vm.currentItem = angular.copy(item);
            vm.currentItem.id = 0;
            $('#mdlForm').modal('show');
        }

        function addRecord() {

            var item = {
                name: vm.currentItem.name,
                description: vm.currentItem.description,
                base_price: vm.currentItem.base_price,
                unit: vm.currentItem.unit
            };

            Model.save(item).then(
              function(res){

                item.id = res.id;

                vm.records.push(item);

                if(vm.newItemInventory > 0) {

                    addAdjustment(res.id);
                } else {

                    $('#mdlForm').modal('hide');
                    Dialog.alert('Record successfully saved!', {
                        title: 'Success'
                    });
                }
              },
              function() {

                $('#mdlForm').modal('hide');
                Dialog.alert('An error occured while saving record! Please try again later...', {
                    title: 'Error'
                });
              }
            );
        }

        function editRecord(record) {

            vm.currentItem = {};
            vm.currentItem = angular.copy(record);
            $('#mdlForm').modal('show');
        }

        function updateRecord() {

            Model.update(vm.currentItem).then(
              function(res){

                var recordInList = $filter('filter')(vm.records, { id: vm.currentItem.id });

                if(recordInList.length > 0) {

                  if(vm.currentItem !== recordInList[0])
                    angular.copy(vm.currentItem, recordInList[0]);
                }

                $('#mdlForm').modal('hide');
                Dialog.alert('Record successfully updated!', {
                    title: 'Success'
                });
              },
              function() {

                $('#mdlForm').modal('hide');
                Dialog.alert('An error occured while saving record! Please try again later...', {
                    title: 'Error'
                });
              }
            );
        }

        function deleteRecord(record) {

            Model.remove(record.id).then(
              function(res){

                vm.records.splice(vm.records.indexOf(record), 1);

                Dialog.alert('Record successfully removed!', {
                    title: 'Success'
                });
              },
              function() {

                  Dialog.alert('An error occured while saving record! Please try again later...', {
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

        function addAdjustment(itemId) {

            //vm.newItemInventory = 0;
            var adjustment = {
                transactor_type: TRANSACTOR_TYPE.SUPPLIER,
                transactor_id: DEFAULT_SUPPLIER,
                trans_date: new Date(),
                ref_no: '',
                remarks: 'Initial Inventory of item#' + itemId
            };

            AdjustmentModel.save(adjustment).then(
                function(transObj) {

                    var adjustmentDetail = {
                      trans_id: transObj.id,
                      item_id: itemId,
                      qty: vm.newItemInventory
                    };

                  AdjustmentDetailModel.save(adjustmentDetail).then(
                    function(detailsObj) {

                        var itemInventory = {
                          item_id: itemId,
                          qty: vm.newItemInventory,
                          trans_type: ITEM_INVENTORY_TYPE.ADJUSTMENT,
                          trans_id: transObj.id,
                          trans_detail_id: detailsObj.id
                        };

                      ItemInventoryModel.save(itemInventory).then(
                        function(inventoryObj) {

                            vm.newItemInventory = 0;
                          
                            $('#mdlForm').modal('hide');
                            Dialog.alert('Record successfully saved!', {
                                title: 'Success'
                            });
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

    }

})();