var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var app = express();

// view engine setup

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.send('Not Found');
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('Internal Server Error');
});


module.exports = app;
