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
            scope: {

             },
            controller: [ '$scope', 'FeedService',
                function( $scope, FeedService ){

                    $scope.projects = FeedService.query();

                    console.log('projects progress', $scope.projects);

                    $scope.projectView = function(project){
                        $scope.singleProjectView = project;

                        $scope.singleProjectView.time = project.time.substring(0,10);

                        FeedService.query({id: project._id})
                                   .$promise
                                   .then(res => {
                                        $scope.comments = res;
                                   });


                        $scope.remaining = function(time, completion){
                            console.log(Date.parse(time), Date.parse(completion) );

                            var remains = Math.floor((1+ Date.parse(completion) - Date.parse(time)  )/86400000);
                            console.log(remains, ' is remains');
                            return remains;
                        }


                    }



                }
            ]
        };
    });
}
