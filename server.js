var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
//var multer = require('multer');


/*var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/uploads/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});*/

/*var upload = multer({
    storage: storage
}).single('file');*/

/*app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

app.use('/', express.static(path.join(__dirname, "")));
app.use('/', express.static(path.join(__dirname, "www")));
app.use('/', express.static(path.join(__dirname, "config")));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});

let router = require('./routers/upload.router.js');
app.use('/', router);
/** API path that will upload the files */
/*app.post('/upload', function(req, res) {

});*/

app.listen(3000);