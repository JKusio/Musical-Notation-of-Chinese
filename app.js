'use strict';
// simple js routing
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');

// musical notation of chinese
var mnc = require('./mnc');

// Set pug as a view engine
app.set('view engine', 'pug');
app.set('views', './views');

// renders main page
app.get('/', function(req, res) {
   res.render('main_page', {
       name: "Musical Notation of Chinese"
   });
});

// renders post-translation page
app.post('/translate', function(req, res) {
    var file = mnc.generateFile(req.body.text, req.body.extra);

    res.render('translate', {
           path: file
    });
});

// download file
app.get('/download', function(req, res){
    res.download(path.join(__dirname, req.query.path), function (err) {
        console.log(err);
    });

});

app.listen(3000);

console.log("Server running on port 3000");