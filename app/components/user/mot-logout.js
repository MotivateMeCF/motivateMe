import motLogout from './mot-logout.html';
export default function(angularModule) {
    angularModule.directive('logout', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motLogout,
            controller: ['$scope', '$location', '$auth', 'toastr', '$window', function($scope, $location, $auth, toastr, $window) {
                $scope.Userlogout = function() {
                    $auth.logout()
                        .then(function() {
                            // toastr.info('You are logged out!');
                            $scope.logout = $auth.isAuthenticated();
                            $scope.authed = false;
                            $window.localStorage.clear();
                            $window.location = '/';
                        })
                        .catch(function(error) {
                            if (error.error) {
                                toastr.error(error.error);
                            }
                        });
                };
            }]
        };
    });
}
