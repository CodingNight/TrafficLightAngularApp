/*
    Node.js Server
*/
var static = require('node-static'),
    http = require('http'),
    util = require('util');


var webroot = './',
    port = 3456;

var file = new(static.Server)(webroot, {
    cache: 600,
    headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
            }
});

http.createServer(function(req, res) {
console.log('New file request made:');
    req.addListener('end', function() {
        file.serve(req, res, function(err, result) {
            if(err) {
                console.log('Error %s - %s', req.url, res.message);
            }
            console.log('%s - %s', req.url, res.message);
        });
    }).resume();
}).listen(port);

console.log('node-static running at localhost:%d', port);