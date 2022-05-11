const express = require('express');
const router = express.Router();

// 만든 화면 보여주기
router.get('/', (req, res, next) => {
  res.render('post');
});

// 여기서는 이미 기본 페이지가 /expost이기 때문에 경로가 /로 설정된다.
router.post('/', (req, res, next) => {
  // 요청
  // destructing || const {name, phoneNumber, bDay} = req.body; 가능!
  const {name, phoneNumber, bDay} = req.body;
  // const name = req.body.name; // req.body: form의 name input의 값을 전달 받음
  // const phoneNumber = req.body.phoneNumber; // req.body: form의 phoneNumber input의 값을 전달 받음
  // const bDay = req.body.bDay; // req.body: form의 bDay input의 값을 전달 받음
  
  // 응답
  // 
  // JSON 형식으로 응답 받기
  res.json({
    name: name,
    phoneNumber: phoneNumber,
    bDay: bDay,
  })

  // 다음 미들웨어로 넘겨주기
  next();
});

// 다음 미들웨어
// router.post('/', (req, res, next) => {
//   // redirect: 호출한 경로로 재접근
//   // 이는 이전 미들웨어에서 이미 응답을 했기 때문에, 응답을 다시 할 수 없다.
//   res.redirect('/expost');
// })

module.exports = router;