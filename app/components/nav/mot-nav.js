import motNav from './mot-nav.html';
export default function(angularModule) {
    /**
     * Controller:
     */
    angularModule.directive('motNav', function() {
                return {
                    replace: true,
                    restrict: 'E',
                    template: motNav,
                    controller: ['$scope', 'viewService', '$auth', function($scope, viewService, $auth) {
                          $scope.view = viewService;
                          $scope.logout = $auth.isAuthenticated();
                        }]
                    }
            });
}
