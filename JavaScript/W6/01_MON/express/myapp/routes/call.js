// Express 가져오기
const express = require('express');
// 라우터 만들기
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('test express');
  res.send('Hello, Express!');
  // next();// 현재 미들웨어의 기능을 마치고, 다음 미들웨어로 연결해주는 역할을 담당.
});

router.get('/member', (req, res) => {
  res.send('call member');
})

router.get('/member/:id', (req, res) => {
  const member = req.params.id;
  // 맨 뒤가 name이면 name을 가져오면 된다.
  console.log(member);
  res.send('call ' + member);
  // id 값이 비어있는 경우 try-catch로 에러처리
})

// 다음 미들웨어?
// router.get('/', function(req, res, next) {
//   console.log('2nd express');
// })

module.exports = router;  // ==> app.js로