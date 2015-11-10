exports.register = function(server, options, next){

    server.route({
        method: 'GET',
        path: '/test',
        config: {
            auth: {
                strategy: 'basic',
                mode: 'try'
            },
            handler: function (request, reply) {
                console.log('request.auth');
                console.log(request.auth);

                return reply('test');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/example-one',
        config: {
            description: 'No required authorization.',
            auth: false,
            handler: function(request, reply) {

                return reply('Success, You have accessed a public route!');

            }
        }
    });

    server.route({
        method: 'GET',
        path: '/example-two',
        config: {
            description: 'User required authorization',
            auth: {
                strategy: 'basic',
                scope: 'user'
            },
            handler: function(request, reply) {
                return reply('Success, you can access a route that requires the user role!');

            }
        }
    });

    server.route({
        method: 'GET',
        path: '/example-three',
        config: {
            description: 'Admin required authorization because the default is admin.',
            handler: function(request, reply) {

                return reply('Success, you can access a route that requires the admin role!');

            }
        }
    });

    server.route({
        method: 'GET',
        path: '/example-four/{id}',
        config: {
            description: 'User specific authorization required.',
            auth: {
                strategy: 'basic',
                scope: ['admin', 'user-{params.id}']
            },
            handler: function(request, reply) {

                return reply('Success, you can access a route for ' + request.params.id + '!');

            }
        }
    });


    next();
};

exports.register.attributes = {
    name: 'example'
};
