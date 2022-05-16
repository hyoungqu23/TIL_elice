const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  if (req.query.write) {
    res.render('posts/edit');
    return;
  }
})

router.post('/', (req, res, next) => {
  const { title, content } = req.body;
  
  try {

    await Post.create({
      title,
      content,
    }); // 데이터 생성

    res.redirect('/');  // root page로 이동
    
    // 해당 게시글로 이동하기 위해서는 생성한 데이터를 posts로 받고, shortId를 활용해 이동할 수 있다.

  } catch (err) {

  }
})

module.exports = router;