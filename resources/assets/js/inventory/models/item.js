(function() {

    'use strict';

    angular
        .module('inventory')
        .service('ItemModel', Service);

    Service.$inject = [
        'ItemResource'
    ];

    function Service(
        Resource
    ) {

        this.withTotalInventory = withTotalInventory;
        this.query = query;
        this.get = get;
        this.save = save;
        this.update = update;
        this.remove = remove;

        return this;

        function withTotalInventory(obj) {
            return Resource
                .withTotalInventory(obj)
                .$promise;
        }

        function query(obj) {
            return Resource
                .get(obj)
                .$promise;
        }

        function get(id) {
            return Resource
                .get({ id: id })
                .$promise;
        }

        function save(obj) {
            return Resource
                .save(obj)
                .$promise;
        }

        function update(obj) {
            if (!obj.id) {
                return null;
            } else {

                return Resource
                    .update(obj)
                    .$promise;
            }
        }

        function remove(id) {
            return Resource
                .delete({ id: id })
                .$promise;
        }

    }

})();
