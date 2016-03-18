import motFeed from './mot-feed.html';

//import filters from '../../filters';

export default function(angularModule) {

    /**
   * Controller: displays feed for main page
   */


    angularModule.directive('feed', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motFeed,
            controller: [ '$scope', 'FeedService',
                function( $scope, FeedService ){
                    function compare(A, B) {
                        if (A.time > B.time) {
                            return -1;
                        }
                        else if (A.time < B.time) {
                            return 1;
                        }
                        return 0;
                    };
                    FeedService.query( res => {
                        $scope.projects = res;
                        $scope.projects.sort(compare);
                        $scope.projects.map(project => {
                            project.time = project.time.substring(0,10);
                            project.completion = project.completion.substring(0,10);
                        })
                    });
                    $scope.projectView = function(project){
                        $scope.singleProjectView = project;
                        // FeedService.query({'id':project._id}, res => {
                        //           $scope.comments = res;
                        //           $scope.comments.sort(compare);
                        //          });
                        // $scope.singleProjectView.time = project.time.substring(0,10);
                        // //For milestone progress bar:
                        // $scope.max = $scope.singleProjectView.progress.length;
                        // $scope.value = 0;
                        // $scope.singleProjectView.progress.forEach(progress => {
                        //     if (progress.done === true) {
                        //         $scope.value += 1;
                        //     }
                        // });
                    };

                    $scope.remaining = function(time, completion){
                        var remains = Math.floor((1+ Date.parse(completion) - Date.now()  )/86400000);
                        return remains;
                    };

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

                }
            ]
        };
    });
}
