(function() {

  'use strict';

  angular
    .module('inventory.transaction')
    .controller('Transaction.InventoryAdjustmentListController', Controller);

  Controller.$inject = [
    '$state',
    'ItemInventoryAdjustmentModel',
    'ItemInventoryAdjustmentDetailModel',
    'Transaction.InventoryAdjustmentListService'
  ];

  function Controller(
    $state,
    Model,
    DetailModel,
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
    vm.currentTransaction = {};
    vm.currentTransactionDetails = [];
    vm.additionalOptions = [
      {
        label: 'Show Details',
        function: showDetails
      },
      {
        label: 'Edit',
        function: editInventoryAdjustment
      }
    ];

    vm.viewList = viewList;
    vm.loadRecords = loadRecords;
    vm.setOrder = setOrder;
    vm.searchRecord = searchRecord;
    vm.gotoPrintout = gotoPrintout;

    loadRecords();

    return vm;

    function viewList(page) {

      vm.page = page;
      loadRecords();
    }

    function loadRecords() {

      var params = {
        or: {
          trans_date: vm.searchText ? '%' + vm.searchText + '%' : '',
          ref_no: vm.searchText ? '%' + vm.searchText + '%' : '',
          remarks: vm.searchText ? '%' + vm.searchText + '%' : '',
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

            data.trans_date = new Date(data.trans_date).toLocaleDateString();
            data.transactor_name = data.transactor.name;

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

    function setOrder(orderObj) {

      vm.order_by = orderObj.with;
      vm.order_type = orderObj.isASC ? 'asc' : 'desc';

      loadRecords();
    }

    function searchRecord(searchText) {

      vm.searchText = searchText;
      loadRecords();
    }

    function showDetails(trans) {

      vm.currentTransaction = trans;

      vm.currentTransactionDetails.length = 0;
      DetailModel.query({
        trans_id: trans.id,
        per_page: 9999
      }).then(
        function(res){

          vm.currentTransactionDetails = res.data;

          $('#mdlPrintout').modal('show');
        }
      );
    }

    function gotoPrintout(transaction) {

      $('#mdlPrintout').modal('hide');
      $('.modal-open').removeClass('modal-open');
      $state.go('printout.inventory_adjustment', { transactionID: vm.currentTransaction.id });
    }

    function editInventoryAdjustment(transaction) {
      
      $state.go('transaction.inventory_adjustment', { transactionID: transaction.id });
    }

  }

})();
