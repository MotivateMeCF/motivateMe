import motProfile from './mot-profile.html';
export default function(angularModule) {

    /**
     * Controller:
     */
    angularModule.directive('motProfile', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motProfile,
            controller: ['$scope', '$location', '$auth', 'toastr', 'UserService', 'viewService', 'ProjectService', '$window', function($scope, $location, $auth, toastr, UserService, viewService, ProjectService, $window) {
                $scope.view = viewService;
                var userId = $window.localStorage.getItem('userId');

                $scope.userData = UserService.get({
                    id: userId
                });

                // ProjectService.query({
                //     id: userId
                // }).$promise.then((data) => {
                //     $scope.projects = data;
                // });
          }]
        }
    });
}
