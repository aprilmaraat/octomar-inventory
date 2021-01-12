(function(){

    'use strict';

    angular
        .module('inventory.management')
        .controller('Management.CustomerListController', Controller);

    Controller.$inject = [
        '$filter',
        'CustomerModel',
        'Dialog',
        'Management.CustomerListService'
    ];

    function Controller(
        $filter,
        Model,
        Dialog,
        InputService
    ) {

        var vm = this;

        vm.inputModel = InputService.inputModel;
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

        vm.viewList = viewList;
        vm.loadRecords = loadRecords;
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
                    address: vm.searchText ? '%' + vm.searchText + '%' : '',
                    tel_no: vm.searchText ? '%' + vm.searchText + '%' : ''
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

        function addRecord(record) {

            Model.save(record).then(
              function(res){

                record.id = res.id;

                vm.records.push(record);

                Dialog.alert('Record successfully saved!', {
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

        function editRecord(record, formObj) {

            angular.copy(record, formObj);
        }

        function updateRecord(record) {

            Model.update(record).then(
              function(res){

                var recordInList = $filter('filter')(vm.records, { id: record.id });

                if(recordInList.length > 0) {

                  if(record !== recordInList[0])
                    angular.copy(record, recordInList[0]);
                }

                Dialog.alert('Record successfully updated!', {
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

        function setOrder(orderObj) {

            vm.order_by = orderObj.with;
            vm.order_type = orderObj.isASC ? 'asc' : 'desc';

            loadRecords();
        }

        function searchRecord(searchText) {

            vm.searchText = searchText;
            loadRecords();
        }

    }

})();