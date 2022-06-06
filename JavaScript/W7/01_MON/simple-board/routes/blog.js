const express = require('express');
const router = express.Router();
const blogSchema = require('../models/blog');

router.get('/', async (req, res) => {
  // 블로그 메인 페이지에 게시글 리스트 추가하기
  const result = await blogSchema.find({}).exec(); // 검색하기
  // 변수 넘겨줘서 검색 결과 데이터 활용하기
  res.render('blog/blog', { titleList: result });  // views/blog/blog.ejs
});

// 게시글 하나의 상세 페이지 만들기
router.get('/read/:id', async (req, res) => {
  const contentNumber = req.params.id;
  const result = await blogSchema.findOne({ no: contentNumber }).exec();
  res.render('blog/blogContent', { content: result });  // 해당 ejs 파일에 버튼 추가한 것 중요
});

// 생성 페이지 만들기
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

  // Promise 써보기
  blogPost
    .save() // 저장하기
    .then((result) => {
      return res.status(200).json({
        redirect: '/blog',
      })
      // console.log(result);
      // res.redirect('/blog');  // 블로그 첫 화면으로 가기 -> then으로 인해 문제 발생할 수 있음(await가 역시 더...)
    })
    .catch((error) => { // 에러 처리하기
      console.log(error);
      next(error);
    })
})

// 수정
router.get('/edit/:id', async (req, res) => {
  const contentNumber = req.params.id;
  const result = await blogSchema.findOne({ no: contentNumber }).exec();
  res.render('blog/edit', { content: result })
})

router.post('/update/:id', async (req, res) => {
  const { title, content } = req.body;
  const contentNumber = req.params.id;
  const result = await blogSchema.updateOne({
    no: contentNumber
  }, 
  {
    title: title,
    content: content,
  }).exec();
  res.render('/blog/blogContent', {content: result}); // 캐시 저장때문에 동작 안하는 것을 방지하기 위해
})

// 본래는 async await
router.delete('/delete/:id', async (req, res, next) => {
  const contentNumber = req.params.id;
  try {
    await blogSchema.deleteOne({ no: contentNumber });  // findOneAndDelete({ no: contentNumber })와 정확히 동일함
    res.redirect('/');
  } catch (error) {
    next(error)
  }
})

module.exports = router;