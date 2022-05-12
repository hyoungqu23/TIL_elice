const { Router } = require('express');
const Note = require('../models/note');

const router = Router();

router.get('/', (req, res, next) => {
  const notes = Note.list();  // note 목록을 받아오는 list 함수 사용({id, title})
  res.json(notes);  // JSON 객체로 변환해 응답.
});

// 특정 자원에 접근하기 위해 id 값 사용 -> path parameter로 id 사용
router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id); // 숫자 형변환

  try {
    const note = Note.get(id);
    res.json(note); // JSON 객체로 변환해 응답.
  } catch (e) {
    next(e);  // 에러 발생 시 에러 처리 미들웨어로 바로 전달.
  }
});

// post HTTP 메서드
router.post('/', (req, res, next) => {
  const { title, content } = req.body; // 요청 값 destructing
  // ! TODO: req.body 확인하기

  const note = Note.create(title, content); // note 생성

  res.json(note); // JSON 객체로 변환해 응답.
});

// put HTTP 메서드
// 특정 자원에 접근하기 위해 id 값 사용 -> path parameter로 id 사용
router.put('/:id', (req, res, next) => {
  const id = Number(req.params.id); // 숫자 형변환

  const { title, content } = req.body;  // 요청 값 destructing

  try {
    const note = Note.update(id, title, content); // note 수정
    res.json(note); // JSON 객체로 변환해 응답.
  } catch (e) {
    next(e);  // 에러 발생 시 에러 처리 미들웨어로 바로 전달.
  }
});

// delete HTTP 메서드
// 특정 자원에 접근하기 위해 id 값 사용 -> path parameter로 id 사용
router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id); // 숫자 형변환

  try {
    Note.delete(id);  // note 제거
    res.json({ result: 'success' });
  } catch (e) {
    next(e);  // 에러 발생 시 에러 처리 미들웨어로 바로 전달.
  }
});

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  try {
      const note = Note.get(id);
      res.json(note);
  } catch(e) {
      next(e);
  }
});

module.exports = router;