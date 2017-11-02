var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('./mongo_connect/mongodb');
var redisdb = require('./redis_connect/redisdb');
var cors = require('cors');
require('./middlewares/custom-cors');


var routes = require('./routes/index');
var mysqlroutes = require('./routes/mysqlindex.js');
var mongoroutes = require('./routes/mongoIndex.js');

var app = express();

new mongodb();
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
var socketIo = require('socket.io').listen(server);


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


app.use(favicon(path.join(__dirname, 'public/icons', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));



app.use(cors());
app.options('*', cors());

app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
app.use('/', routes);
//app.use('/chat', require('./chat_app/chatApp')(app, socketIo));

app.use('/mysql', mysqlroutes);
app.use('/mongo', mongoroutes);


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