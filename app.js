var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

<<<<<<< HEAD
let indexRouter = require('./routes/index');
let detailRouter = require('./routes/detail');
let listRouter = require('./routes/list');
var castRouter = require('./routes/cast');
var seasonRouter = require('./routes/season');
var episodeRouter = require('./routes/episode')
=======
var indexRouter = require('./routes/index');
var detailRouter = require('./routes/detail');
var castRouter = require('./routes/cast');
var seasonRouter = require('./routes/season');
var episodeRouter = require('./routes/episode')
let listRouter = require('./routes/list');
>>>>>>> aafb143b49cfff184132dc6e7d14c2b3653e242d

var app = express();

var mongoose = require('./connection/mongo');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/detail', detailRouter);
<<<<<<< HEAD
app.use('/list', listRouter);
app.use('/cast', castRouter);
app.use('/season', seasonRouter);
app.use('/episode', episodeRouter);
=======
app.use('/cast', castRouter);
app.use('/season', seasonRouter);
app.use('/episode', episodeRouter);
app.use('/list', listRouter);
>>>>>>> aafb143b49cfff184132dc6e7d14c2b3653e242d

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;