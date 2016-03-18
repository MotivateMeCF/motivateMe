import motSignup from './mot-signup.html';
export default function(angularModule) {

    /**
     * Controller: creates signup element.
     */
    angularModule.directive('signup', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motSignup,
            // scope: {
            //     logout: '='
            // },
            controller: ['$scope','$location', '$auth', 'toastr', '$rootScope', function($scope, $location, $auth, toastr, $rootScope) {
                $scope.signupUser = function() {
                    $auth.signup($scope.user)
                        .then(function(response) {
                            window.localStorage.setItem('userId', response.data.userId);
                            $auth.setToken(response);
                            toastr.info('You are now registered, thank!');
                            $scope.logout = $auth.isAuthenticated();
                            $scope.needSignIn = false;
                            $scope.authed = true;
                            // $location.path('/');
                            $location.path(`/${$rootScope.previousState}`);
                        })
                        .catch(function(response) {
                          toastr.error(response.data.message);
                        });
                };
            }]
        };
    });
}
