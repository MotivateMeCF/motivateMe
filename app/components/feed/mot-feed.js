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
            controller: [ '$scope', 'FeedService', 'ProgressService',
                function( $scope, FeedService, ProgressService ){
                    $scope.projects = FeedService.query();
                    $scope.progress = ProgressService.query();
                    $scope.projectView = function(project){
                        $scope.singleProjectView = project;

                        $scope.singleProjectView.time = project.time.substring(0,10);

                        FeedService.query({id: project._id})
                                   .$promise
                                   .then(res => {
                                        $scope.comments = res;
                                   });
                    }



                }
            ]
        };
    });
}
