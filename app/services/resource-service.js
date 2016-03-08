export default function(angularModule) {

        function create(name, url) {
            angularModule.factory(name, ['$resource', 'baseUrl',
                function($resource, baseUrl) {
                  console.log(url);
                    return $resource(`${baseUrl}${url}`, {
                        id: '@_id'
                    }, {
                        update: {
                            method: 'PATCH',
                        }
                    });
                }
            ]);
        }
        create('ProfileService', '/api/v1/users');
        create('FeedService', '/api/v1/projects');
        create('CommentService', '/ap1/v1/comments');
    };
