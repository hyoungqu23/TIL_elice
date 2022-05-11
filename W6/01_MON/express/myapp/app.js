var createError = require('http-errors');
var express = require('express'); // 라우터
var path = require('path'); // 파일 위치 찾기
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 주소를 찾는 것이 routing이다.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var callRouter = require('./routes/call');
const postRouter = require('./routes/post');  // 라우터 불러오기

var app = express();

// view engine setup || ejs engine으로 설치
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/call', callRouter);
app.use('/expost', postRouter); // localhost:3000/expost에서 postRouter로 통신흐름이 연결된다.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // 404 이후에도 진행해야 하기 때문에 next 활용
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