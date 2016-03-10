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
          controller: ['$scope', '$rootScope', '$location', '$auth', 'toastr', 'viewService', function($scope, $rootScope, $location, $auth, toastr, viewService) {
              $scope.login = function(user) {
                      $auth.login($scope.user)
                          .then(function(name) {
                              window.localStorage.setItem('userId', name.data.userId);

                              //enable logout
                              $scope.logout = true;
                              toastr.success('Your signed in!');
                              $location.path(`/${$rootScope.previousState}`);

                          })
                          .catch(function(error) {
                              toastr.error(error.data.message, error.status);
                          });
              };
              $scope.authenticate = function(provider) {
                  $auth.authenticate(provider)
                      .then(function(name) {
                          window.localStorage.setItem('userId', name.data.userId);

                          //enable logout
                          $scope.logout = true;
                          toastr.success(`You are now signed in with ${provider}, thanks!`);
                          $location.path(`/${$rootScope.previousState}`);
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
