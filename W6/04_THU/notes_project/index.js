const express = require('express');
const notesRouter = require('./routes/notes');
const authorRouter = require('./routes/author');

const app = express();

// JSON 데이터를 사용할 수 있게 해주는 미들웨어
// express는 기본적으로 HTTP body에 전달되는 JSON 데이터를 처리할 수 없다.
app.use(express.json());

app.use('/notes', notesRouter);
app.use('/authors', authorRouter);

// 정의되지 않은 라우팅에 404 에러 처리하기
// express는 기본적으로 404 페이지를 가지고 있으나, 직접 처리가 필요한 경우 라우터 핸들러를 추가해주어야 한다.
app.use((req, res, next) => {
  // 설정된 경로가 없는 요청을 처리하는 라우터 핸들러
  res.status(404);
  res.send({ 
    result: 'fail', 
    error: `Page not found ${req.path}`
  });
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.status(500);

  res.json({
    result: 'fail',
    error: err.message,
  });
});

app.listen(3000);