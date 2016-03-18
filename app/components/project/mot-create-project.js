import motCreateProject from './mot-create-project.html';

export default function(angularModule) {
    /**
     * Controller: displays feed for main page
     */
    angularModule.directive('createProject', function() {
            return {
                replace: true,
                restrict: 'E',
                template: motCreateProject,
                controller: ['$scope', 'ProjectService', '$window', 'viewService', 'ProgressService', '$location', function($scope, ProjectService, $window, viewService, ProgressService, $location) {

                    $scope.progresses = [];
                    $scope.addNewChoice = function() {
                        $scope.progresses.push({});
                    };
                    $scope.removeChoice = function(idx) {
                        $scope.progresses.splice(idx, 1);
                    };

                    $scope.addNewChoice();

                    $scope.view = viewService;
                    $scope.project = new ProjectService();

                    $scope.difference = function(datetime) {
                        datetime = Date.parse(datetime);
                        var now = new Date();
                        var diff = Math.floor(1 + (datetime - now) / 86400000);

                        $scope.project.completion = datetime;

                        return diff;
                    }

                    $scope.post = function() {

                        $scope.project.author = $window.localStorage.getItem('userId');

                        var progresses = $scope.progresses;
                        var completion = $scope.project.completion;

                        Promise.all(
                            progresses
                            .map(progress => progress.name)
                            .filter(name => name && name.trim())
                            .map(content => new ProgressService({
                                 content,
                                 done: false
                              }).$save()
                            )

                ).then(result => {
                    $scope.project.progress = result.map(progress => {
                        return progress._id;
                    });
                    $scope.project.$save(res => {
                        $scope.savedProject = res;
                        $scope.projects.push(res);
                        $scope.project = new ProjectService();
                        $location.path('/profile');
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            } //end $scope.post

            $scope.today = function() {
                $scope.dt = new Date();
            };

            $scope.today();

            $scope.clear = function() {
                $scope.dt = null;
            };

            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.toggleMin = function() {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };

            $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.popup1 = {
                opened: false
            };

            $scope.popup2 = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [{
                date: tomorrow,
                status: 'full'
            }, {
                date: afterTomorrow,
                status: 'partially'
            }];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }

                return '';
            }
        }] //end controller
    };
});
}
