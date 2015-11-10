var Boom = require('boom');

exports.register = function(server, options, next){

    server.route({
        method: 'GET',
        path: '/assets/js/main.dist.js',
        config: {
            auth: false,
            handler: function (request, reply) {
                reply.file('./client/js/main.dist.js');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: false,
            handler: function(request, reply){

                var layout = `
                    <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
                        </head>
                        <body>
                            <div id="app"></div>
                            <script src="/assets/js/main.dist.js" async></script>
                        </body>
                    </html>
                `;
                reply(layout);

            }
        }
    });

    server.route({
        method: 'GET',
        path: '/{path*}',
        config: {
            auth: false,
            handler: function(request, reply){
                reply(Boom.notFound());
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'base'
};
