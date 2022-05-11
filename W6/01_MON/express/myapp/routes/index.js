var express = require('express');
var router = express.Router();

/* GET home page. */
// get 이후의 형태를 미들웨어라고 한다.
// router.get(경로, (요청, 응답, 다음으로 갈지말지 여부) => {기능})
router.get('/', function(req, res, next) {
  // SSR: 데이터 전달이 용이하고 보안적으로 유리함
  res.render('index', { title: 'Express' });
            // view의 index 파일을 렌더링한다.
            // <%= title %> 을 통해 변수처럼 활용 가능함
            // TODO: Googling
});


module.exports = router;