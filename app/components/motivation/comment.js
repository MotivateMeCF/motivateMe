import commentTemplate from './comment.html';

export default function(angularModule) {

    angularModule.directive('comment', function() {
        return {
            replace: true,
            restrict: 'E',
            template: commentTemplate,
            scope: {
              'comment': '=',
              'authed': '='
            },
            controller: function($scope, $window, VoteService) {
              var userId = $window.localStorage.getItem('userId');
              var votes = new VoteService();

              votes._id = $scope.comment.votes._id;
              votes.ups = $scope.comment.votes.ups;
              votes.downs = $scope.comment.votes.downs;
              $scope.ups = votes.ups.length;
              $scope.downs = votes.downs.length;

              function updateVote(str) {
                if (votes[str].indexOf(userId) === -1) {
                    votes[str].push(userId);
                    votes.$update(res => {
                      console.log(res);
                      $scope[str] = res[str].length;
                    });
                  } else {
                    votes[str].splice(userId, 1);
                    votes.$update(res => {
                      console.log(res);
                      $scope[str] = res[str].length
                    });
                  }
              }
              $scope.vote = function(str) {
                if (str === 'up') {
                  updateVote('ups')
                }
                else {
                  updateVote('downs');
                }
              }
              // $scope.votes = new VoteService();
              //initiate arrays for up and down vote if not existed

              }//end controller
        }//end return
    });
}
