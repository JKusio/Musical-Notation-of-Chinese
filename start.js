'use strict';
// simple js routing
var express = require('express');
var start = express();
const bodyParser = require('body-parser');
start.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');

// musical notation of chinese
var mnc = require('./mnc');

// Set pug as a view engine
start.set('view engine', 'pug');
start.set('views', './views');

// renders main page
start.get('/', function(req, res) {
   res.render('main_page', {
       name: "Musical Notation of Chinese"
   });
});

// renders post-translation page
start.post('/translate', function(req, res) {
    var file = mnc.generateFile(req.body.text, req.body.extra);

    res.render('translate', {
           path: file
    });
});

// download file
start.get('/download', function(req, res){
    res.download(path.join(__dirname, req.query.path), function (err) {
        console.log(err);
    });

});

start.listen(8080);

console.log("Server running on port 8080");