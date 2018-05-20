/**
 * $whisperapp routeProvider configuration which depends on mod being declared.
 */
angular.module('whisperapp')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            'use strict';
            $urlRouterProvider.otherwise('/dashboard');
        }]);

/**
 * Create Controller for app.
 */
angular.module('whisperapp')
    .controller('WhisperAppCtrl', [
        function(Restangular) {
            'use strict';

        }
    ]);


angular.module('whisperapp')
    .controller('WhisperNavBarViewCtrl', ['$rootScope', '$scope', '$location', '$state', '$stateParams',
        function($rootScope, $scope, $location, $state, $stateParamse) {
            'use strict';
            var self = this;
        }
    ]);