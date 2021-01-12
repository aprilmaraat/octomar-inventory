(function() {

    'use strict';

    angular
        .module('inventory')
        .service('CustomerModel', Service);

    Service.$inject = [
        'CustomerResource'
    ];

    function Service(
        Resource
    ) {

        this.query = query;
        this.get = get;
        this.save = save;
        this.update = update;
        this.remove = remove;

        return this;

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
