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
            controller: ['$scope','$location', '$auth', 'toastr', function($scope, $location, $auth, toastr) {
                $scope.signupUser = function() {
                    $auth.signup($scope.user)
                        .then(function(response) {
                            window.localStorage.setItem('userId', response.data.userId);
                            $auth.setToken(response);

                            //enable logout
                            $scope.logout = true;
                            toastr.info('You are now registered, thank!');
                            $location.path('/');
                        })
                        .catch(function(response) {
                          toastr.error(response.data.message);
                        });
                };
            }]
        };
    });
}
