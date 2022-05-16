const { Router } = require('express');
const { Post } = require('../models/model');  // 스키마로 만든 모델 가져오기
const router = Router();

// 전체 목록 검색(find)
router.get('/', async (req, res, next) => {

    // 쿼리에 작성(write) 모드인지 파악
    if (req.query.write) {
        res.render('post/edit');    // 수정 템플릿(edit.pug)을 렌더링
        return;
    }

    const posts = await Post.find({}).exec(); // 게시글 목록 전체 불러오기

    res.render('post/list', { posts }); // 리스트 템플릿(list.pug)에 게시글 목록 전체를 넣어서 렌더링
    // 작성하기 버튼 클릭시 write=true로 변경된다. -> 다시 post Router 진입 -> req.query.write가 true가 됨 -> 수정 템플릿 렌더링
});

// =================================================================================================
// shortId를 통한 검색(findOne)
router.get('/:shortId', async (req, res, next) => {
    const { shortId } = req.params;
    console.log(shortId);
    
    // [참고](https://mongoosejs.com/docs/api.html#model_Model.findOne)
    const post = await Post.findOne({
        shortId: shortId,
    }); // shortId 로 게시글 찾기([참고](https://mongoosejs.com/docs/api.html#model_Model.find))
    // console.log(post)
    // 쿼리에서 수정(edit) 모드인지 파악
    if (req.query.edit) {
        res.render('post/edit', { post });  // 수정 템플릿(edit.pug)에 검색한 게시글을 넣어 렌더링
        return;
    }

    res.render('post/view', { post });  // 본문 템플릿(view.pug)에 검색한 게시글을 넣어 렌더링
})

// =================================================================================================
// 게시글 생성(create)
router.post('/', async (req, res, next) => {
    const { title, content } = req.body;    // edit.pug의 form에서의 요청 body

    try {
        // 제목과 내용 둘 모두 있어야 함
        if (!title || !content) {
            throw new Error('제목과 내용을 입력해 주세요');
        }

        // 4. 서버에 POST request를 보내서 브라우저에서 CREATE 작업을 수행하세요.
        const post = await Post.create({
            title: title,   // 제목에는 req.body의 title을
            content: content,   // 내용에는 req.body의 content를
        })  // 게시글 생성(mongoose 모델에 대한 create 함수)
        
        res.redirect(`/posts/${post.shortId}`); // 해당 게시글 shortId로 검색하여 게시글 보여주는 페이지로 이동(바로 위)
    } catch (err) {
        next(err);
    }
});

// =================================================================================================
// shortId를 통한 수정(updateOne)
// 5. router에 post() 메소드를 추가해서 /:shortID 의 주소의 요청일 때만 게시글 생성 작업을 실행하세요.
router.post('/:shortId', async (req, res, next) => {
    const { shortId } = req.params;
    const { title, content } = req.body;
    try {
        if (!title || !content) {
            throw new Error('제목과 내용을 입력 해 주세요')
        }
        
        await Post.updateOne({ shortId },  {
            title: title,
            content: content,
        })
        
        res.redirect(`/posts/${shortId}`);
    } catch (err) {
        next(err);
    }
});

router.delete('/:shortId', async (req, res, next) => {
  const { shortId } = req.params;
  await Post.deleteOne({ shortId });
  res.send('OK'); // 이거 하나 때문에 한참 고민했네
  // res.end()도 가능함
})

module.exports = router;