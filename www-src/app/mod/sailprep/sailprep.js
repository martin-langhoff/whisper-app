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
            self.wind_strengths = null;
            self.crew_weight = null;
            self.water_type = null;
            self.water_temp = null;

            self.ready = false;

            self.wind_strength_list = [ 6, 9, 12, 15, 18, 21, 25 ];
            self.crew_weight_list = [ 75, 100, 125, 150, 175, 200, 225, 250 ];

            self.water_type_list = [ 'salt', 'fresh' ]; 
            self.water_temp_list = [ 5, 10, 15, 20, 25, 30 ]; 

            /* arrays = up, reach, dw */
            self.rec_downhaul = ['', '', ''];
            self.rec_outhaul = ['', '', ''];
            self.rec_rotator = ['', '', ''];
            self.rec_foil_rake = ['', '', ''];

            self.change = function() {
                if ( self.wind_strength
                     && self.crew_weight
                     && self.water_type
                     && self.water_temp) {
                    self.ready = true;
                    self.calculate();
                } else {
                    self.ready = false;
                    return
                }
            };

            self.calculate = function() {
                const rake_max = 4.5;
                const rake_min = 2;

                if (self.wind_strength < 10) {
                    self.rec_downhaul = [0, 0, 0];
                    self.rec_rotator = [45, 45, 60]; // deg
                } else if (self.wind_strength < 16) {
                    self.rec_downhaul = [5, 3, 0];
                    self.rec_rotator = [35, 45, 60];
                } else if (self.wind_strength < 22) {
                    self.rec_downhaul = [8, 5, 5];
                    self.rec_rotator = [15, 25, 25];
                } else {
                    self.rec_downhaul = [10, 10, 10];
                    self.rec_rotator = [15, 15, 15];
                };
                if (self.wind_strength > 5 && self.crew_weight < 100) {
                    self.rec_downhaul = self.rec_downhaul.map(self.bump_downhaul_light_crew);
                }
                // foil rake starts assuming ~15kt, fresh water, 20C-25C
                if (self.crew_weight < 100) {
                    self.rec_foil_rake = 2.5;
                } else if (self.crew_weight < 175) {
                    self.rec_foil_rake = 3;
                } else if (self.crew_weight < 200) {
                    self.rec_foil_rake = 3.5;
                } else {
                    self.rec_foil_rake = 4;
                }
                // Adjust for wind (therefore - speed)
                if (self.wind_strength < 15) {
                    self.rec_foil_rake = self.add_bound(self.rec_foil_rake, 0.5, rake_max);
                } else if (self.wind_strength > 20) {
                    self.rec_foil_rake = self.substract_bound(self.rec_foil_rake, 0.5, rake_min);
                }
                // Adjust for water type
                if (self.water_type === 'salt') {
                    self.rec_foil_rake = self.substract_bound(self.rec_foil_rake, 0.5, rake_min);
                }
                // Adjust for water temp
                if (self.water_temp < 10) {
                    self.rec_foil_rake = self.add_bound(self.rec_foil_rake, 1, rake_max);
                } else if (self.water_temp < 20) {
                    self.rec_foil_rake = self.add_bound(self.rec_foil_rake, 0.5, rake_max);
                } else if (self.water_temp > 25) {
                    self.rec_foil_rake = self.substract_bound(self.rec_foil_rake, 0.5, rake_min);
                }

            };

            self.bump_downhaul_light_crew = function(v) {
                const max = 10;
                const add = 2;
                return Math.min(max, v+add)
            }
            self.add_bound = function(v, add, max) {
                return Math.min(max, v+add)
            };
            self.substract_bound = function(v, sub, min) {
                return Math.max(min, v-sub)
            }
        }]);
