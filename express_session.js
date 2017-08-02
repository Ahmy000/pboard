var express = require('express'),
    app = express(),
    session = require('express-session');

var auth = require('http-auth');
var basic = auth.basic({
    realm: "Simon Area.",
    file: __dirname + "/_data/users.htpasswd"
});

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
    
// app.use(auth.connect(basic));

// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('empty user & pass');
  }else if(req.query.username == 'bell' && req.query.password == 'iloveu'){
    req.session.user = req.query.username;
    req.session.admin = true;
    res.send("login success!");
  }else{
    res.send('wrong user or pass');
  }
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
 
// Get content endpoint
app.get('/content', function (req, res) {
    if (!req.session.user) {
       res.send("You can only see this after you've logged in.");
    }else{
       res.send("Welcome to this place: ${req.session.user}");
    }
}); 
  
app.listen(3000);
console.log("app running at http://localhost:3000");
