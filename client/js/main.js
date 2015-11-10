var Axios = require('axios');
var Nes = require('nes');

var client = new Nes.Client('ws://localhost:3000');


Axios.post('/login', {
    email: 'guest@guest.com',
    password: 'guest'
}).then(function(response){

    console.log('Login Successful!');

    Axios.get('/test').then(function(response){

        console.log('Http /test request has credentials.');

        client.connect(function (err) {

            console.log('Connected!');

            client.request('/test', function (err, payload) {

                console.log('Socket /test request does not have credentials.');
                console.log(payload);
                // payload -> 'test'
            });

        });

    });

});
