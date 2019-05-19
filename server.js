var express = require('express');
var app = express();
var path = require('path');
const basicAuth = require('express-basic-auth')

var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', express.static(path.join(__dirname, "")));
app.use('/', express.static(path.join(__dirname, "www")));
app.use('/', express.static(path.join(__dirname, "config")));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});


app.use((req,res,next)=>{
   
    if(req.headers.auth != 'supersecret'){
        return res.status(401).send({'message':'you are unauthorized'});
    }
     next();
})

let router = require('./routers/upload.router.js');
app.use('/', router);
app.listen(3000);