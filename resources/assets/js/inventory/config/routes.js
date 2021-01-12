(function(){

    'use strict';

    angular
        .module('inventory')
        .config(Configuration);

    Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Configuration($stateProvider, $urlRouterProvider){

        $stateProvider

        .state('start', {
            url: '/start',
            templateUrl: 'templates/inventory/start.html',
            controller: 'StartController',
            controllerAs: 'start'
        })

        .state('printout', {
            url: '/printout',
            abstract: true,
            templateUrl: 'templates/layouts/printout.html'
        })

        .state('printout.summary', {
            url: '/summary',
            templateUrl: 'templates/inventory/summary-printout.html',
            controller: 'SummaryPrintoutController',
            controllerAs: 'printout'
        })

        .state('options', {
            url: '/options',
            templateUrl: 'templates/inventory/options.html',
            controller: 'OptionController',
            controllerAs: 'options'
        })

        ;

        $urlRouterProvider.otherwise('start');
    }

})();
