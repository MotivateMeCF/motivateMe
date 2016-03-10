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
            controller: ['$scope', 'ProjectService', '$window', 'viewService', 'ProgressService', function($scope, ProjectService, $window, viewService, ProgressService) {
              $scope.view = viewService;
              $scope.project = new ProjectService();
              $scope.post = function() {

                $scope.project.author = $window.localStorage.getItem('userId');

                var promises = [];
                var progresses = $scope.project.progress.split(', ');

                Promise.all(
                  progresses.map( progress => {
                    return new ProgressService({
                      content: progress,
                      done: false
                    }).$save();
                  })
                ).then( result => {
                    console.log('RESULT',result);
                    $scope.project.progress = result.map(progress => {
                      return progress._id;
                    });
                    $scope.project.$save(res => {
                      $scope.savedProject = res;
                      console.log($scope.savedProject);
                    });
                })
                 .catch(err => {
                    console.log(err);
                  });
              }//end $scope.post
            }]//end controller
         };
    });
}
