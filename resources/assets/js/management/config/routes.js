(function(){

    'use strict';

    angular
        .module('inventory.management')
        .config(Configuration);

    Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Configuration($stateProvider, $urlRouterProvider){

        $stateProvider

        .state('management', {
            url: '/management',
            abstract: true,
            templateUrl: 'templates/layouts/management.html'
        })

        .state('management.summary', {
            url: '/summary',
            templateUrl: 'templates/management/summary.html'
        })

        .state('management.customer_list', {
            url: '/customer-list',
            templateUrl: 'templates/management/customer-list.html',
            controller: 'Management.CustomerListController',
            controllerAs: 'list'
        })

        .state('management.supplier_list', {
            url: '/supplier-list',
            templateUrl: 'templates/management/supplier-list.html',
            controller: 'Management.SupplierListController',
            controllerAs: 'list'
        })

        .state('management.item_list', {
            url: '/item-list',
            templateUrl: 'templates/management/item-list.html',
            controller: 'Management.ItemListController',
            controllerAs: 'list'
        })

        ;
    }

})();
