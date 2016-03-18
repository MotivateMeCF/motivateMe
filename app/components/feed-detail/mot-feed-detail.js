import motFeedDetail from './mot-feed-detail.html';

export default function(angularModule) {

    angularModule.directive('feedDetail', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motFeedDetail
            // controller: ['$scope', '$auth', 'ProgressService', 'CommentService', '$stateParams', 'FeedService', function($scope, $auth, ProgressService, CommentService, $stateParams, FeedService) {
              // if ($auth.isAuthenticated()) {
              //   $scope.authed = true;
              // }
              // else {
              //   $scope.authed = false;
              // };
              //To return to public feed
              // $scope.returnToFeed = function(){
              //   $location.path = '/';
              // }
              // $scope.selectProg = function(prog, id) {
              //   $scope.commentOn = prog;
              //   $scope.commentProgId = id;
              // }
              // $scope.comments = $scope.singleProjectView.query();
            // }]
        };
  });
}
