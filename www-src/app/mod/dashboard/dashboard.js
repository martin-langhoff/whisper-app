angular.module('mod.dashboard', ["whisperapp"])
    .config(['$stateProvider',
        function($stateProvider) {
            'use strict';
            $stateProvider.
                state('dashboard', {
                    url: '/dashboard',
                    views: {
                        'navbar': {
                            templateUrl: 'app/app-navbar.tpl.html'
                        },
                        'main': {
                            templateUrl: 'app/mod/dashboard/dashboard.tpl.html',
                            controller: 'DashboardViewCtrl as ctrl'
                        }
                    },
                });
            }]);

angular.module('mod.dashboard')
	.controller('DashboardViewCtrl', ['$scope',
        function($scope) {
            'use strict';
            console.log('DashboardViewCtrl loading');
            var self = this;
        }]);

angular.module('mod.dashboard')
    .controller('DashboardModalCtrl', ['$uibModalInstance', 'params', '$location',
        function($uibModalInstance, params, $location) {
            'use strict';
            var self = this;
            self.ok = function () {
                $uibModalInstance.dismiss('ok');
            };

        }]);
