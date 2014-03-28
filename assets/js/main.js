var static = require('node-static'),
    http = require('http'),
    util = require('util');


var webroot = './public',
    port = 3456;

var file = new(static.Server)(webroot, {
    cache: 600,
    headers: {
            'Access-Control-Allow-Origin': 'http://192.168.0.104:3000',
            'Access-Control-Allow-Methods': 'GET'
            };
});

http.createServer(function(req, res) {
    req.addListener('end', function() {
        file.serve(req, res, function(err, result) {
            if(err) {
                console.log("ERROR!!!!!!");
            }
            console.log('%s - %s', req.url, res.message);
        });
    });
}).listen(port);

console.log('node-static running at localhost:%d', port);