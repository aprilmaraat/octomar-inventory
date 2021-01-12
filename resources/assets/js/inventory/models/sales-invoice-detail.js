(function() {

    'use strict';

    angular
        .module('inventory')
        .service('SalesInvoiceDetailModel', Service);

    Service.$inject = [
        'SalesInvoiceDetailResource'
    ];

    function Service(
        Resource
    ) {

        this.query = query;
        this.get = get;
        this.save = save;
        this.update = update;
        this.remove = remove;
        this.storeBatch = storeBatch;
        this.deleteByTransaction = deleteByTransaction;

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

        function storeBatch(obj) {
            return Resource
                .storeBatch(obj)
                .$promise;
        }

        function deleteByTransaction(transId) {
            return Resource
                .deleteByTransaction({ trans_id: transId })
                .$promise;
        }

    }

})();
