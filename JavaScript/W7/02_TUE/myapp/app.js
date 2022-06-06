const express = require('express'); // Express.js
const createError = require('http-errors'); // Create HTTP errors for Express.js
const path = require('path'); // Node.js Built-in Module for file and directory paths.
const cookieParser = require('cookie-parser');  // 쿠키 처리하는 라이브러리([참고](http://expressjs.com/en/resources/middleware/cookie-parser.html))
const logger = require('morgan'); // 로그 하기 쉽게 해주는 라이브러리([참고](https://expressjs.com/en/resources/middleware/morgan.html))
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const dbconnect = require('./models/index');  // DB 불러오기
dbconnect();  // 함수형이기 때문에 실행해주어야 한다.

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

const app = express();  // app 객체 생성

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 전역 변수 설정: 시간 포맷 설정([참고](https://day.js.org/docs/en/display/format), [참고](https://www.npmjs.com/package/dayjs))
// formatDate: 모든 시간 데이터는 재포맷된다.
app.locals.formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');   // display 포맷 통일!
}

app.use('/', indexRouter);
app.use('/posts', postsRouter);

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