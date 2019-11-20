var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeListRouter = require('./routes/homeList');
var jdsupermarket = require('./routes/jdsupermarket');

var app = express();

app.use(function (req, res, next) {
  //如果客户端要向服务器发送cookie的话，绝不对写*
  // res.header('Access-Control-Allow-Origin', "http://localhost:8002");
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Content-Type");
  res.header('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE,OPTIONS");
  //允许跨域传cookie
  res.header('Access-Control-Allow-Credentials', "true");
  if (req.method === 'OPTIONS') {
    res.end('');
  } else {
    next();
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homeList', homeListRouter);
app.use('/jdsupermarket', jdsupermarket);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
