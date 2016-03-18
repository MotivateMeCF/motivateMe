import satellizer from 'satellizer';
var baseUrl = BASE_URL;
export default function(app) {
    app.requires.push(satellizer);
    app.config(['$authProvider', configAuth]);
    app.run(['$rootScope', 'ngDialog', '$state', '$auth', runAuth]);
}

function configAuth($authProvider) {
    // $authProvider.httpInterceptor = function() { return true; };
    // $authProvider.withCredentials = true;
    // $authProvider.tokenRoot = null;
    // $authProvider.cordova = false;
    // $authProvider.baseUrl = '/';
    // $authProvider.loginUrl = '/auth/login';
    // $authProvider.signupUrl = '/auth/signup';
    // $authProvider.unlinkUrl = '/auth/unlink/';
    // $authProvider.tokenName = 'token';
    // $authProvider.tokenPrefix = 'satellizer';
    // $authProvider.authHeader = 'Authorization';
    // $authProvider.authToken = 'Bearer';
    // $authProvider.storageType = 'localStorage';

    $authProvider.twitter({
        url: `${baseUrl}/auth/twitter` //${baseUrl}
    });
    // $authProvider.signupUrl = `${baseUrl}/auth/signup`; //${baseUrl}
    // $authProvider.loginUrl = `${baseUrl}/auth/login`; //${baseUrl}
}

function runAuth($rootScope, ngDialog, $state, $auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        if (toState.data && toState.data.requireAuth && !$auth.isAuthenticated()) {
            event.preventDefault();
            $state.transitionTo('feed');
        }
    });
}
