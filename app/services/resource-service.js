export default function(angularModule) {

        function create(name, url) {
            angularModule.factory(name, ['$resource', 'baseUrl',
                function($resource, baseUrl) {
                    return $resource(`${baseUrl}${url}/:id?populate=author`, {
                        id: '@_id'
                    }, {
                        update: {
                            method: 'PATCH',
                        }
                    });
                }
            ]);
        }
        create('UserService', '/api/v1/users');
        create('ProfileService', '/api/v1/users');
        create('ProjectService', '/api/v1/projects')
        create('FeedService', '/projects');
        create('CommentService', '/api/v1/comments');
    };

