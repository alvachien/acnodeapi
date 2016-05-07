var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routeindex = require('./routes/index');
var routeapis = require('./routes/apis');
var routeapitodo = require('./routes/apitodo');
var routeapiuser = require('./routes/apiuser');
var routeapiclient = require('./routes/apiclient');

var passport = require('passport');
var authController = require('./controller/authcontroller');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Changed from false to true, 2016.5.1
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport package in our application
app.use(passport.initialize());

app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

// setting routers
app.use('/', routeindex);
app.use('/apis', routeapis);
app.use('/api/todo', routeapitodo);
app.use('/api/user', routeapiuser);
app.use('/api/client', routeapiclient);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
        //res.render('error', {
        //    message: err.message,
        //    error: err
        //});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //});
});

module.exports = app;
