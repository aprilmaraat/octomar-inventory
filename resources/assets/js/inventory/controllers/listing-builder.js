(function(){

    'use strict';

    angular
        .module('inventory')
        .controller('ListingBuilderController', Controller);

    Controller.$inject = ['$scope'];

    function Controller($scope) {

        var vm = this;

        vm.model = {};
        vm.forEdit = {};
        vm.currentID = 0;
        vm.searchText = '';

        vm.order = {
            with: '',
            isASC: true
        };

        vm.initModel = initModel;
        vm.addTextMultiple = addTextMultiple;
        vm.removeTextMultiple = removeTextMultiple;
        vm.initTextMultiple = initTextMultiple;
        vm.newModel = newModel;
        vm.saveModel = saveModel;
        vm.editModel = editModel;
        vm.updateModel = updateModel;
        vm.updateQuickModel = updateQuickModel;
        vm.deleteModel = deleteModel;
        vm.setOrder = setOrder;
        vm.search = search;
        vm.showAdditionalOptions = showAdditionalOptions;

        vm.initModel(vm.model, $scope.inputModel);

        if($scope.initCallback)
            $scope.initCallback(vm.model);

        vm.setOrder($scope.inputModel[0].name);

        return vm;

        function initModel(model, inputModel) {

            angular.forEach(inputModel, function(obj){

                if(obj.type == 'text-multiple') {

                    vm.initTextMultiple(model, obj.name, obj.limit);
                } else if(obj.type == 'complex') {

                    model[obj.name] = {};

                    vm.initModel(model[obj.name], obj.complex);
                } else if(obj.type == 'select') {

                    model[obj.name] = obj.selectOptions[0].value;
                } else if(obj.type == 'checkbox') {

                    model[obj.name] = false;
                } else {

                    model[obj.name] = '';
                }
            });
        }

        function addTextMultiple(model, inputName) {

            if(model[inputName] == null) {

                model[inputName] = [];
            }

            model[inputName].push({ text: '' });
        }

        function removeTextMultiple(model, inputName, idx) {

            console.log(idx);

            model[inputName].splice(idx, 1);
        }

        function initTextMultiple(model, inputName, limit) {

            model[inputName] = [];

            if(limit === 0) {

                model[inputName].push({ text: '' });

                return;
            }
            for(var i = 0; i < limit; i++)
                model[inputName].push({ text: '' });
        }

        function newModel() {

            vm.currentID = 0;
            vm.model = {};

            vm.initModel(vm.model, $scope.inputModel);

            $('#mdlForm').modal('show');
        }

        function saveModel(listingBuilderForm) {

            if(listingBuilderForm.$invalid)
                return;

            listingBuilderForm.$setPristine();

            if(vm.currentID > 0) {

                updateModel();
                return;
            }

            var result = angular.copy(vm.model);

            vm.initModel(vm.model, $scope.inputModel);

            if($scope.saveCallback)
                $scope.saveCallback(result, vm.model);

            $('#mdlForm').modal('hide');
        }

        function editModel(model) {

            vm.currentID = model.id;

            vm.initModel(vm.model, $scope.inputModel);

            if($scope.editCallback)
                $scope.editCallback(model, vm.model);

            $('#mdlForm').modal('show');
        }

        function updateModel() {

            var result = angular.copy(vm.model);

            result.id = vm.currentID;

            vm.currentID = 0;

            vm.initModel(vm.model, $scope.inputModel);

            if($scope.updateCallback)
                $scope.updateCallback(result, vm.model);

            $('#mdlForm').modal('hide');
        }

        function updateQuickModel(model) {

            if($scope.updateCallback)
                $scope.updateCallback(model, vm.model);
        }

        function deleteModel(model) {
            $scope.deleteCallback(model, vm.model);
        }

        function setOrder(inputName) {

            if(vm.order.with == inputName) {

                vm.order.isASC = !vm.order.isASC;
            } else {

                vm.order.with = inputName;
                vm.order.isASC = true;
            }

            if($scope.setOrderCallback)
                $scope.setOrderCallback(vm.order);
        }

        function search(){

            if($scope.searchCallback)
                $scope.searchCallback(vm.searchText);
        }

        function showAdditionalOptions(item, showObj) {

            var keys = Object.keys(showObj);

            for(var i = 0; i < keys.length; i++) {

                if(showObj[keys[i]] != item[keys[i]]) {

                    return false;
                }
            }

            return true;
        }
    }

})();
