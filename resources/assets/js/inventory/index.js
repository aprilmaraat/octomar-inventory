(function(){

    'use strict';

    angular
        .module('inventory', [
            'ngMaterial',
            'ngResource',
            'angular-loading-bar',
            'ngAnimate',
            'ui.router',
            'ui.date',
            'inventory.management',
            'inventory.transaction'
        ]);

})();
