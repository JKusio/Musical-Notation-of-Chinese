'use strict';
// simple js routing
var express = require('express');
var server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
var path = require('path');

// musical notation of chinese
var mnc = require('./mnc');

// Set pug as a view engine
server.set('view engine', 'pug');
server.set('views', './views');

// renders main page
server.get('/', function(req, res) {
   res.render('main_page', {
       name: "Musical Notation of Chinese"
   });
});

// renders post-translation page
server.post('/translate', function(req, res) {
    var file = mnc.generateFile(req.body.text, req.body.extra, req.body.to_polish);

    res.render('translate', {
           path: file
    });
});

// download file
server.get('/download', function(req, res){
    res.download(path.join(__dirname, req.query.filepath), function (err) {
        console.log(err);
    });

});

server.listen(8080);

console.log("Server running on port 8080");