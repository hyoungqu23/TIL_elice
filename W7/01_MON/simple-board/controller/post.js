const BookSchema = require('../models/book');

const getBookInfo = (req, res, next) => {
  const authorName = req.params.id;

  BookSchema.find({author: authorName}).then(result => {
    res.json(result);
  }).catch (err => {
    console.log(err);
  })
}

const addBook = (req, res, next) => {
  const {name, author, price, publish} = req.body;
  // const price = req.body.price || 5000;

  // 데이터 할당하기
  let bookData = BookSchema({
    bookname: name,
    author: author,
    price: price,
    publish: publish
  });

  // 데이터 저장하기
  bookData.save();

  // 다시 폼으로 가기
  res.redirect('/expost');
}

module.exports = {
  getBookInfo,
  addBook
}