const express = require('express');
const userSchema = require('../models/newuser');
const router = express.Router();

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const { token } = require('morgan');
const session = require('express-session');
const parseurl = require('parseurl');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('user/auth');
});

// 실제로는 passport 사용해도 된다.
// 보통은 프론트엔드 측에서도 처리하고(정규표현식), 

router.get('/signup', (req, res) => {
  res.render('blog/signup');
})

// 쿠키와 세션을 활용해 로그인 여부와 id를 보관하게끔 해야 한다.
// 쿠키: 사용자의 브라우저에 저장하는 데이터의 모음. => 각각의 언어 정보를 저장하여 보여주는데 활용할 수 있다.(개발자도구의 application 탭에서 확인 가능)
// 세션: 서버에 저장하는 데이터의 모음. => 보안을 위해 세션에 많은 정보를 저장하게 된다.
// 다만, 최근에는 JWT token을 활용해 암호화하여 쿠키에 저장할 수도 있다. 이는 정보 저장량을 분산시켜 비즈니스 측면에서 비용을 절감할 수 있고, 사용자가 쿠키 정책에 동의함으로써 보안 이슈 문제로부터 자유로워 진다.

// 쿠키
router.get('/cookie', (req, res) => {
  res.cookie('note', '1000');
  res.send('set cookie');
});

// 세션
router.use( // 초기화
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: true
  })
);  // user.js 라우터 구간에서만 사용 가능하게 설정(전역으로 설정하기 위해서는 ...)

router.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {}
  }

  // get the url pathname
  let pathname = parseurl(req).pathname;

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})

router.get('/foo', (req, res, next) => {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

// 논리도
// 넘어오는 값을 활용하기에 post method
// id: email 형식, pw: 5글자 이상
// 중복 가입 방지

router.post('/signup', 
  body('email').isEmail().withMessage('이메일 형식을 입력하세요.'), // name= email 인 값이 email 형식을 가지는지, 
  body('password').isLength({ min: 5 }).withMessage('5글자 이상을 입력하세요.'), // name= password 인 값의 길이가 5 이상인지
  async (req, res, next) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        // > isEmail error -> {"errors":[{"value":"aaaaaaa","msg":"Invalid value","param":"email","location":"body"}]}
        // > isLength error -> {"errors":[{"value":"11","msg":"Invalid value","param":"password","location":"body"}]}
      })
    }

    // 중복 가입 방지
    const findResult = await userSchema.findOne({ email }).exec();

    if (!findResult) {
      // 암호화하기
      const salt = bcrypt.genSaltSync(10);  // 암호화할 때 기준이 되는 메시지의 길이 설정(10)
      const bcryptpw = bcrypt.hashSync(password, salt);  // 10개 기준으로 암호화
      
      // DB에 바로 저장
      userSchema.create({
        email: email,
        password: bcryptpw, // 암호화된 password를 저장 -> 로그인 시에는 해시 매칭을 통해 찾아낼 수 있다.
      })
      .then(result => {
        // console.log(result); -> 배포 시 제거해야 한다.
        res.status(200).json(result);
      })
    } else {
      res.status(401).json({ msg: '이미 가입된 계정입니다.' });
    }

    // SNS 로그인, 이메일 인증 등 추가 가능 => 2차 인증은 필수적으로 구현하자!
    // 이메일 중복 여부 확인 기능
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
      res.status(401).json({ msg: "비밀번호가 일치하지 않습니다."});
    }
  }
});

router.get('/login', (req, res) => {
  res.render('user/login');
})

module.exports = router;