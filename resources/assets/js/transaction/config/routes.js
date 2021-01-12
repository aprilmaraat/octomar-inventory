(function(){

    'use strict';

    angular
        .module('inventory.transaction')
        .config(Configuration);

    Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Configuration($stateProvider, $urlRouterProvider){

        $stateProvider

        .state('transaction', {
            url: '/transaction',
            abstract: true,
            templateUrl: 'templates/layouts/transaction.html'
        })

        .state('transaction.summary', {
            url: '/summary',
            templateUrl: 'templates/transaction/summary.html'
        })

        .state('transaction.inventory_adjustment', {
            url: '/inventory-adjustment/:transactionID',
            templateUrl: 'templates/transaction/inventory-adjustment.html',
            controller: 'Transaction.InventoryAdjustmentController',
            controllerAs: 'adjust'
        })

        .state('printout.inventory_adjustment', {
            url: '/inventory-adjustment/:transactionID',
            templateUrl: 'templates/transaction/inventory-adjustment-printout.html',
            controller: 'Transaction.InventoryAdjustmentPrintoutController',
            controllerAs: 'printout'
        })

        .state('transaction.inventory_adjustment_list', {
            url: '/inventory-adjustment-list',
            templateUrl: 'templates/transaction/inventory-adjustment-list.html',
            controller: 'Transaction.InventoryAdjustmentListController',
            controllerAs: 'list'
        })

        .state('transaction.sales_invoice', {
            url: '/sales-invoice/:transactionID',
            templateUrl: 'templates/transaction/sales-invoice.html',
            controller: 'Transaction.SalesInvoiceController',
            controllerAs: 'invoice'
        })

        .state('printout.sales_invoice', {
            url: '/sales-invoice/:transactionID',
            templateUrl: 'templates/transaction/sales-invoice-printout.html',
            controller: 'Transaction.SalesInvoicePrintoutController',
            controllerAs: 'printout'
        })

        .state('transaction.sales_invoice_list', {
            url: '/sales-invoice-list',
            templateUrl: 'templates/transaction/sales-invoice-list.html',
            controller: 'Transaction.SalesInvoiceListController',
            controllerAs: 'list'
        })

        ;
    }

})();
