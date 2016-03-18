import motLogin from './mot-login.html';
export default function(angularModule) {

  /**
   * Controller: user authentication for login with provider or email/pwd
   */
  angularModule.directive('login', function() {
      return {
          replace: true,
          restrict: 'E',
          template: motLogin,
          // scope: {
          //   logout: '='
          // },
          controller: ['$scope', '$rootScope', '$location', '$auth', 'toastr', function($scope, $rootScope, $location, $auth, toastr) {
            $scope.login = function(user) {
                    $auth.login($scope.user)
                        .then(function(name) {
                            window.localStorage.setItem('userId', name.data.userId);
                            toastr.success('Your signed in!');
                            $scope.logout = $auth.isAuthenticated();
                            $scope.needSignIn = false;
                            $scope.authed = true;
                            $location.path('/');

                            // in order to use previousState, we need:
                            /*
                              $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
                                //save the previous state in a rootScope variable so that it's accessible from everywhere
                                $rootScope.previousState = from;
                              });
                            */
                        })
                        .catch(function(error) {
                            toastr.error(error.data.message, error.status);
                        });
            };
            $scope.authenticate = function(provider) {
                $auth.authenticate(provider)
                    .then(function(name) {
                        window.localStorage.setItem('userId', name.data.userId);
                        toastr.success(`You are now signed in with ${provider}, thanks!`);
                        $scope.logout = $auth.isAuthenticated();
                        $scope.needSignIn = false;
                        $location.path('/');
                        // $location.path(`/${$rootScope.previousState}`);
                    })
                    .catch(function(error) {
                        if (error.error) {
                            toastr.error(error.error);
                        } else if (error.data) {
                            toastr.error(error.data.message, error.status);
                        } else {
                            toastr.error(error);
                        }
                    });
            };
          }]
      };
  });


}
