import FeedDetailCtrl from './FeedDetailCtrl';

export default function(angularModule) {
    angularModule.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('feed', {
                url: '/',
                template: '<feed></feed>',
                data: {
                    requireAuth: false
                }
            })
            .state('detail', {
                url: '/detail/:projectId',
                template: '<feed-detail></feed-detail>',
                data: {
                    requireAuth: false
                },
                controller: FeedDetailCtrl
            })
            .state('profile', {
              url: '/profile',
              template: '<mot-profile></mot-profile>',
              data: {
                requireAuth: true
              }
            })
            .state('project', {
                url: '/project/:id',
                template: '<project-detail></project-detail>',
                data: {
                    requireAuth: true
                }
            });
    }]);
}
