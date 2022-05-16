const express = require('express');
const router = express.Router();
const blogSchema = require('../models/blog');

router.get('/', async (req, res) => {
  // 블로그 메인 페이지에 게시글 리스트 추가하기
  const result = await blogSchema.find({}).exec(); // 검색하기
  // 변수 넘겨줘서 검색 결과 데이터 활용하기
  res.render('blog/blog', { titleList: result });  // views/blog/blog.ejs
});

router.get('/write', (req, res) => {
  res.render('blog/write'); // views/blog/write.ejs
});

router.post('/write', (req, res, next) => {
  // DB 연결해야 한다. -> models/blog.js에서 blogModel 작성

  // 요청 body의 정보 가져오기
  // const { title, content } = req.body;
  const title = req.body.title;
  const content = req.body.content;

  // 데이터 저장
  const blogPost = new blogSchema({
    title: title,
    content: content
  })

  blogPost
    .save() // 저장하기
    .then((result) => {
      console.log(result);
      res.redirect('/blog');  // 블로그 첫 화면으로 가기
    })
    .catch((error) => { // 에러 처리하기
      console.log(error);
      next(error);
    })
})

module.exports = router;