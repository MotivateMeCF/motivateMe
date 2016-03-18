import motProject from './mot-project.html';
export default function(angularModule) {

    /**
     * Controller:
     */
    angularModule.directive('project', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motProject,
            controller: ['$scope', '$stateParams', 'ProjectService', 'viewService', '$window', function($scope, $stateParams, ProjectService, viewService, $window) {
                $scope.view = viewService;
                var userId = $window.localStorage.getItem('userId');
                ProjectService.query({
                    query: {author: userId}
                }).$promise.then((data) => {
                    $scope.projects = data;
                    $scope.projects.map(project => {
                        project.time = project.time.substring(0,10);
                        project.completion = project.completion.substring(0,10);
                    });
                });

                // $scope.can = false;

                // $scope.edit = function(x) {
                //     $scope.can = x;
                // };

                $scope.remaining = function(time, completion){
                    var remains = Math.floor((1+ Date.parse(completion) - Date.now()  )/86400000);
                    return remains;
                }

                $scope.percentTimeUsed = function(time, completion){
                    // percent is  remaining / total
                    var time = Date.parse(time);  //start time
                    var completion = Date.parse(completion);  //completion time
                    //total project days
                    var total =  1 + Math.floor(( completion - time )/86400000);
                    //remaining days from now
                    var remaining = Math.floor((completion - Date.now()  )/86400000);
                    var percentTime = 100 - Math.trunc ( ( (remaining / total) * 100 ) );
                    return percentTime;
                }

                //TODO: delete this
                // $scope.difference = function(datetime){
                //    datetime = Date.parse(datetime);
                //    var now = new Date();
                //    var diff =  Math.floor( 1 + ( datetime - now ) / 86400000);
                //
                //    $scope.project.completion =  datetime;
                //
                //    return diff;
                //}

            }]
        };
    });
}
