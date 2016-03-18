import userTemplate from './user.html';
export default function(angularModule) {
    /**
     * Controller:
     */
    angularModule.directive('user', function() {
                return {
                    replace: true,
                    restrict: 'E',
                    template: userTemplate
                  }
            });
}
