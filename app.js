var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('./mongo_connect/mongodb');
var redisdb = require('./redis_connect/redisdb');


var routes = require('./routes/index');
var mysqlroutes = require('./routes/mysqlindex.js');

var app = express();

//new mongodb();
//new redisdb();
var raw_port = parseInt(process.env.PORT, 10) || 8000;

process.argv.forEach(function (val, index, array) {
    var port_i = val.search(/^port=/i);
    if (port_i > -1) {
        raw_port = val.substring(port_i + 5, val.length);
        console.log("raw_port : " + raw_port);
    }
});
var port = normalizePort(raw_port);
app.set('port', port);

var server = app.listen(port, function () {
    console.log('Server listening on url: http://localhost:' + port);
});



function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//app.use(favicon(path.join(__dirname, 'public/icons', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
app.use('/', routes);
app.use('/mysql', mysqlroutes);


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;