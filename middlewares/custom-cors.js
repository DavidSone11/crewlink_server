var express = require('express');
var app = express();



app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Cookie');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});