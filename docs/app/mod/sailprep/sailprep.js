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

            self.init = function() {
                self.wind_strength = 15;
                self.crew_weight = 150;
                self.is_salty = false;
                self.water_temp = 20;

                self.wind_strength_options = {floor: 5, ceil: 25, onChange: self.change };
                self.crew_weight_options = {floor: 75, ceil: 250, onChange: self.change };

                self.water_temp_options = {floor: 5, ceil: 30, onChange: self.change };

                /* arrays = up, reach, dw */
                self.rec_downhaul = ['', '', ''];
                self.rec_outhaul = ['', '', ''];
                self.rec_rotator = ['', '', ''];
                self.rec_foil_rake = ['', '', ''];
                self.jib_clew = '';

                self.change();
            };

            self.change = function() {
                self.calculate();
            };

            self.calculate = function() {
                const rake_max = 4.5;
                const rake_min = 2;

                self.jib_clew = 'top';

                if (self.wind_strength < 10) {
                    self.rec_downhaul = [0, 0, 0];
                    self.rec_rotator = [45, 45, 90]; // deg
                    self.rec_outhaul = [12, 13, 15]; // cm camber
                } else if (self.wind_strength < 16) {
                    self.rec_downhaul = [5, 3, 0];
                    self.rec_rotator = [40, 45, 90];
                    self.rec_outhaul = [10, 10, 15];
                } else if (self.wind_strength < 22) {
                    self.rec_downhaul = [8, 5, 5];
                    self.rec_rotator = [30, 30, 80];
                    self.rec_outhaul = [7, 7, 10];
                    self.jib_clew    = 'middle';
                } else {
                    self.rec_downhaul = [10, 10, 10];
                    self.rec_rotator = [30, 30, 80];
                    self.rec_outhaul = [3, 3, 5];
                    self.jib_clew = 'bottom';
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
                if (self.is_salt) {
                    self.rec_foil_rake = self.substract_bound(self.rec_foil_rake, 0.5, rake_min);
                }
                // Adjust for water temp
                if (self.water_temp < 10) {
                    self.rec_foil_rake = self.add_bound(self.rec_foil_rake, 0.5, rake_max);
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

            self.init();
        }]);
