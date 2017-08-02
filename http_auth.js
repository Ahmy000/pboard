// Authentication module.
var auth = require('http-auth');
var http = require('http');

var basic = auth.basic({
    realm: "Simon Area.",
    file: __dirname + "/_data/users.htpasswd"
});

// Creating new HTTP server.
http.createServer(basic, (req, res) => {
    var url = req.url;
    console.log(url);
    if (url == "/content"){
       res.end('Please enter this place.');
    }

    res.end(`Welcome to private area - ${req.user}!`);

}).listen(3000);
