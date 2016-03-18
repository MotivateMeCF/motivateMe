export default function($scope, $auth, ProgressService, CommentService, $stateParams, FeedService) {
  function compare(A, B) {
    if (A.time > B.time) {
        return -1;
    }
    else if (A.time < B.time) {
        return 1;
    }
    return 0;
  };
  Object.keys($stateParams).forEach(key => {
                        $scope[key] = $stateParams[key];
                    });

  if ($auth.isAuthenticated()) {
      $scope.authed = true;
  }
  else {
      $scope.authed = false;
  }
  $scope.selectProg = function(prog, id) {
      $scope.commentOn = prog;
      $scope.commentProgId = id;
  }

  FeedService.query({'id':$scope.projectId}, res => {
    $scope.singleProjectView = res[0];
    $scope.singleProjectView.time = $scope.singleProjectView.time.substring(0,10);
    $scope.comments = $scope.singleProjectView.comments;
    $scope.comments.sort(compare);
    //For milestone progress bar:
    $scope.max = $scope.singleProjectView.progress.length;
    $scope.value = 0;
    $scope.singleProjectView.progress.forEach(progress => {
        if (progress.done === true) {
            $scope.value += 1;
        }
    });
  });
}
