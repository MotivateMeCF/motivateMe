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
            controller: ['$scope', '$stateParams', 'FeedService', 'viewService', function($scope, $stateParams, FeedService, viewService) {

                $scope.view = viewService;
                var userId = localStorage.getItem('userId');

                FeedService.query({
                    _id: userId
                }).$promise.then((data) => {
                    $scope.projects = data;

                    console.log ( $scope.projects );

                })

                $scope.can = false;


                $scope.edit = function(x) {
                  $scope.can = x;

                    $scope.time = project.time.substring(0,10);
                    //$scope.time = project.time;
                };


                $scope.remaining = function(time, completion){
                    console.log(Date.parse(time), Date.parse(completion) );
                    var remains = Math.floor((1+ Date.parse(completion) - Date.parse(time)  )/86400000);
                    console.log(remains, ' is remains');
                    return remains;
                }





            }]
        };
    });
}


var myApp = angular.module("myApp", ["ui.bootstrap","countTo"]);

myApp.controller("progressBar",function($scope,$timeout){

    var amt = 66;

    $scope.countTo = amt;
    $scope.countFrom = 0;

    $timeout(function(){
        $scope.progressValue = amt;
    }, 200);

});
