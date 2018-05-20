angular.module('mod.howto', ["whisperapp"])
    .config(['$stateProvider',
        function($stateProvider) {
            'use strict';

            $stateProvider
                .state('howto', {
                    url: '/howto/howto',
                    views: {
                        'navbar': {
                            templateUrl: 'app/app-navbar.tpl.html'
                        },
                        'main': {
                            templateUrl: 'app/mod/howto/howto.tpl.html',
                            controller: 'HowtoViewCtrl as ctrl'
                        }
                    }
                })
            }]);

angular.module('mod.howto')
	.controller('HowtoViewCtrl', ['$state',
        function($state) {
            'use strict';
            var self = this;
            
        }]);
