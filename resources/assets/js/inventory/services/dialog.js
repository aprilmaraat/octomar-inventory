(function() {

    'use strict';

    angular
        .module('inventory')
        .service('Dialog', Service);

    Service.$inject = [
        '$mdDialog'
    ];

    function Service(
        $mdDialog
    ) {

        var alertDialog;
        var confirmDialog;
        var promptDialog;

        this.alert = alert;
        this.confirm = confirm;
        this.prompt = prompt;

        function alert(text, options) {

            var expectedOptions = {
                title: 'Alert',
                okText: 'Close',
                onOK: function() {

                }
            };

            expectedOptions = angular.extend({}, expectedOptions, options);

            alertDialog = $mdDialog.alert({
                title: expectedOptions.title,
                textContent: text,
                ok: expectedOptions.okText
            });

            $mdDialog
                .show(alertDialog)
                .then(function() {

                    expectedOptions.onOK();
                })
                .finally(function() {

                    alertDialog = undefined;
                });
        }

        function confirm(text, onOk, options) {

            var expectedOptions = {
                title: 'Confirm',
                okText: 'Ok',
                cancelText: 'Cancel',
                onCancel: function() {

                }
            };

            expectedOptions = angular.extend({}, expectedOptions, options);

            confirmDialog = $mdDialog.confirm({
                title: expectedOptions.title,
                textContent: text,
                ok: expectedOptions.okText,
                cancel: expectedOptions.cancelText
            });

            $mdDialog
                .show(confirmDialog)
                .then(
                    function() {

                        onOk();
                    },
                    function() {

                        expectedOptions.onCancel();
                    }
                )
                .finally(function() {

                    confirmDialog = undefined;
                });
        }

        function prompt(text, onOk, options) {

            var expectedOptions = {
                title: 'Prompt',
                okText: 'Ok',
                default: '',
                placeholder: '',
                cancelText: 'Cancel',
                onCancel: function() {

                }
            };

            expectedOptions = angular.extend({}, expectedOptions, options);

            promptDialog = $mdDialog.prompt({
                title: expectedOptions.title,
                textContent: text,
                placeholder: expectedOptions.placeholder,
                initialValue: expectedOptions.default,
                ok: expectedOptions.okText,
                cancel: expectedOptions.cancelText
            });

            $mdDialog
                .show(promptDialog)
                .then(
                    function(result) {

                        onOk(result);
                    },
                    function() {

                        expectedOptions.onCancel();
                    }
                )
                .finally(function() {

                    promptDialog = undefined;
                });
        }

    }

})();
