var createError = require('http-errors');

// Creates an Express application. The express() function is a top-level function exported by the express module.
// Express 응용 프로그램을 만든다. express() 함수는 express 모듈에서 내보내는 최상위 함수입니다.
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Router 불러오기
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello');

// The app object conventionally denotes the Express application. Create it by calling the top-level express() function exported by the Express module.
// 앱 객체는 전통적으로 익스프레스 애플리케이션을 나타낸다. Express 모듈에서 내보낸 최상위 express() 함수를 호출하여 생성합니다.
var app = express();

// view engine setup
// 템플릿 엔진이 ejs engine으로 설치되었음을 확인할 수 있다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);  // '/' 현재 페이지를 의미함(여기서는 http://localhost:3000)
app.use('/users', usersRouter); // 따라서 여기 path는 http://localhost:3000/users가 된다.
app.use('/hello', helloRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // status code 404 이후에도 계속 진행해야 하기 때문에 next() 함수를 사용한다.
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