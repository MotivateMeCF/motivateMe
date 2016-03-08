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
            controller: ['$scope', '$location', '$auth', 'toastr','ProfileService', function($scope, $location, $auth, toastr, ProfileService) {
              $scope.test = ProfileService.query()
            }]
        };
    });
}
