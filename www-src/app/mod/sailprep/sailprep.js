angular.module('mod.sailprep', ["whisperapp"])
    .config(['$stateProvider',
        function($stateProvider) {
            'use strict';

            $stateProvider
                .state('sailprep', {
                    url: '/sailprep/sailprep',
                    views: {
                        'navbar': {
                            templateUrl: 'app/app-navbar.tpl.html'
                        },
                        'main': {
                            templateUrl: 'app/mod/sailprep/sailprep.tpl.html',
                            controller: 'SailprepViewCtrl as ctrl'
                        }
                    }
                })
            }]);

angular.module('mod.sailprep')
	.controller('SailprepViewCtrl', ['$state',
        function($state) {
            'use strict';
            var self = this;
            
        }]);
