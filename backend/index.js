const express = require('express')
const app = express();

const FBAuth = require('./util/fbAuth');
const port = process.env.PORT || 4000;

const {signup, login} = require('./handlers/users');
const {getAllTests} = require('./handlers/test')

app.use(express.json());
//middleware functions dont know how to write'em correctly
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "/login"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "/signup"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
//test routes
app.get('/test', getAllTests);

//users routes
app.post('/signup',signup);
app.post('/login',login);


app.listen(port, () => 
console.log(`Server listening http://localhost:${port}`) );
