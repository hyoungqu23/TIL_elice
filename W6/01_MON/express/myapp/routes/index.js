var express = require('express');
var router = express.Router();

/* GET home page. */
// get 이후의 형태를 미들웨어라고 한다.
// router.get(경로, (요청, 응답, 다음으로 갈지말지 여부) => {기능})
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;