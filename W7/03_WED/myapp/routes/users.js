const express = require('express');
const userSchema = require('../models/newuser');
const router = express.Router();

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('user/auth');
});

// 실제로는 passport 사용해도 된다.
// 보통은 프론트엔드 측에서도 처리하고(정규표현식), 

router.post('/signup', 
  body('email').isEmail().withMessage('not email'), // name= email 인 값이 email 형식을 가지는지, 
  body('password').isLength({ min: 5 }).withMessage('less than 5'), // name= password 인 값의 길이가 5 이상인지
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        // > isEmail error -> {"errors":[{"value":"aaaaaaa","msg":"Invalid value","param":"email","location":"body"}]}
        // > isLength error -> {"errors":[{"value":"11","msg":"Invalid value","param":"password","location":"body"}]}
      })
    }

    // 암호화하기
    const salt = bcrypt.genSaltSync(10);  // 암호화할 때 기준이 되는 메시지의 길이 설정(10)
    const bcryptpw = bcrypt.hashSync(req.body.password, salt);  // 10개 기준으로 암호화
    
    // DB에 바로 저장
    userSchema.create({
      email: req.body.email,
      password: bcryptpw, // 암호화된 password를 저장 -> 로그인 시에는 해시 매칭을 통해 찾아낼 수 있다.
    })
    .then(result => {
      res.status(200).json(result);
    })
  
    // SNS 로그인, 이메일 인증 등 추가 가능
});

// 미들웨어 추가해도 된다.
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 실제로 가입한 유저인지 확인
  const userData = await userSchema.findOne({ email }).exec();
  if (!userData) {
    return res.status(401).json({ msg: "가입되지 않은 계정입니다."})
  } else {
    const pwMatch = bcrypt.compareSync(password, userData.password);
    if (pwMatch) {
      res.status(200).json({ msg: "OK" });
    } else {
      res.status(401).json({ msg: "No Match Data"});
    }
  }
});

router.get('/login', (req, res) => {
  res.render('user/login');
})

module.exports = router;